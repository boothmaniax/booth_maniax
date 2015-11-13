/*************************************************
 * blog generate.js
 * Copyright 2015, @_sakurashiki
 * https://github.com/sakurashiki/booth_maniax
 * This software is released under the MIT License.
*/
'use strict';
let fs = require('fs-extra');
let mkdirp = require("mkdirp");
let ncp = require('ncp').ncp;
////////////////////////////////////////////////////////////
// 初期化
function initialize( blog ) {
  return new Promise(function( resolv ){
    let website = { blog: blog };
    // 本日の日付を取得
    let d = new Date();
    website.updateAt = d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
    // 静的ファイルのコピー
    mkdirp(blog.content_dir,function(err){
      if( err ) { throw err; }
      fs.copy('./docs/img', blog.content_dir+'img',function(){
        console.log('Copy   - img -> '+blog.content_dir+'img');
      });
      fs.copy('./docs/css', blog.content_dir+'css',function(){
        console.log('Copy   - css -> '+blog.content_dir+'css');
      });
      fs.copy('./docs/js', blog.content_dir+'js',function(){
        console.log('Copy   - js -> '+blog.content_dir+'js');
      });
    });
    // グローバルナビゲーション用情報の生成
    let navList = blog.categories;
    Object.keys(navList).forEach(function(category){
      navList[category].list = [];
    });
    Object.keys(blog.entries).forEach(function(slug){
      let entry = blog.entries[slug];
      if( entry.is_toppage ) { return; }
      navList[entry.category].list.push({
        title: entry.shorter_title,
        sambnail_img: entry.sambnail_img,
        slug: slug
      });
    });
    website.navList = navList;
    resolv( website );
  });
}
////////////////////////////////////////////////////////////
// マークダウン形式のファイルを逐次読み込みHTMLの状態にしてConcat
function compileMarkDown( website ) {
  return new Promise(function( resolv ){
    let blog  = website.blog;
    let entry = blog.entries[website.slug];
    let article = '';
    entry.contents.forEach(function(content){
      let mdFileName = 'docs/'+content+'.md';
      let stat = fs.statSync(mdFileName);
      let fd = fs.openSync(mdFileName, "r");
      let markDown = fs.readSync(fd, stat.size, 0, 'utf8')[0];
      markDown = markDown.replace( /\+ (.+?)\n/g, "<li>$1</li>" );
      markDown = markDown.replace( /\- (.+?)\n/g, "<li>$1</li>" );
      markDown = markDown.replace( /(<li>.+?<\/li>)\n/g, "<ul>$1</ul>\n" );
      markDown = markDown.replace( /\#\# (.+?)\n\n/g, "<h4>$1</h4>\n" );
      markDown = markDown.replace( /\# (.+?)\n\n/g, "<h3>$1</h3>\n" );
      markDown = markDown.replace( /\!\!\[(.*)\]\((.*)\)/g, "<img style='border:1px solid silver;' alt='$1' src='img/$2'>" );
      markDown = markDown.replace( /\!\[(.*)\]\((.*)\)/g, "<img alt='$1' src='img/$2'>" );
      markDown = markDown.replace( /(.+?)(\n\n|\n$|$)/g, "<p>$1</p>\n" );
      markDown = markDown.replace( /\[(.+?)\]\((.+?)\)/g, "<a href='$2'>$1</a>" );
      fs.closeSync(fd);
      article += markDown;
    });
    website.article = article;
    website.entry   = entry;
    resolv( website );
  });
}
////////////////////////////////////////////////////////////
// HTML記事を受け取りテンプレートを元にWebページの状態へと加工
function generateWebPage( website ){
  return new Promise(function(resolv){
    let blog     = website.blog;
    let slug     = website.slug;
    let article  = website.article;
    let updateAt = website.updateAt;
    let navList  = website.navList;
    let entry    = website.entry;
    fs.readFile('template.html','utf8',function( err, template ) {
      if( err ) { throw err; }
      // グローバルナビゲーションの生成
      let nav = '<nav>';
      nav = '<ul>';
      Object.keys(navList).forEach(function(category){
        nav += '<li>'+navList[category].name+'</li>';
        nav += '<ul>';
        navList[category].list.forEach(function(entryInfo){
          nav += '<li>';
          if( entryInfo.slug !== slug ) { nav += '<a href="'+entryInfo.slug+'.html">'; }
          nav += '<div class="sumbnail" style="background-image:url('+entryInfo.sambnail_img+');"></div>';
          nav += '<span class=".title">'+entryInfo.title+'</span>';
          if( entryInfo.slug !== slug ) { nav += '</a>'; }
          nav += '</li>';
        });
        nav += '</ul>';
      });
      nav += '</ul>';
      let rec = '';
      if ( entry.recommends ) {
        rec = '<ul>';
        rec += '<li>こんな記事もオススメ!!</li>';
        rec += '<ul>';
        entry.recommends.forEach(function(recommend){
          rec += '<li>';
          rec += '<a href="'+recommend+'.html">';
          rec += '<div class="sumbnail" style="background-image:url('+blog.entries[recommend].sambnail_img+');"></div>';
          rec += '<span class=".title">'+blog.entries[recommend].title+'</span>';
          rec += '</a>';
          rec += '</li>';
        });
        rec += '</ul>';
      }
      // テンプレートを元にページを生成
      template = template.replace( /\#\#SITE_TITLE\#\#/g , blog.title );
      template = template.replace( /\#\#SITE_DESC\#\#/g , blog.description );
      template = template.replace( /\#\#SITE_UPDATE_AT\#\#/g , updateAt );
      template = template.replace( /\#\#BLOG_TOPURL\#\#/g , blog.url_top );
      if( entry.is_toppage ) {
        template = template.replace( /\#\#BEGIN_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#END_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#BEGIN_ENTRY\#\#(.*\n){0,10000}.*?\#\#END_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#BLOG_TITLE\#\#/g , blog.title );
        template = template.replace( /\#\#PAGE_SUMBNAIL\#\#/g ,blog.url_top + blog.sambnail_img );
        template = template.replace( /\#\#ENTRY_URL\#\#/g , blog.url_top );
      } else {
        template = template.replace( /\#\#BEGIN_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#END_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#BEGIN_TOPPAGE\#\#(.*\n){0,10000}.*?\#\#END_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#BLOG_TITLE\#\#/g , entry.title + " - " + blog.title );
        template = template.replace( /\#\#PAGE_TITLE\#\#/g , entry.title );
        template = template.replace( /\#\#PAGE_SUMBNAIL\#\#/g ,blog.url_top + entry.sambnail_img );
        template = template.replace( /\#\#ENTRY_URL\#\#/g , blog.url_top + slug + '.html');
        template = template.replace( /\#\#PAGE_RECOMMEND\#\#/g, rec);
      }
      template = template.replace( /\#\#PAGE_CONTENT\#\#/g, article);
      template = template.replace( /\#\#PAGE_NAV\#\#/g, nav);
      website.webPage = template;
      resolv(website);
    });
  });
}
////////////////////////////////////////////////////////////
// WebページをHTMLとして書き出す
function writeToPlace( website ){
  return new Promise(function(resolv){
    let webPage = website.webPage;
    let blog    = website.blog;
    let slug    = website.slug;
    let entry   = website.entry;
    mkdirp(blog.content_dir,function(err){
      if( err ) { throw err; }
      let webPageName = blog.content_dir + slug + '.html';
      fs.writeFile(webPageName, webPage , function (err) {
        console.log('Create - '+(entry.contents)+' -> '+slug + '.html');
        if( err ) { throw err; }
        resolv();
      });
    });
  });
}
////////////////////////////////////////////////////////////
// すべてのWebページを生成する
initialize(require('./docs/config.js').blog).then(function(website){
  // 各ページを生成する
  Object.keys(website.blog.entries).forEach(async function(slug){
    // オブジェクトのコピー
    var F = function(){};
    F.prototype = website;
    website = new F;
    website.slug = slug;
    // Webページを生成する
    await compileMarkDown(website)
      .then(generateWebPage)
      .then(writeToPlace);
  });
});
