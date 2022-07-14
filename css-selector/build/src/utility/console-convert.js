"use strict";

/**
 * 在原有 console.log 的功上加上附加訊息
 * 可以將內容也一併顯示在 dom element 裡面
 * 可以使用 或 直接取代原有的 console
 *
 * console convert
 *
 *    html sample:
 *
 *      <div id="board"></div>
 *
 *    javascript sample:
 *
 *      const consoleConvert = ConsoleConvert();
 *      consoleConvert.setElementId('board')
 *      console.log('hello world');
 *      // globalThis['console'] = consoleConvert;
 *
 */
(function () {

  // --------------------------------------------------------------------------------
  //  private
  // --------------------------------------------------------------------------------

  const clone = function (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

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
  //  init
  // --------------------------------------------------------------------------------

  const consoleDuplicate = clone(console);
  const app = clone(console);

  app.vars = {};

  // --------------------------------------------------------------------------------
  //  overwrite
  // --------------------------------------------------------------------------------

  app.log = function (message) {
    consoleDuplicate.log(message);
    message = manyMessagesProcess(message, arguments);
    write(message);
  }

  app.info = function (message) {
    consoleDuplicate.info(message);
    message = manyMessagesProcess(message, arguments);
    // const icon = '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> ';
    const icon = '🔵';
    write(message, icon);
  };

  app.warn = function (message) {
    consoleDuplicate.warn(message);
    message = manyMessagesProcess(message, arguments);
    const icon = '🟡';
    write(message, icon);
  };

  app.error = function (message) {
    consoleDuplicate.error(message);
    message = manyMessagesProcess(message, arguments);
    const icon = '🔴';
    write(message, icon);
  };

  // --------------------------------------------------------------------------------
  //  extend
  // --------------------------------------------------------------------------------

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
  globalThis['consoleConvert'] = app;
})();


export function ConsoleConvert() {
  return consoleConvert;
}
