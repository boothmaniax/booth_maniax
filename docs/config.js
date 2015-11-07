exports.blog = {

  title: 'BOOTHマニアックス!!',
  description: 'ピクシブが運営するサービス「BOOTH」の謎を解き明かしてみるブログ',
  url_top: 'https://boothmaniax.github.io/',
  content_dir: './contents/boothmaniax.github.io/',
  copyright: 'Copyright (C) 2015 さくらしき All Rights Reserved.',
  intro: {
    img_url: 'img/self.png',
    myname: 'さくらしき',
    comment: '創作活動とかをやりつつも、BOOTHの使い方とか研究して紹介しています。このwikiは、BOOTHを運営しているピクシブ株式会社とは関係ない、ただの非公式ブログです。',
  },
  ga_id : '',
  categories: {
    beginner: { name:'入門編' },
  },
  footer: {
    'コンテンツリポジトリ' : 'https://github.com/sakurashiki/booth_maniax',
    'Twitter(@_sakurashiki)' : 'https://twitter.com/_sakurashiki',
    'サークルページ': 'http://sakurashiki.github.io/'
  },
  entries: {
    index: {
      is_toppage: true,
      sambnail_img: null,
      contents:['index'],
    },
    whats_booth: {
      title: 'ピクシブが作ったBOOTHという通販サービスの魅力は何？',
      sambnail_img: null, category:'beginner',
      contents:['whats_booth'],
    },
  },
};
