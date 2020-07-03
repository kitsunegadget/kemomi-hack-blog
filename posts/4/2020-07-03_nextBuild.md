---
title: 'Next.js の静的ビルドについて'
date: '2020-07-03'
---

このサイトは静的ホスティングでのブログで、今のところGitHubのMasterが更新されるたびにリビルドがかかるようになっている。すなわち、記事を更新するたびにビルドしなければならない。

## Next.js の build

Next.js ではビルド時に静的ファイルにできるものはなるべく静的化しようとする。
例えば `GetStaticProps` でファイルを取得する場合、ビルド時に fetch する為、ローカル・グローバル関係なくビルド時に静的ファイルを生成することになる。
そのため、新規・更新ファイルが追加されたとしてもリクエストタイムで取得することが出来ず、再ビルドの必要がでてくる。

GitHub Pages もビルドを自動 or ローカルで行い、出力するので致し方ない部分なのかもしれないが。

## 更新時のみリクエストできるのか

### Incremental Static Generation

参考: [https://static-tweet.now.sh/]("https://static-tweet.now.sh/")

直訳すると「増分静的生成」。
`GetStaticPaths` の `fallback` を定義することで実現。
一度取得すれば、新しいダイナミックルートの静的ファイルとして保存される。

この場合は、リンクの初回リクエスト時に fetch するが、その後の取得を行わないため、ファイル更新することは出来ない。

### RFC: Incremental Static Regeneration

参考: [https://github.com/vercel/next.js/discussions/11552](https://github.com/vercel/next.js/discussions/11552)

というわけで、このままでは最初の1回のみ fetch するので見出しの通り Regeneration する必要がある。

といっても簡単で、 `GetStaticProps` のオプションに `revalidate` を設定するだけ。
（まだ実験的段階らしく `unstable_revalidate` で扱うようになっている）

仕組みとしては HTTP Header における `cache-control` の `max-age` と似たような物らしい。
参考先の例では、ページ更新後の最初のリクエスト受信でfetchし、その更新作業が1秒以上経過する場合は、以前のページを表示するようにし、その後のリクエストは更新されたページを表示するようだ。

## 利用する場合はAPI経由で

ローカルにファイルを置くのもAPIを利用しないうえで便利だが、静的ホスティングサイトの場合は更新のたびにビルドをするため、この設定の恩恵を受けることが無くなってしまう。
静的ホスティングサイトで利用する場合は、APIを利用したデータ取得方式を取る必要がありそうだ。
