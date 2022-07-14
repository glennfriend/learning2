"use strict";
import hljs from '../../_snowpack/pkg/highlightjs.js';
//import {core} from '@babel/core';
//import * as babel from "@babel/core";
//import { transform } from "@babel/core";
//var babel = require("@babel/core");
//import {babel} from '@babel/core';

var Dom = {};
Dom.getChildByTag = function (element, target) {
  for (let i = 0; i < element.children.length; i++) {
    let tagName = element.children[i].tagName.toLowerCase();
    if (tagName !== target) {
      continue;
    }
    return element.children[i];
  }
  return null;
}


/**
 *  每次載入頁面都要呼叫該程式
 */
export function everyOneLoadPage() {
  // clean all pre code "\n" and space
  document.querySelectorAll(".js-return code").forEach(function (element) {
    //console.log(element)
    var text = element.innerText;
    element.innerText = collocateSourceCode(text)
  });

  // render
  // 先保留 source code, 免得上色後被污染, 就無法使用了
  document.querySelectorAll(".js-return").forEach(function (element) {
    //console.log(element)

    let codeElement = Dom.getChildByTag(element, 'code');
    if (!codeElement) {
      return;
    }

    // find code
    let sourceCode = codeElement.innerText;

    let newContent;
    newContent = document.createElement('p');
    element.appendChild(newContent);

    newContent = document.createElement('input');
    newContent.setAttribute("style", "float:right");
    newContent.setAttribute("type", "button");
    newContent.setAttribute("class", "js_button");
    newContent.setAttribute("value", "return");
    element.appendChild(newContent);
    //element.appendChild('<p></p>');
    //element.appendChild('<input style="float:right" type="button" class="js_button" value="return" />');


    let returnButton = element.querySelector('.js_button');
    if (!returnButton) {
      return
    }
    returnButton.onclick = function () {
      var run = new Function(sourceCode);
      run();
      // babel.run(sourceCode)
    };

  });

  // 程式碼上色
  document.querySelectorAll('.js-return code').forEach(function (block) {
    block.innerHTML = hljs.highlightAuto(block.innerText).value;
  });

}


export function collocateSourceCode(text) {
  var items = text.trim().split("\n");
  var result = [];
  for (var i in items) {
    var item = items[i];
    if ("    " === item.substr(0, 4)) {
      item = item.substr(4);
    }
    result.push(item);
  }
  return result.join("\n");
}

/**
 * 讀取 html file 內容
 * 並且寫到指定的 #id
 */
export async function load(tag, template) {
  if (!tag) {
    return;
  }
  if (tag.substr(0, 1) == "#") {
    tag = tag.substr(1);
  }
  const file = template + tag + ".htm";

  await fetch(file)
    .then(response => response.text())
    .then(text => document.getElementById('content').innerHTML = text);

  /*
      document.querySelector('#content').load(file, function(response, status, xhr){
          if (status=2000) {
              document.querySelector(".js-load").each(function(){
                  if ( document.querySelector(this).attr('href') == "#"+tag ) {
                      document.querySelector(this).addClass("active");
                  }
                  else {
                      document.querySelector(this).removeClass("active");
                  }
              });

              everyOneLoadPage();
          }
      });
  */
}
