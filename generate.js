/*************************************************
 * blog-aggs.js
 * Copyright 2015, @_sakurashiki
 * https://github.com/sakurashiki/booth_maniax
 * This software is released under the MIT License.
*/

'use strict';

var fs = require('fs');
var blog = require('./docs/config.js').blog;

// 指定したファイルディスクリプタに対して指定したMarkdowファイルを追記する
function compileMarkdownFile( params ) {
  return new Promise(function( resolv ){
    var blog       = params.blog ? params.blog : blog;
    var mdFileName = params.fileName;
    var result = '';
    fs.readFile('docs/'+mdFileName+'.md','utf8',function( err, partText ) {
      if( err ) { throw err; }
      partText = partText.replace( /\+ (.+?)\n/g, "<li>$1</li>" );
      partText = partText.replace( /(<li>.+?<\/li>)\n/g, "<ul>$1</ul>\n" );
      partText = partText.replace( /\#\# (.+?)\n\n/g, "<h3>$1</h3>\n" );
      partText = partText.replace( /\# (.+?)\n\n/g, "<h2>$1</h2>\n" );
      partText = partText.replace( /\!\[(.*)\]\((.*)\)/g, "<img alt='$1' src='img/$2'>" );
      partText = partText.replace( /(.+?)(\n\n|\n$|$)/g, "<p>$1</p>\n" );
      resolv(partText);
    });
  });
}

// ページの出力処理
for( var slug in blog.entries ) {
  var entry = blog.entries[slug];
  for( var i=0; i< entry.contents.length ; i++ ) {
    var content = entry.contents[i];
    var result = '';
    fs.readFile('template.html','utf8',function( err, template ) {
      if( err ) { throw err; }
      template = template.replace( /\#\#BLOG_TITLE\#\#/g , entry.title + " - " + blog.title );
      template = template.replace( /\#\#PAGE_TITLE\#\#/g , entry.title );
      template = template.replace( /\#\#BLOG_COPYRIGHT\#\#/g , blog.copyright );
      compileMarkdownFile( { fileName:content } ).then(function( html ){
        template = template.replace( /\#\#PAGE_CONTENT\#\#/g, html);
        console.log(template);
      });
    });
  }
}
