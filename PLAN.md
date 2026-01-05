# Kita風Astroブログ実装計画

## プロジェクト概要

- **現在の状態**: Astro基本ブログテンプレート（MDX, RSS, Sitemap対応済み）
- **目標**: ZolaのKitaテーマを模したクリーン・エレガントなブログ
- **参照**: `references/kita/` - Zola Kitaテーマ

---

## フェーズ1: 基盤セットアップ

### 1.1 Tailwind CSS 4のインストール

- `@tailwindcss/vite`と`tailwindcss`のインストール
- `@tailwindcss/typography`プラグイン追加
- `app.css`の作成（Kitaのカスタムユーティリティを移植）

### 1.2 サイト設定の拡張（`src/consts.ts`）

- サイトタイトル、説明、著者
- プロフィール設定（名前、bio、アバター）
- ソーシャルリンク
- メニュー項目
- フッター設定

---

## フェーズ2: レイアウト・コンポーネント作成

| コンポーネント          | 役割                                     |
| --------------          | ------                                   |
| `BaseLayout.astro`      | 全体レイアウト（HTML構造、head、body）   |
| `Header.astro`          | サイトタイトル、ナビ、ダークモードボタン |
| `Footer.astro`          | 著作権、ライセンス表示                   |
| `Profile.astro`         | ホームページのプロフィールセクション     |
| `PostCard.astro`        | 記事一覧カード                           |
| `ThemeToggle.astro`     | ダークモード切替ボタン                   |
| `TableOfContents.astro` | 目次コンポーネント                       |
| `PostNavigation.astro`  | 前後の記事リンク                         |
| `PostTaxonomies.astro`  | タグ表示                                 |
| `LinkCard.astro`        | OGP対応リンクカード                      |

---

## フェーズ3: ページ実装

| ページ     | パス              | 内容                                        |
| -------    | ------            | ------                                      |
| ホーム     | `/`               | プロフィール + 記事一覧（ページネーション） |
| 記事詳細   | `/blog/[...slug]` | 記事本文、TOC、タグ、前後ナビ               |
| アーカイブ | `/archive`        | 年月別記事一覧                              |
| タグ一覧   | `/tags`           | 全タグリスト                                |
| タグ別     | `/tags/[tag]`     | 特定タグの記事一覧                          |
| About      | `/about`          | 自己紹介ページ                              |

---

## フェーズ4: 追加機能

### 4.1 ダークモード

- システム設定の検出
- localStorage保存
- 手動切替

### 4.2 目次（TOC）

- 記事内ヘッダーの自動抽出
- サイドバー表示（デスクトップ）

### 4.3 タクソノミー

- タグ機能
- タグ別フィード対応

### 4.4 RSS/Atomフィード

- 既存の`rss.xml.js`を活用

### 4.5 リンクカード（OGP対応）

外部URLをリッチなカード形式で表示する機能。

#### 対応サイト例

- GitHub（リポジトリ、Issue、PR）
- Zenn（記事、本）
- Qiita
- その他OGP対応サイト全般

#### 実装方式

1. **ビルド時OGP取得**（推奨）
   - rehypeプラグインまたはカスタムremark pluginで実装
   - Markdown内の単独行URLを検出
   - ビルド時にOGPメタデータを取得・キャッシュ
   - 静的HTMLとしてカードを生成

2. **コンポーネント方式**
   - `<LinkCard url="..." />` コンポーネント
   - MDX記事内で明示的に使用

#### 取得するOGPデータ

- `og:title` - タイトル
- `og:description` - 説明文
- `og:image` - サムネイル画像
- `og:site_name` - サイト名
- `favicon` - ファビコン

#### カードデザイン

```
┌─────────────────────────────────────────┐
│ ┌───────┐                               │
│ │ image │  Title                        │
│ │       │  Description text...          │
│ └───────┘  🔗 example.com               │
└─────────────────────────────────────────┘
```

#### 必要なファイル

- `src/components/LinkCard.astro` - カードコンポーネント
- `src/lib/ogp.ts` - OGPデータ取得ユーティリティ
- `src/plugins/remark-link-card.ts` - remarkプラグイン（自動変換用）

---

## フェーズ5: スタイリング

### 5.1 CSS変数

- 背景色（ライト/ダーク）
- ヘッダー色

### 5.2 カスタムユーティリティ

- `blur-header`: ヘッダーぼかし効果
- `block-bg` / `block-hover`: カード背景
- `primary-link` / `secondary-link`: リンクスタイル

### 5.3 Typography

- `prose`クラスによるMarkdownスタイル
- コードブロックのカスタマイズ

### 5.4 レスポンシブ

- モバイルメニュー
- サイドTOCの表示切替

---

## ファイル構成（予定）

```
src/
├── components/
│   ├── BaseHead.astro        # 既存（拡張）
│   ├── Header.astro          # 再構築
│   ├── Footer.astro          # 再構築
│   ├── Profile.astro         # 新規
│   ├── PostCard.astro        # 新規
│   ├── ThemeToggle.astro     # 新規
│   ├── TableOfContents.astro # 新規
│   ├── PostNav.astro         # 新規
│   ├── PostTaxonomies.astro  # 新規
│   └── LinkCard.astro        # 新規（OGPリンクカード）
├── layouts/
│   ├── BaseLayout.astro      # 新規
│   └── BlogPost.astro        # 再構築
├── lib/
│   └── ogp.ts                # 新規（OGPデータ取得）
├── plugins/
│   └── remark-link-card.ts   # 新規（自動リンクカード変換）
├── pages/
│   ├── index.astro           # 再構築
│   ├── archive.astro         # 新規
│   ├── about.astro           # 再構築
│   ├── tags/
│   │   ├── index.astro       # 新規
│   │   └── [...tag].astro    # 新規
│   └── blog/
│       └── [...slug].astro   # 再構築
├── styles/
│   └── app.css               # 新規（Tailwind + カスタム）
└── consts.ts                 # 拡張
```

---

## 実装の優先順位

1. **必須**: 基盤、レイアウト、ホーム、記事詳細
2. **重要**: ダークモード、タグ機能、アーカイブ
3. **追加**: TOC、リンクカード、コメント機能、数式対応

---

## Kitaテーマの主要な特徴（参照）

- Tailwind CSS 4.x + Typography plugin
- ダークモード対応（システム設定 + 手動切替）
- ぼかし効果のあるヘッダー
- カード型の記事一覧
- サイドバー目次（デスクトップ）
- Giscusコメント対応（オプション）
- KaTeX数式対応（オプション）
- Mermaid図対応（オプション）
