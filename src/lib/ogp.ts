export interface OgpData {
  url: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
  favicon: string;
}

export async function fetchOgpData(url: string): Promise<OgpData> {
  const defaultData: OgpData = {
    url,
    title: new URL(url).hostname,
    description: "",
    image: "",
    siteName: new URL(url).hostname,
    favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`,
  };

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });

    if (!response.ok) {
      return defaultData;
    }

    const html = await response.text();

    // Parse OGP meta tags
    const getMetaContent = (property: string): string => {
      const match = html.match(
        new RegExp(
          `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`,
          "i"
        )
      );
      if (match) return match[1];

      // Try reverse order (content before property)
      const reverseMatch = html.match(
        new RegExp(
          `<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
          "i"
        )
      );
      return reverseMatch ? reverseMatch[1] : "";
    };

    // Get title
    const ogTitle = getMetaContent("og:title");
    const twitterTitle = getMetaContent("twitter:title");
    const htmlTitle = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
    const title = ogTitle || twitterTitle || htmlTitle || defaultData.title;

    // Get description
    const ogDescription = getMetaContent("og:description");
    const twitterDescription = getMetaContent("twitter:description");
    const metaDescription = getMetaContent("description");
    const description =
      ogDescription || twitterDescription || metaDescription || "";

    // Get image
    const ogImage = getMetaContent("og:image");
    const twitterImage = getMetaContent("twitter:image");
    let image = ogImage || twitterImage || "";

    // Make image URL absolute
    if (image && !image.startsWith("http")) {
      const baseUrl = new URL(url);
      image = new URL(image, baseUrl.origin).toString();
    }

    // Get site name
    const ogSiteName = getMetaContent("og:site_name");
    const siteName = ogSiteName || new URL(url).hostname;

    return {
      url,
      title: decodeHtmlEntities(title),
      description: decodeHtmlEntities(description),
      image,
      siteName,
      favicon: defaultData.favicon,
    };
  } catch {
    return defaultData;
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}
