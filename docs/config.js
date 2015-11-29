exports.blog = {

  title: 'BOOTHマニアックス!!',
  description: '創作をしている人たちのネット販売のハードルを下げようと、いろいろと情報発信しています',
  url_top: 'https://boothmaniax.github.io/',
  content_dir: './contents/boothmaniax.github.io/',
  sambnail_img: 'img/boot_image.jpg',
  /* ブログのカテゴリー：ナビゲーションの分類 */
  categories: {
    beginner: { name:'BOOTH入門編' },
    item: { name:'作品販売編' },
    // shop: { name:'ショップページの見せ方TIPS' },
    // risk: { name:'販売リスクを減らすTIPS' },
    // faq: { name:'よくあるハマりどころ' },
  },
  /* カテゴリーの分類 */
  entries: {
    index: {
      is_toppage: true,
      sambnail_img: null,
      contents:['index'],
    },
    before_store_open: {
      title: '同人作家やアーティストが、作品をネット通販する前に知るべき3つのポイント',
      shorter_title: '作品をネット通販する前に知るべき3つのポイント',
      sambnail_img: 'img/151109_0008.jpg', category:'beginner',
      contents:['before_store_open_begin','shop_type','sale_type','commission_type','before_store_open_end'],
      recommends:['minutes_to_start','whats_booth']
    },
    minutes_to_start: {
      title: '3分で個人のネットショップを開いて、同人グッツの販売を始めてみた',
      shorter_title: '3分でさくっとショップを開設し、作品のネット販売を始める',
      sambnail_img: 'img/151110_0011.jpg', category:'beginner',
      contents:['3minutes_to_start'],
      recommends:['whats_booth','minutes_to_start']
    },
    whats_booth: {
      title: '創作活動向けネットショップサービス「BOOTH」は何が良くて何がダメなのか？',
      shorter_title: 'BOOTHという創作向け通販サービスのメリット・デメリット',
      sambnail_img: 'img/boot_image.jpg', category:'beginner',
      contents:['whats_booth'],
      recommends:['before_store_open','minutes_to_start']
    },
    item_book_jika: {
      title: '手軽に同人誌を自家通販する方法',
      shorter_title: '同人誌を自家通販する方法',
      sambnail_img: 'img/151128_0001.jpg', category:'item',
      contents:['item_book_before','item_common_discription','item_book_after_jika','item_book_after_common'],
      recommends:['before_store_open','whats_booth']
    },
    /*
    item_book_itaku: {
      title: '手軽に同人誌を委託通販する方法',
      shorter_title: '同人誌を委託通販する方法',
      sambnail_img: 'img/151128_0009.jpg', category:'item',
      contents:['item_book_before','item_common_discription','item_book_after_itaku','item_book_after_common'],
    },
    */
    item_music: {
      title: '手軽に音楽/ボイスドラマをダウンロード販売する方法',
      shorter_title: '音楽/ボイスドラマをダウンロード販売する',
      sambnail_img: 'img/151116_0001.jpg', category:'item',
      contents:['item_music_before','item_common_discription','item_music_after'],
      recommends:['before_store_open','whats_booth','item_cd']
    },
    item_cd: {
      title: '手軽に音楽CD/ボイスドラマCDを委託通販する方法',
      shorter_title: '音楽CD/ボイスドラマCDを委託通販する方法',
      sambnail_img: 'img/151116_0018.jpg', category:'item',
      contents:['item_cd_before','item_common_discription','item_cd_after'],
      recommends:['before_store_open','whats_booth','item_music']
    },
    /*
    item_goods: {
      title: '低い手数料で手軽にグッズをネット通販する方法',
      shorter_title: '同人誌を販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:['item_dojin_before','item_common_discription','item_dojin_after'],
    },
    item_novel: {
      title: 'BOOTHで小説を販売する方法',
      shorter_title: '小説を販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
    /*
    item_goods: {
      title: 'BOOTHでグッツを販売する方法',
      shorter_title: '同人誌を販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
    /*
    download_and_package_variation: {
      title: 'BOOTHでダウンロード版とパッケージ版の両方を販売する方法',
      shorter_title: 'ダウンロード版とパッケージ版の両方を販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
    /*
    free_and_production_variation: {
      title: 'BOOTHで無料版DLと有料版DLの両方を販売する方法',
      shorter_title: '無料版DLと有料版DLの両方を販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
    /*
    size_variation: {
      title: 'BOOTHでサイズ別でTシャツ/衣類を販売する方法',
      shorter_title: 'サイズ別でTシャツ/衣類を販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
    /*
    charactor_variation: {
      title: 'BOOTHでキャラクター別でグッツを販売する方法',
      shorter_title: 'キャラクター別でグッツを販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
    /*
    color_variation: {
      title: 'BOOTHでカラー別でグッツを販売する方法',
      shorter_title: 'カラー別でグッツを販売する方法',
      sambnail_img: 'img/.jpg', category:'item',
      contents:[],
    },
    */
  },
};
