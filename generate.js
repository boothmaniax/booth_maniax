/*************************************************
 * blog generate.js
 * Copyright 2015, @_sakurashiki
 * https://github.com/sakurashiki/booth_maniax
 * This software is released under the MIT License.
*/
'use strict';
var fs = require('fs-extra');
var async = require('async');
var mkdirp = require("mkdirp");
var glob = require("glob");
var ncp = require('ncp').ncp;

var blog = require('./docs/config.js').blog;

// アップデート日を取得
var d = new Date();
var updateAt = d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';

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
var navList = blog.categories;
Object.keys(navList).forEach(function(category){
  navList[category].list = [];
});
Object.keys(blog.entries).forEach(function(slug){
  var entry = blog.entries[slug];
  if( entry.is_toppage ) { return; }
  navList[entry.category].list.push({
    title: entry.title,
    sambnail_img: entry.sambnail_img,
    slug: slug
  });
});
// 各Webページを出力する
async.forEach(Object.keys(blog.entries),function(slug){
  var entry = blog.entries[slug];
  ////////////////////////////////////////////////////////////
  // マークダウン形式のファイルを読み込みHTMLの状態にしてConcat
  new Promise(function( resolv ){
    var article = "";
    entry.contents.forEach(function(content){
      var mdFileName = 'docs/'+content+'.md';
      var finCount = 0;
      fs.readFile(mdFileName, 'utf8', function( err, markDown ) {
        if( err ) { throw err; }
        markDown = markDown.replace( /\n\+ (.+?)\n/g, "<li>$1</li>" );
        markDown = markDown.replace( /(<li>.+?<\/li>)\n/g, "<ul>$1</ul>\n" );
        markDown = markDown.replace( /\#\# (.+?)\n\n/g, "<h4>$1</h4>\n" );
        markDown = markDown.replace( /\# (.+?)\n\n/g, "<h3>$1</h3>\n" );
        markDown = markDown.replace( /\!\[(.*)\]\((.*)\)/g, "<img alt='$1' src='img/$2'>" );
        markDown = markDown.replace( /(.+?)(\n\n|\n$|$)/g, "<p>$1</p>\n" );
        article += markDown;
        finCount++;
        if( finCount === entry.contents.length ) {
          resolv( article );
        }
      });
    });
  ////////////////////////////////////////////////////////////
  // HTML記事を受け取りテンプレートを元にWebページの状態へと加工
  }).then(function( article ) { return new Promise(function(resolv){
    fs.readFile('template.html','utf8',function( err, template ) {
      if( err ) { throw err; }
      // グローバルナビゲーションの生成
      var nav = '<ul>';
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
      // 自己紹介の生成
      var intro = '<img src=' + blog.intro.img_url + ' alt="著者近影">';
      intro += '<div class="myname">' + blog.intro.myname + '</div>';
      intro += '<div class="comment">' + blog.intro.comment + '</div>';
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
        template = template.replace( /\#\#BLOG_TOP\#\#/g , blog.top );
        template = template.replace( /\#\#BLOG_BOTTOM\#\#/g , blog.bottom );
      } else {
        template = template.replace( /\#\#BEGIN_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#END_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#BEGIN_TOPPAGE\#\#(.*\n){0,10000}.*?\#\#END_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#BLOG_TITLE\#\#/g , entry.title + " - " + blog.title );
        template = template.replace( /\#\#PAGE_TITLE\#\#/g , entry.title );
      }
      template = template.replace( /\#\#BLOG_INTRO\#\#/g, intro);
      template = template.replace( /\#\#PAGE_CONTENT\#\#/g, article);
      template = template.replace( /\#\#PAGE_NAV\#\#/g, nav);
      template = template.replace( /\#\#BLOG_COPYRIGHT\#\#/g , blog.copyright );
      var footer = '';
      var cnt = 0;
      Object.keys(blog.footer).forEach(function(label){
        footer += '<a href="'+blog.footer[label]+'" target="_blank">' + label + '</a>';
        cnt++;
        if( cnt !== Object.keys(blog.footer).length ) { footer += ' - '; }
      });
      template = template.replace( /\#\#BLOG_FOOTER\#\#/g , footer );
      resolv(template);
    });
  ////////////////////////////////////////////////////////////
  // WebページをHTMLとして書き出す
  });}).then(function( webPage ){ return new Promise(function(resolv){
    mkdirp(blog.content_dir,function(err){
      if( err ) { throw err; }
      var webPageName = blog.content_dir + slug + '.html';
      fs.writeFile(webPageName, webPage , function (err) {
        console.log('Create - '+(entry.contents)+' -> '+webPageName);
        if( err ) { throw err; }
      });
    });
  });});
});
