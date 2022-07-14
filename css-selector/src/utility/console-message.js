"use strict";

/**
 * NOTE: 請改用 console-convert.js
 *
 * console message convert
 * 可以用來取代 console
 * 讓 console.log('message') 的時候也一起顯示在 browser 畫面上
 *
 *    html sample:
 *
 *      <div id="board"></div>
 *
 *    javascript sample:
 *
 *      const consoleMessage = ConsoleMessage();
 *      consoleMessage.setElementId('board')
 *      console.log('hello world');
 *      // globalThis['console'] = consoleMessage;
 *
 */
(function () {

  // --------------------------------------------------------------------------------
  //  init
  // --------------------------------------------------------------------------------

  const app = {
    vars: {}
  };

  // version
  app.vars.VERSION = '1.0.0';

  // canvas element
  app.vars.canvas = null;

  // global console
  app.vars.console = console;

  // --------------------------------------------------------------------------------
  //  private
  // --------------------------------------------------------------------------------

  // NOTE: 暫時無法像 console 處理多 arguments 參數 的方法 console.log( 1,[2,3],{a:4} )
  // 暫時使用組成陣列的方式輸出
  const manyMessagesProcess = function (message, args) {
    if (args.length > 1) {
      message = args;
    }
    return message;
  };

  const write = function (message, icon) {
    icon = icon || '';
    if (!app.vars.canvas) {
      console.log(123)
      return;
    }
    let canvas = app.vars.canvas;

    if ('[object Error]' === Object.prototype.toString.call(message)) {
      message = app.processErrorMessage(message);
    }

    canvas.innerHTML += icon;
    if (typeof message == 'object') {
      canvas.innerHTML += JSON.stringify(message) + '<br />';
    }
    else {
      canvas.innerHTML += message + '<br />';
    }

  }

  // --------------------------------------------------------------------------------
  //
  // --------------------------------------------------------------------------------

  app.log = function (message) {
    app.vars.console.log(message);
    message = manyMessagesProcess(message, arguments);
    write(message);
  }

  app.info = function (message) {
    app.vars.console.info(message);
    message = manyMessagesProcess(message, arguments);
    // const icon = '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> ';
    const icon = '🔵';
    write(message, icon);
  };

  // success ✅

  /**
   *  指定要顯示的容器
   */
  app.setElementId = function (elementId) {
    app.vars.canvas = document.getElementById(elementId);
  };

  /**
   *  JSON.stringify 無法處理 Error 物件
   *  要經過特殊處理
   */
  app.processErrorMessage = function (message) {
    return message.toString();
  };

  // --------------------------------------------------------------------------------
  //  setup
  // --------------------------------------------------------------------------------

  // add to the global object
  globalThis['consoleMessage'] = app;
})();


export function ConsoleMessage() {
  return consoleMessage;
}
