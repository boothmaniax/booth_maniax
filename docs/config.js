exports.blog = {

  title: 'BOOTHマニアックス!!',
  description: 'ピクシブが運営するサービス「BOOTH」の謎を解き明かしてみるブログ',
  url_top: 'https://boothmaniax.github.io/',
  content_dir: './contents/boothmaniax.github.io/',
  copyright: 'Copyright (C) 2015 さくらしき All Rights Reserved.',
  sambnail_img: 'img/boot_image.jpg',
  intro: {
    img_url: 'img/self.png',
    myname: 'さくらしき',
    comment: '創作活動とかをやりつつも、BOOTHの使い方とか研究して紹介しています。このWebサイトは、BOOTHを運営しているピクシブ株式会社とは関係ない、ただの非公式ブログです。サービスの問題について、色々問い合わされても答えられません。質問があれば、<a href="https://twitter.com/_sakurashiki">Twitter</a>まで！',
  },
  ga_id : 'UA-69852218-1',
  categories: {
    beginner: { name:'入門編' },
  },
  top: 'このブログでは、ピクシブが運営している通販サービス「BOOTH」の使い方やTIPSを紹介しています！' +
       '創作活動をしているみなさんが、ネット上でちょっとした作品を公開したいとか、グッツを作って売ってみたいとか、' +
       'そういう悩みに答えられるようにしていきます。どんどんコンテンツを増やしていく予定ですので、どうぞお楽しみ下さい！',
  bottom: '',
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
      sambnail_img: 'img/boot_image.jpg',
    },
    whats_booth: {
      title: 'ピクシブが作ったBOOTHという通販サービスの魅力は何？',
      sambnail_img: 'img/boot_image.jpg', category:'beginner',
      contents:['whats_booth'],
    },
  },
};
