# プロジェクト

みらい様スーパーアプリ

# 環境構築

開発を始めるために必要なツールをインストール

1. Node, nmv のインストール

- 以下を参照に、最新の NVM をインストール

https://github.com/nvm-sh/nvm

- nvm install を実行すると、.nvmrc に記載されたバージョンの Node がインストールされる

```sh
nvm install
nvm use
```

2. pnpm のインストール

https://pnpm.io/ja/installation

- `pnpm`を`pn`で呼び出せるようにしておくことを推奨
- [参照](https://pnpm.io/ja/installation#%E7%9F%AD%E3%81%84%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)


3. Cursor エディタのインストール

https://www.cursor.com/

- enterprise プランを利用します。アカウント追加はパルケ黄倉まで
- 推奨される拡張機能を同時にインストールする
  - `.vscode/extensions.json` に記載されいている拡張機能のインストールが提案される。

# 環境変数

- プロジェクトルートの`.env.example`をコピーして`.env`を作成する。

# コマンド

```sh
# 依存パッケージのインストール
pnpm install

# 環境の最新化。Vercelから最新の環境変数の取得とパッケージのインストール
# 現時点では未対応
# pnpm sync

# ローカル開発用のDB、Drizzle DB Studio、Partykitサーバーを起動、停止する。
pnpm servers:up

# biomeのlintを実行し修正。また、typescriptの型チェックを実行する
pnpm check

# biomeを使ってコードを整形する。
pnpm format

# DrizzleのDBを最新化
pnpm db:push

# DrizzleのDBをリセット
pnpm db:reset

# 開発サーバーを起動
pnpm dev

# アプリのビルドを実行
pnpm build

# Vitestを実行して自動テストを実行する
# 各アプリ配下のテストと共通ライブラリのテストを実行する
pnpm test
```

# フォルダ構成

### Apps and Packages

- `app/` : Next.jsのアプリケーション
  - `_components` : アプリ内で共通の UI コンポーネントを配置する。
  - `_config` : アプリ全体の設定ファイル、サイドメニュー設定ファイル
  - `_service` : アプリ全体で共有で利用される処理。主にバックエンド側の DB アクセスを伴うような処理
  - `_types` : アプリ全体で共通の型定義を配置する。
  - `_utils` : アプリ全体で共通のユーティリティ関数を配置する。
  - `(api)/api` : バックエンド API の処理を配置する。
    - `auth` : 認証
    - `cron` : 定期実行処理
    - `v1`:
      - `blob-upload` : ブロブアップロード
  - `(error)` : エラーハンドリングの処理を配置する。
  - `(merchant)` : 加盟店向け機能
  - `(provider)`: 自治体メンバー向け機能
  - `(store)`: 店舗向け機能
  - `(user)`: ユーザー向け機能
  - `**/*` 任意のパス
    - `_components` : フォルダスコープ内で利用される UI コンポーネントを配置する。
    - `_config` : フォルダスコープ内の設定ファイルを配置する。
    - `_service` : フォルダスコープ内で利用される処理。主にバックエンド側の DB アクセスを伴うような処理
      - `types.ts` : フォルダスコープ内で利用される型定義を配置する。
      - `constants.ts` : フォルダスコープ内で利用される定数を配置する。
- `public` : 静的ファイルを配置する。
- `tests` : テスト用のユーティリティファイルやmockファイルを配置する。

- `core` 
  - `components` : 共通の UI コンポーネントを配置する。機能に依存しないもの
  - `lib` : 共通ライブラリ、外部ライブラリの設定ファイルなどを配置する。
  - `types` : 型定義ファイルを配置する。機能に依存しないもの

# 技術スタック

## 主な技術スタック

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [biome](https://biomejs.dev/) for code formatting & lint
- [React](https://react.dev/) Web Framework
- [NEXT.js](https://nextjs.org/docs) React Framework
- [Drizzle](https://orm.drizzle.team) データベース ORM
- [NextAuth](https://authjs.dev/) 認証ライブラリ
- [shadcn/ui](https://ui.shadcn.com/) UI コンポーネントライブラリ
- [tailwindcss](https://tailwindcss.com/) CSS フレームワーク
- [React Hook Form](https://react-hook-form.com/) CRUD フォーム
- [valibot](https://valibot.dev/) バリデーションライブラリ
- [nanostores](https://github.com/nanostores/nanostores) グローバルステート管理ライブラリ
- [Vitest](https://vitest.dev/) 自動テスト

## 主な利用外部サービス

- [Vercel](https://vercel.com/) クラウドのホスティングサービス
- [Turso](https://turso.tech/) クラウドの SQLiteサービス
- [Axiom](https://axiom.co/) ログ監視
- [Resend](https://resend.com/) メール送信
