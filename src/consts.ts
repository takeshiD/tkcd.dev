// サイト設定
export const SITE_TITLE = "tkcd.dev";
export const SITE_DESCRIPTION = "A personal blog about programming and technology";
export const SITE_AUTHOR = "tkcd";
export const SITE_URL = "https://tkcd.dev";

// Profile
export const PROFILE = {
  name: "tkcd",
  bio: "Robotics and System Engineer",
  avatarUrl: "/images/avatar.svg",
  avatarInvert: true,
};

// Social
export const SOCIAL_LINKS = [
  { name: "github", url: "https://github.com/takeshid" },
  { name: "X", url: "https://x.com/ddddd_tkc" },
];

// Menu
export const MENU_ITEMS = [
  { name: "Archive", url: "/archive" },
  { name: "Tags", url: "/tags" },
  { name: "About", url: "/about" },
];

// フッター設定
export const FOOTER = {
  since: 2026,
  license: "MIT",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed",
};

// 機能設定
export const FEATURES = {
  sideToc: true, // サイドバーTOC
  tocMinLevel: 1, // TOC最小見出しレベル (H1=1, H2=2, ...)
  tocMaxLevel: 3, // TOC最大見出しレベル (H1=1, H2=2, ...)
  comment: true, // コメント機能（Giscus）
};
