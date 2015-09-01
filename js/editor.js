/**
P5.JS EDITOR

28.8.2015 
 - Poistettu koodin päivitys-painike (aina automaattinen)
29.8.2015 
 - Korjattu tallennus ja uusien projektien luominen
 - Tallennus .html -tiedostopäätteisenä
31.8.2015
 - Korjattu valikoiden tyylejä ja otettu käyttöön Font Awesome-ikonit
 - Automaattisen päivityksen funktiot tehty uusiksi
1.9.2015
 - CSS-korjauksia ja lisätty linkit GitHubiin ja p5js.org:iin
 - Koodia siistitty ja kommentoitu
*/

window.URL = window.URL || window.webkitURL;

// deflate
var decode = function ( string ) {
  return RawDeflate.inflate( window.atob( string ) );
};

var encode = function ( string ) {
  return window.btoa( RawDeflate.deflate( string ) );
};

var documents = ( localStorage.codeeditor !== undefined ) ? JSON.parse( localStorage.codeeditor ) : [templates[0]]; //templates.length-1
var EDIT_ONLY = window.location.search.indexOf('?e') > -1;
var RUN_MODE = window.location.search.indexOf('?r') > -1;

var p5js_parent = document.getElementById('p5js') || document.body,
    embedded = !!document.getElementById('p5js');

p5js_parent.style.margin = '0px';
p5js_parent.style.overflow = 'hidden';

// preview

var preview = document.createElement( 'div' );
preview.id = embedded ? "preview_embed" : "preview";
if (!EDIT_ONLY) {
  p5js_parent.appendChild( preview );
}

// editor

var editor_el = document.createElement( 'div' );
editor_el.id = embedded ? "editor_embed" : "editor";
p5js_parent.appendChild( editor_el );

var editor = ace.edit(editor_el.id);
editor.setTheme("ace/theme/chrome");
//var editor = ace.edit("editor");
//editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setMode("ace/mode/html");
editor.getSession().setUseWrapMode(true);
editor.getSession().setUseSoftTabs(true);
editor.getSession().setTabSize(2);
editor.setPrintMarginColumn(false);
editor.setDisplayIndentGuides(false);
editor.setFontSize('18px');

var UndoManager = require("ace/undomanager").UndoManager;
var CommandManager = editor.getKeyboardHandler();
var EmacsManager = require("ace/keyboard/emacs").handler;
editor.setKeyboardHandler(CommandManager);

function clearContent(data) {
  documents.length = 0;
  documents[0] = templates[0];
  syncStore();

  if (data!==undefined) {
    name = (0|Math.random()*9e6).toString(36);
    create(templates[0].code, name);
    changeProject(name);
  }
}

function handleChange(event) {
  save();
  resetUpdateTimer();
}

function setContent(data) {
  editor.getSession().removeListener('change', handleChange);
  editor.setValue(data, -1);
  editor.getSession().setUndoManager(new UndoManager());
  editor.getSession().on('change', handleChange);
  update(); // visualization layer
}

var interval;
document.addEventListener('keydown', function (event) {
  if (interval) resetUpdateTimer();
});

editor.keyBinding.originalOnCommandKey = editor.keyBinding.onCommandKey;
editor.keyBinding.onCommandKey = function(e, hashId, keyCode) {
  if (keyCode >=37 && keyCode <= 40) {
    if (interval) resetUpdateTimer();
  }
  this.originalOnCommandKey(e, hashId, keyCode);
};

function resetUpdateTimer() {
  if (documents[0].autoupdate === false) return;

  clearTimeout(interval);
  interval = setTimeout(
    function() { update(); interval = undefined; },
    1.5 * 1000
  );
}

// popup

var popup_el = document.createElement( 'div' );
popup_el.id = "popup";
if (!embedded) document.body.appendChild( popup_el );

/*
 * TOIMINTOPAINIKKEET JA VALIKKO
 */ 

var pad = function ( number, length ) {

  var string = number.toString();

  while ( string.length < length ) string = '0' + string;
  return string;

};

var codeToolbar = function() {
  if (embedded) return;
  toolbar(
    buttonUpdate(),
    buttonHide(),
    buttonCodeMenu()
  );
};

var shortCodeToolbar = function() {
  toolbar(
    buttonShow()
  );
};

var projectMenu = function() {
  menu(
    menuNew(),
    menuClear(),
    menuDownload(),
    menuReference(),
    menuAbout()
  );
};

var toolbar = function() {
  var buttons = Array.prototype.slice.apply(arguments);

  var old = document.getElementById('code-editor-toolbar');
  if (old) document.body.removeChild(old);

  var el = document.createElement( 'div' );
  el.id = 'code-editor-toolbar';
  el.style.position = 'absolute';
  el.style.right = '15px';
  el.style.top = '15px';
  document.body.appendChild( el );

  buttons.forEach(function(button) {
    el.appendChild(button);
  });
};

var menu = function() {
  var items = Array.prototype.slice.apply(arguments);

  var old = document.getElementById('code-editor-menu');
  if (old) {
    document.body.removeChild(old);
    return;
  }

  var el = document.createElement( 'ul' );
  el.id = 'code-editor-menu';
  el.className = 'menu';
  el.style.position = 'absolute';
  el.style.right = '17px';
  el.style.top = '55px';
  document.body.appendChild( el );

  items.forEach(function(item) {
    el.appendChild(item);
  });

  el.addEventListener( 'click', function ( event ) {
    document.body.removeChild(el);
  });
};

// Ruudun päivitys
var buttonUpdate = function() {
  var el = document.createElement( 'button' );
  el.className = 'button';
  var buttonUpdateIcon = document.createElement('span');
  if (documents.length == 0 || documents[0].autoupdate === true) { buttonUpdateIcon.className = 'fa fa-pause'; } 
  else { buttonUpdateIcon.className = 'fa fa-play'; }
  buttonUpdateIcon.id = 'update';
  el.appendChild(buttonUpdateIcon);
  el.title = 'Koodin automaattinen päivitys päälle/pois';
  el.addEventListener('click', function (event) {
    event.stopPropagation();
    documents[0].autoupdate = documents[0].autoupdate === false;
    syncStore();
    toggleUpdate();
  }, false );
  return el;
};

// Valikko: Uusi projekti
var menuNew = function() {
  var el = document.createElement( 'li' );
  var icon = document.createElement('i');
  icon.className = 'fa fa-file-code-o';
  el.appendChild(icon);
  var text = document.createElement('span');
  text.textContent = 'luo uusi (esimerkit)';
  el.appendChild(text);
  el.addEventListener( 'click', function ( event ) { openNewDialog(); }, false );
  return el;
};

// Valikko: Piirtoalueen tyhjennys
var menuClear = function() {
  var el = document.createElement( 'li' );
  var icon = document.createElement('i');
  icon.className = 'fa fa-file-o';
  el.appendChild(icon);
  var text = document.createElement('span');
  text.textContent = 'tyhjennä piirtoalue (tyhjä pohja)';
  el.appendChild(text);
  el.addEventListener( 'click', function ( event ) { clearContent(true); }, false );    //openProjectsDialog();
  return el;
};

// Valikko: Tallennus omalle koneelle
var menuDownload = function() {
  var el = document.createElement('li')
  var icon = document.createElement('i');
  icon.className = 'fa fa-floppy-o';
  el.appendChild(icon);
  var text = document.createElement('span');
  var a = document.createElement('a');
  a.download = 'index.html';
  a.textContent = 'tallenna omalle koneelle';
  a.addEventListener( 'click', function ( event ) { download(event.target); }, false );
  text.appendChild(a);
  el.appendChild(text);
  return el;
};

// Valikko: Dokumentaatio
var menuReference = function() {
  var el = document.createElement( 'li' );
  var icon = document.createElement('i');
  icon.className = 'fa fa-book';
  el.appendChild(icon);
  var text = document.createElement('span');
  text.textContent = 'p5.js dokumentaatio';
  el.appendChild(text);
  el.addEventListener( 'click', function ( event ) { 
    window.open('http://p5js.org/reference/');
}, false );
  return el;
};

// Valikko: Tietoja
var menuAbout = function() {
  var el = document.createElement( 'li' );
  var icon = document.createElement('i');
  icon.className = 'fa fa-info-circle';
  el.appendChild(icon);
  var text = document.createElement('span');
  text.textContent = 'Tietoja sovelluksesta';
  el.appendChild(text);
  el.addEventListener( 'click', function ( event ) { 
    window.open('https://github.com/tavellan/p5jsEditor/');
}, false );
  return el;
};

// popup
var popup = ( function () {
  if (embedded) return;
  var scope = this;

  var element = document.getElementById( 'popup' );
  element.style.display = 'none';

  var buttonClose = ( function () {
    var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
    svg.setAttribute( 'width', 32 );
    svg.setAttribute( 'height', 32 );

    var path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
    path.setAttribute( 'd', 'M 9,12 L 11,10 L 15,14 L 19,10 L 21,12 L 17,16 L 21,20 L 19,22 L 15,18 L 11,22 L 9,20 L 13,16' );
    path.setAttribute( 'fill', 'rgb(235,235,235)' );
    svg.appendChild( path );

    return svg;
  } )();

  buttonClose.style.position = 'absolute';
  buttonClose.style.top = '5px';
  buttonClose.style.right = '5px';
  buttonClose.style.cursor = 'pointer';
  buttonClose.addEventListener( 'click', function ( event ) {
    scope.hide();
  }, false );
  element.appendChild( buttonClose );

  var content = document.createElement( 'div' );
  element.appendChild( content );

  var update = function () {
    element.style.left = ( ( window.innerWidth - element.offsetWidth ) / 2 ) + 'px';
    element.style.top = ( ( window.innerHeight - element.offsetHeight ) / 2 ) + 'px';

  };

  window.addEventListener( 'load', update, false );
  window.addEventListener( 'resize', function() {scope.hide();}, false );

  //
  this.show = function () {
    element.style.display = '';
    update();
  };

  this.hide = function () {
    element.style.display = 'none';
  };

  this.set = function ( value ) {
    while ( content.children.length > 0 ) {
      content.removeChild( content.firstChild );
    }
    content.appendChild( value );
  };

  return this;
} )();

// Painike: Piilota koodi
var buttonHide = function() {
  var el = document.createElement( 'button' );
  el.className = 'button';
  var icon = document.createElement('span');
  icon.className = 'fa fa-eye-slash';
  el.appendChild(icon);
  el.title = 'Piilota koodi';
  el.addEventListener( 'click', function ( event ) {
    toggleCodeView();
  }, false );
  return el;
};

// Painike: Näytä koodi
var buttonShow = function() {
  var el = document.createElement( 'button' );
  el.className = 'button';
  var icon = document.createElement('span');
  icon.className = 'fa fa-eye';
  el.appendChild(icon);
  el.title = 'Näytä koodi';
  el.addEventListener( 'click', function ( event ) {
    toggleCodeView();
  }, false );
  return el;
};

// Painike: Näytä valinnat
var buttonCodeMenu = function() {
  var el = document.createElement( 'button' );
  el.className = 'button';
  var icon = document.createElement('span');
  icon.className = 'fa fa-bars';
  el.appendChild(icon);
  el.title = 'Näytä valinnat';
  el.addEventListener( 'click', function ( event ) {
    if (document.getElementById('projects-dialog')) {
      document.body.removeChild(
      document.getElementById('projects-dialog')
      );
    }
    closeNewDialog();
    projectMenu();
  }, false );
  return el;
};

/*
 * TAPAHTUMAKÄSITTELIJÄT
 */

document.addEventListener( 'drop', function ( event ) {

  event.preventDefault();
  event.stopPropagation();

  var file = event.dataTransfer.files[ 0 ];

  documents[ 0 ].filename = file.name;
  documents[ 0 ].filetype = file.type;

  var reader = new FileReader();

  reader.onload = function ( event ) {
    setContent( event.target.result );
  };

  reader.readAsText( file );

}, false );

document.addEventListener( 'keypress', function ( event ) {
  if ( event.keyCode === 9829 ) { // <3
    event.preventDefault();
    if (editor.getKeyboardHandler() == CommandManager) {
      editor.setKeyboardHandler(EmacsManager);
    }
    else {
      editor.setKeyboardHandler(CommandManager);
    }
  }
});

document.addEventListener( 'keydown', function ( event ) {
  if ( event.keyCode === 83 && ( event.ctrlKey === true || event.metaKey === true ) ) {
    event.preventDefault();
    save();
  }

  if ( event.keyCode === 13 && ( event.ctrlKey === true || event.metaKey === true ) ) {
    update();
  }

  if ( event.keyCode === 27 ) { // ESC

    if (document.getElementById('code-editor-menu')) {
      document.body.removeChild(
        document.getElementById('code-editor-menu')
      );
    }
    else if (document.getElementById('new-dialog')) {
      document.body.removeChild(
        document.getElementById('new-dialog')
      );
    }
    else {
      toggleCodeView();
    }

  }

}, false );

// Display hack. Disallow Ctrl++ and Ctrl+- zooming.
document.addEventListener( 'keydown', function ( event ) {
  if (!event.ctrlKey) return;
  if (event.keyCode != 187 && event.keyCode != 189) return;
  event.preventDefault();
});

/*
 * VALIKKOIKKUNAT
 */ 

var openNewDialog = function() {
  var newDialog = document.createElement( 'div' );
  newDialog.id = 'new-dialog';
  newDialog.className = 'dialog';
  document.body.appendChild( newDialog );

  var newProjectLabel = document.createElement( 'label' );
  newProjectLabel.textContent = 'Nimi:';
  newDialog.appendChild( newProjectLabel );

  var newProjectField = document.createElement( 'input' );
  newProjectField.type = 'text';
  newProjectField.size = 30;
  newProjectLabel.appendChild( newProjectField );
  newProjectField.addEventListener('keypress', function(event) {
    if (event.keyCode != 13) return;
    createProject(newProjectField.value, templateField.value);
    closeNewDialog();
  }, false);

  var buttonNewDialog = document.createElement( 'button' );
  buttonNewDialog.className = 'button';
  buttonNewDialog.textContent = 'Tee ja avaa';
  buttonNewDialog.addEventListener( 'click', function ( event ) {
    clearContent();
    createProject(newProjectField.value, templateField.value);
    closeNewDialog();
  }, false );
  newDialog.appendChild( buttonNewDialog );

  var templateDiv = document.createElement( 'div' );
  newDialog.appendChild( templateDiv );

  var templateLabel = document.createElement( 'label' );
  templateLabel.textContent = 'Pohja:';
  templateDiv.appendChild( templateLabel );

  var templateField = document.createElement( 'select' );
  templateLabel.appendChild(templateField);
  templates.forEach(function(template) {
    var optionField = document.createElement( 'option' );
    optionField.textContent = template.filename;
    templateField.appendChild(optionField);
  });

  var closeNewP = document.createElement( 'p' );
  closeNewP.className = 'cancel';
  newDialog.appendChild( closeNewP );

  var closeNewLink = document.createElement( 'a' );
  closeNewLink.href = '#';
  closeNewLink.textContent = '[ sulje ]';
  closeNewLink.addEventListener( 'click', function ( event ) {

    closeNewDialog();
    event.stopPropagation();
    event.preventDefault();

  }, false );
  closeNewP.appendChild( closeNewLink );

  newProjectField.focus();
};

var createProject = function(name, template_name) {
  var code = templates.
    reduce(function(code, template) {
      if (template.filename == template_name) return template.code;
      return code;
    }, undefined);
  name = ((name!=='') ? name : (0|Math.random()*9e6).toString(36));
  create(code, name);
  changeProject(name);
};

var closeNewDialog = function() {
  var dialog = document.getElementById('new-dialog');
  if ( ! dialog ) return;

  dialog.parentElement.removeChild(dialog);
};

/*
 * YLEISFUNKTIOT
 */

var create = function(code, title) {
  if (!title) title = nextUntitled();
  if ( documents.length == 0 || documents[0].filename != title) {
    documents.unshift({
      filetype: 'text/plain',
      autoupdate: documents[0].autoupdate
    });
  }
  documents[0].code = code;
  documents[0].filename = title;
  syncStore();
};

var saveAs = function (title) {
  create(editor.getValue(), title);
};

var save = function() {
  documents[ 0 ].code = editor.getValue();
  syncStore();
};

var syncStore = function() {
  localStorage.codeeditor = JSON.stringify( documents );
};

var update = function () {
  if (EDIT_ONLY) return;
  while ( preview.children.length > 0 ) {
    preview.removeChild( preview.firstChild );
  }

  var iframe = document.createElement( 'iframe' );
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';
  preview.appendChild( iframe );

  var content = iframe.contentDocument || iframe.contentWindow.document;

  content.open();
  content.write( editor.getValue() );
  content.close();
};

var changeProject = function(filename) {
  var new_documents = [];

  var i = 0, found;
  while (i < documents.length) {
    if (documents[i].filename == filename) {
      found = documents[i];
    }
    else {
      new_documents.push(documents[i]);
    }
    i++;
  }

  if ( ! found ) return;

  new_documents.unshift(found);
  documents = new_documents;
  setContent(documents[0].code);
};

var deleteProject = function(filename) {
  var new_documents = [];

  var i = 0, found;
  while (i < documents.length) {
    if (documents[i].filename == filename) {
      found = documents[i];
    }
    else {
      new_documents.push(documents[i]);
    }
    i++;
  }

  if ( ! found ) return;

  documents = new_documents;
  syncStore();
};

// Lataa koodi omalle koneelle

var download = function(el) {
  var blob = new Blob( [ editor.getValue() ], { type: 'text/html' } ); 
  //console.log(documents[0].filetype);
  var objectURL = URL.createObjectURL(blob);
  el.href = objectURL;
  el.download = documents[0].filename+'.html';
};

// Toggle: päivitä / pysäytä koodin päivitys

var toggleUpdate = function() {
  if (documents.length == 0 || documents[0].autoupdate === true) {
    console.log('Autoupdate ON');
    var el = document.getElementById('update');
    el.className = 'fa fa-pause';
    update();
  }
  else {
    console.log('Autoupdate OFF');
    var el = document.getElementById('update');
    el.className = 'fa fa-play';
  }
};

// Toggle: näytä / piilota koodi

var toggleCodeView = function() {
  if ( editor_el.style.display === '' ) hideCode();
  else showCode();
};

// Näytä koodi

var showCode = function() {
  codeToolbar();
  editor_el.style.display = '';
  editor.renderer.onResize();
  editor.focus();
};

// Piilota koodi

var hideCode = function() {
  shortCodeToolbar();
  editor_el.style.display = 'none';
    if (document.getElementById('code-editor-menu')) {
      document.body.removeChild(
        document.getElementById('code-editor-menu')
      );
    }
  preview.children[0].focus();
};

var nextUntitled = function() {
  var nums = documents.
    filter(function(doc) {
      return doc.filename.match(/Untitled/);
    }).
    map(function(doc) {
      return parseInt(doc.filename.replace(/Untitled\s*/, ''), 10);
    }).
    filter(function (num) {
      return !isNaN(num);
    }).
    sort();

  return 'Untitled ' + (nums.length == 0 ? 1 : nums[nums.length-1] + 1);
};

/*
 * MAIN (STARTUP)
 */

if ( window.location.hash ) {
  var hash = window.location.hash.substr( 1 );
  var version = hash.substr( 0, 2 );

  if ( version == 'A/' ) {
    alert( '' );
  } else if ( version == 'B/' ) {
    create(decode(hash.substr(2)));
    window.location.hash = '';
  }

}

clearContent(true);

codeToolbar();
if (RUN_MODE) hideCode();
