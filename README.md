## こちら、BOOTH MANIAXのコンテンツリポジトリです！！

BOOTH MANIAXは、ピクシブが運営しているBOOTHというサービスについて、良さ気な使い方を勝手に紹介していく非公式ブログです。誤字脱字をみつけたら、プルリクいただけると嬉しいっす！

![BOOTHとは？](https://asset.booth.pm/assets/og_image-66cd86158079788d8c77dd34ee359ace.jpg)

## Get Start : ローカル環境でコンテンツの見え方を確認する方法

コンテンツはNode.jsで作られたツールを使って、元データからコンバートを行ってgithub pages上に配置されています。node.jsのインストールが必要です。

### 必要なパッケージの読み込み

node.js単体じゃ動作できないので、必要なパッケージを読み込ませましょう。

```bash
npm init
```

### コンテンツの生成

コンテンツをコンバートさせるのは、以下のコマンドです。

```bash
node generate.js
```

すると「./content/boothmaniax.github.io」の配下に、Webページとして表示可能なコンテンツが配置されます。あとは、適当なWebサーバーなんかをローカルで動かして、コンテンツを表示させて確認するだけです。

## ブログのエントリの内容はどこにあるのか？

ブログエントリの文章は、全て[docs配下](https://github.com/sakurashiki/booth_maniax/tree/master/docs)にMarkdown方式で保存されています。

boothmaniaxで扱っているコンテンツは、同じ説明を複数のエントリで繰り返し行う必要があるため、メンテナンスが大変です。そこで、独自のブログ生成ツール「[generate.js](https://github.com/sakurashiki/booth_maniax/blob/master/generate.js)」を使って、複数のコンテンツをくっつけてひとつのエントリーにできるようにしています。同じ説明文は、一箇所で記述できるようになっています。文言の修正をしたい場合、例え複数のエントリーにまたがるようなものであっても、docs配下を検索して一つのファイルのみを修正すればOKという感じになっています。

Markdownファイルの結合順序については、設定ファイル「[config.js](https://github.com/sakurashiki/booth_maniax/blob/master/docs/config.js)」にて定義されています。この設定ファイルをgenerate.jsが読み込み、Webページの元ファイルを生成しています。config.jsのentriesプロパティの下には、各ブログエントリーの情報が記述されており、contentsプロパティ内でリストとして結合順序が定義されています。


```javascript
// 例：
whats_booth: {
  title: 'ピクシブが作ったBOOTHという通販サービスの魅力は何？',
  sambnail_img: 'img/boot_image.jpg', category:'beginner',
  contents:['content1','content2','content3'], // ←ここにMarkdownの結合順序が定義されている
},
```






