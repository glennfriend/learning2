"use strict";

/**
 *  console convert
 *
 *      html sample:
 *     
 *         <div id="board"></div>
 *
 *      javascript sample:
 *
 *         consoleConvert.setId('board');
 *         console.log('hello world');
 *
 */
(function() {

    // --------------------------------------------------------------------------------
    //  app setup
    // --------------------------------------------------------------------------------

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;

    var app = {};

    // version
    app.VERSION = '1.0.0';

    // 保留原本的 console 功能
    app.console = console;
    console = {};

    // 將內容列印到某個 element 的同時
    // true  => 也列印到 console
    app.appendtoConsoleWrite = false;

    // --------------------------------------------------------------------------------
    //  
    // --------------------------------------------------------------------------------

    /**
     *  指定要顯示的容器
     */
    app.setId = function( elementId )
    {
        var logger = document.getElementById(elementId);

        var write = function (message, icon) {
            icon = icon || '';

            if ( '[object Error]' === Object.prototype.toString.call(message) ) {
                message = app.processErrorMessage(message);
            }

            logger.innerHTML += icon;
            if (typeof message == 'object') {
                logger.innerHTML += JSON.stringify(message) + '<br />';
            }
            else {
                logger.innerHTML += message + '<br />';
            }

        }

        // NOTE: 暫時無法像 console 處理多 arguments 參數 的方法 console.log( 1,[2,3],{a:4} )
        // 暫時使用組成陣列的方式輸出
        var manyMessagesProcess = function(message, args) {
            if (args.length>1) {
                message = args;
            }
            return message;
        };

        console.log = function (message) {
            message = manyMessagesProcess(message, arguments);
            if (app.appendtoConsoleWrite) {
                app.console.log(message);
            }
            write(message);
        };

        console.info = function (message) {
            message = manyMessagesProcess(message, arguments);
            if (app.appendtoConsoleWrite) {
                app.console.info(message);
            }
            var icon = '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> ';
            write(message, icon);
        };

        console.warn = function (message) {
            message = manyMessagesProcess(message, arguments);
            if (app.appendtoConsoleWrite) {
                app.console.warn(message);
            }
            var icon = '<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> ';
            write(message, icon);
        };

        console.error = function (message) {
            message = manyMessagesProcess(message, arguments);
            if (app.appendtoConsoleWrite) {
                app.console.error(message);
            }
            var icon = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> ';
            write(message, icon);
        };

    };

    /**
     *  JSON.stringify 無法處理 Error 物件
     *  要經過特殊處理
     */
    app.processErrorMessage = function(message)
    {
        return message.toString();
    };

    // --------------------------------------------------------------------------------
    //  setup
    // --------------------------------------------------------------------------------

    // add to the global object
    root['consoleConvert'] = app;

}).call(this);
