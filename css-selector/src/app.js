import { load, everyOneLoadPage } from './utility/helper.js';
import { ConsoleConvert } from './utility/console-convert.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/ir-black.css';
//import hljs from 'highlight.js';


(function () {

  let pageLoad = async function () {
    if (location.hash) {
      await load(location.hash, template);
      everyOneLoadPage();
    }
  };

  const consoleMessage = ConsoleConvert();
  consoleMessage.setElementId('board')

  //
  var template = 'src/template/';
  if (location.hostname == "htmlpreview.github.io") {
    var template = 'https://raw.githubusercontent.com/glennfriend/learning2/master/css-selector/src/template/'
  }


  window.addEventListener('hashchange', function () {
    pageLoad();
  }, false);

  // first time
  pageLoad();


  globalThis['console'] = consoleMessage;

})();
