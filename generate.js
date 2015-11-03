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

var blog = require('./docs/config.js').blog;

// アップデート日を取得
var d = new Date();
var updateAt = d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';

// 静的ファイルのコピー
mkdirp(blog.content_dir,function(err){
  if( err ) { throw err; }
  fs.copySync('./docs/img', blog.content_dir+'img',function(){
    console.log('Copy   - img -> '+blog.content_dir+'img');
  });
  fs.copySync('./docs/css', blog.content_dir+'css',function(){
    console.log('Copy   - css -> '+blog.content_dir+'css');
  });
  fs.copySync('./docs/js', blog.content_dir+'js',function(){
    console.log('Copy   - js -> '+blog.content_dir+'js');
  });
});
// 各Webページを出力する
async.forEach(Object.keys(blog.entries),function(slug){
  var entry = blog.entries[slug];
  // マークダウン形式のファイルを読み込みHTMLの状態にしてConcat
  new Promise(function( resolv ){
    var article = "";
    entry.contents.forEach(function(content){
      var mdFileName = 'docs/'+content+'.md';
      var finCount = 0;
      fs.readFile(mdFileName, 'utf8', function( err, markDown ) {
        if( err ) { throw err; }
        markDown = markDown.replace( /\+ (.+?)\n/g, "<li>$1</li>" );
        markDown = markDown.replace( /(<li>.+?<\/li>)\n/g, "<ul>$1</ul>\n" );
        markDown = markDown.replace( /\#\# (.+?)\n\n/g, "<h3>$1</h3>\n" );
        markDown = markDown.replace( /\# (.+?)\n\n/g, "<h2>$1</h2>\n" );
        markDown = markDown.replace( /\!\[(.*)\]\((.*)\)/g, "<img alt='$1' src='img/$2'>" );
        markDown = markDown.replace( /(.+?)(\n\n|\n$|$)/g, "<p>$1</p>\n" );
        article += markDown;
        finCount++;
        if( finCount === entry.contents.length ) {
          resolv( article );
        }
      });
    });
  // HTML記事を受け取りテンプレートを元にWebページの状態へと加工
  }).then(function( article ) { return new Promise(function(resolv){
    fs.readFile('template.html','utf8',function( err, template ) {
      if( err ) { throw err; }
      template = template.replace( /\#\#SITE_TITLE\#\#/g , blog.title );
      template = template.replace( /\#\#SITE_UPDATE_AT\#\#/g , updateAt );
      if( entry.is_toppage ) {
        template = template.replace( /\#\#BEGIN_ENTRY\#\#.+?\#\#END_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#BEGIN_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#END_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#BLOG_TITLE\#\#/g , blog.title );
      } else {
        template = template.replace( /\#\#BEGIN_TOPPAGE\#\#.+?\#\#END_TOPPAGE\#\#/g ,'' );
        template = template.replace( /\#\#BEGIN_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#END_ENTRY\#\#/g ,'' );
        template = template.replace( /\#\#BLOG_TITLE\#\#/g , entry.title + " - " + blog.title );
        template = template.replace( /\#\#PAGE_TITLE\#\#/g , entry.title );
      }
      template = template.replace( /\#\#PAGE_CONTENT\#\#/g, article);
      template = template.replace( /\#\#BLOG_COPYRIGHT\#\#/g , blog.copyright );
      resolv(template);
    });
  // WebページをHTMLファイルとして書き出す
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
