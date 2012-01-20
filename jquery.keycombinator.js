////$(document).ready(function(){
      ////$(window).keypress(function(e) {
        ////console.log('doc keypress keycode', e.keyCode);
        ////console.log('doc keypress charCode', e.charCode);
        ////console.log(e);
    ////// e.stopPropagation();
    ////// e.preventDefault();
      ////}).keydown(function(e){
        ////console.log('doc keydown keycode', e.keyCode);
        ////console.log('doc keydown originalEvent keycode', e.originalEvent.keyCode);
        ////console.log(e);
    ////// e.stopPropagation();
    ////// e.preventDefault();
      ////}).keyup(function(e){
        ////console.log('doc keyup keycode', e.keyCode);
        ////console.log('doc keyup charCode', e.charCode);
        ////console.log(e);
    ////// e.stopPropagation();
    ////// e.preventDefault();
      ////});
////});

(function($){

  ////// Private
  ////var _modProps = { 16: 'shiftKey', 17: 'ctrlKey', 18: 'altKey', 91: 'metaKey' };

  var keys = {
    // Shift key, ⇧
    // '⇧': 16, shift: 16,
    16: {mac: '⇧', win: 'Shift', unix: 'Shift'},
    // CTRL key, on Mac: ⌃
    17: {mac: '⌃', win: 'Ctrl', unix: 'Ctrl'},
    // ALT key, on Mac: ⌥ (Alt)
    18: {mac: '⌥', win: 'Alt', unix: 'Alt'},
    // META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
    91: {mac: '⌘', win: 'Win', unix: 'Super'},
    224: {mac: '⌘', win: 'Win', unix: 'Super'},   // FF
    // Backspace key, on Mac: ⌫ (Backspace)
    8: {mac: '⌫', win: 'Backspace', unix: 'Backspace'},
    // Tab Key, on Mac: ⇥ (Tab), on Windows ⇆
    9: {mac: '⇥', win: 'Tab', unix: 'Tab'},
    // Return key, ↩
    13: {mac: '↩', win: 'Enter', unix: 'Enter'},
    // Pause/Break key
    19: {all: 'Pause'},
    // Caps Lock key, ⇪
    20: {mac: '⇪', win: 'Caps Lock', unix: 'Caps Lock'},
    // Escape key, on Mac: ⎋, on Windows: Esc
    27: {mac: '⎋', win: 'Esc', unix: 'Esc'},
    // Space key
    32: {all: 'Space'},
    // Page-Up key, or pgup, on Mac: ↖
    33: {mac: '↖', win: 'Page Up', unix: 'Page Up'},
    // Page-Down key, or pgdown, on Mac: ↘
    34: {mac: '↘', win: 'Page Down', unix: 'Page Down'},
    // END key, on Mac: ⇟
    35: {mac: '⇟', win: 'End', unix: 'End'},
    // HOME key, on Mac: ⇞
    36: {mac: '⇞', win: 'Home', unix: 'Home'},
    // Insert key, or ins
    45: {all: 'Ins'},
    // Delete key, on Mac: ⌫ (Delete)
    46: {mac: '⌫ ', win: 'Del', unix: 'Del'},
    
    // Left Arrow Key, or ←
    37: {mac: '←',  win: 'Left Arrow', unix: 'Left Arrow'},
    // Up Arrow Key, or ↑
    38: {mac: '↑', win: 'Up Arrow', unix: 'Up Arrow'},
    // Right Arrow Key, or →
    39: {mac: '→', win: 'Right Arrow', unix: 'Right Arrow'},
    // Up Arrow Key, or ↓
    40: {mac: '↓', win: 'Down Arrow', unix: 'Down Arrow'},
    
    // odities, printing characters that come out wrong:
    // Num-Multiply, or *
    106: {all: '*'},
    // Num-Plus or +
    107: {all: '+'},
    // Num-Subtract, or -
    109: {all: '-'},
    // Semi-colon, or ;
    59: {all: ';'},   // firefox
    186: {all: ';'},  // IE & chrome
    // = or equals
    61: {all: '='},   // FF
    187: {all: '='},  // IE & Chrome
    // Comma, or ,
    188: {all: ','},
    // Dash, or -
    109: {all: '-'},  // FF
    189: {all: '-'},  // IE & Chrome
    // Period, or ., or full-stop
    190: {all: '.'},
    // Slash, or /, or forward-slash
    191: {all: '/'},
    // Tick, or `, or back-quote 
    192: {all: '`'},
    // Open bracket, or [
    219: {all: '['},
    // Back slash, or \
    220: {all: '\\'},
    // Close backet, or ]
    221: {all: ']'},
    // Apostraphe, or Quote, or '
    222: {all: '\''}
  }
  // To minimise code bloat, add all of the NUMPAD 0-9 keys in a loop
  i = 95, n = 0;
  while(++i < 106) {
    // keys['num-' + n] = i;
    keys[i] = {all: 'Num-' + n};
    ++n;
  }
  // To minimise code bloat, add all of the top row 0-9 keys in a loop
  i = 47, n = 0;
  while(++i < 58) {
      // _keys.keys[n] = i;
    keys[i] = {all: n};
    ++n;
  }
  // To minimise code bloat, add all of the F1-F25 keys in a loop
  i = 111, n = 1;
  while(++i < 136) {
      // _keys.keys['f' + n] = i;
    keys[i] = {all: 'F' + n};
    ++n;
  }
  // To minimise code bloat, add all of the letters of the alphabet in a loop
  var i = 64;
  while(++i < 91) {
      // _keys.keys[String.fromCharCode(i).toLowerCase()] = i;
    keys[i] = {all: String.fromCharCode(i).toUpperCase()};
  }

  var accents = {
    '¨': 85,    // U
    '´': 69,    // E
    '`': 192,   // `
    'ˆ': 73,    // I
    '˜': 78     // N
  };
    
  function getKeyChar(keyCode){
    console.log('in getKeyChar', keyCode);
    if (key = keys[keyCode]){
      if (key.all != undefined){ console.log('getKeyChar if', keyCode); return key.all;}
      else{ console.log('getKeyChar else', keyCode); return key[platform]; }
    }
      ////// MOD aka toggleable keys
      ////mods: {
          ////// Shift key, ⇧
          ////// '⇧': 16, shift: 16,
          ////16: '⇧': shift: ,
          ////// CTRL key, on Mac: ⌃
          ////'⌃': 17, ctrl: 17,
          ////// ALT key, on Mac: ⌥ (Alt)
          ////'⌥': 18, alt: 18, option: 18,
          ////// META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
          ////'⌘': 91, meta: 91, cmd: 91, 'super': 91, win: 91
      ////},
      
      // Normal keys
  }
    
  var delimiter = '+';
  var shift_sign = 'shift';
  var meta_sign = 'super';
  var ctrl_sign = 'ctrl';
  var alt_sign = 'alt';

  var platform;
  var rawPlatform = navigator.platform.toLowerCase();
  if (rawPlatform.indexOf('mac') >= 0){
    platform = 'mac';
    delimiter = '';
  }
  else if (rawPlatform.indexOf('win') >= 0){
    platform = 'win';
  }
  else{
    platform = 'unix';  
  }

  var modifiers = ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
  var modKeyCodes = [17, 18, 16, 91, 224];
  function EventCombo(){
    this.keyCodes = [];
    this.ctrlKey = false;
    this.altKey = false;
    this.shiftKey = false;
    this.metaKey = false;
  }
  var pressed = new EventCombo();
  var released = new EventCombo();
  var eventCombos = [pressed, released];

  function modifiersMatch(){
    console.log('mm pressed keyCodes', pressed.keyCodes);
    console.log('mm released keyCodes', released.keyCodes);
    for (i in modKeyCodes){
      var kc = modKeyCodes[i];
      console.log('kc', kc);
      if (($.inArray(kc, pressed.keyCodes)>=0 && $.inArray(kc, released.keyCodes)<0) ||
          ($.inArray(kc, released.keyCodes)>=0 && $.inArray(kc, pressed.keyCodes)<0)){
        console.log('mm returning false');
        return false; 
      }
    }
    console.log('mods match!');
    return true;
  }

  function allModifiers(){
    for (i = 0; i < eventCombos.length; i++){
      var eventCombo = eventCombos[i];
      for (j = 0; j < eventCombo.keyCodes.length; j++){
        if ($.inArray(eventCombo.keyCodes[j], modKeyCodes) < 0){ console.log('not all mods!'); return false; }
      }
    }
    console.log('am returning true!');
    return true;  
  }

  // if 'key' is passed in, it will be used as a key to match objects' uniqueness
  function set_insert(array, value, key){
    var alreadyPresent = false;

    if (key === undefined){
      if ($.inArray(value, array) >= 0){ alreadyPresent = true; }
    }
    else if ($.grep(array,
                    function(obj){ return obj[key] == value[key]; }).length){
      alreadyPresent = true;
    }

    if (!alreadyPresent){ array.push(value); }
  }

  function eval_key_event(e){
    var eventCombo = {keyCodes: []};
    // e.stopPropagation();
    // e.preventDefault();
    e = e.originalEvent || e;   // TODO: test without this
    if (e.type == 'keydown'){ eventCombo = pressed; }
    else { eventCombo = released; }

    if (getKeyChar(e.keyCode) != undefined){
      set_insert(eventCombo.keyCodes, e.keyCode);
    }
    if (e.metaKey){ eventCombo.metaKey = true; }
    if (e.ctrlKey){ eventCombo.ctrlKey = true; }
    if (e.altKey){ eventCombo.altKey = true; }
    if (e.shiftKey){ eventCombo.shiftKey = true; }
    console.log('pressed', pressed);
    console.log('released', released);
  }

  function ComboPart(keyCode){
    this.keyCode = keyCode;
    this.keyChar = getKeyChar(keyCode);
  }

  function buildComboData(){
    var comboData = {
      comboParts: [],
      ctrlKey: pressed.ctrlKey || released.ctrlKey,
      altKey: pressed.altKey || released.altKey,
      metaKey: pressed.metaKey || released.metaKey,
      shiftKey: pressed.shiftKey || released.shiftKey  
    };

    var allKeyCodes = pressed.keyCodes.concat(released.keyCodes);
    console.log('allKeyCodes', allKeyCodes);
    $.each(allKeyCodes, function(i, keyCode){
      if (getKeyChar(keyCode) != undefined){
        set_insert(comboData.comboParts, new ComboPart(keyCode), 'keyCode');
      }
    });
    comboData.comboString = $.map(comboData.comboParts, function(comboPart, i){
                              return comboPart.keyChar;
                            }).join(delimiter);
    
    return comboData;
  }

  function checkAndComplete($textbox, callback){
    if (!allModifiers() &&
      (released.keyCodes.length == pressed.keyCodes.length || modifiersMatch())){
      console.log('xpressed', pressed);
      console.log('xreleased', released);
      var keyComboData = buildComboData();
      console.log('textbox', $textbox);
      console.log(keyComboData.comboString);
      $textbox.blur();  // needed for FF mac accent key hack
      $textbox.val(keyComboData.comboString);
      $textbox.select();
      callback(keyComboData);
      pressed = new EventCombo();
      released = new EventCombo();
    }
    return false;
  }

  $.fn.makeKeyCombinator = function(callback){
    return this.each(function(){
      $(this).change(function(e){
        console.log('changed', e);
        console.log('changed val', $(this).val());
      });

      $(this).keypress(function(e) {
        console.log('keypress keycode', e.keyCode);
        console.log('keypress charCode', e.charCode);
        console.log(e);
        // e.stopPropagation();
        // e.preventDefault();
        // return false;
      });
      
      $(this).keydown(function(e){
        console.log('keydown keycode', e.keyCode);
        console.log('keydown originalEvent keycode', e.originalEvent.keyCode);
        console.log(e);
        if (this.value == "¨"){ console.log('double dot detected'); }
        console.log(this.value);
        console.log($(this));
        eval_key_event(e);
        if (e.keyCode == 18){
          var $textbox = $(this);
          var timer = setTimeout(function(){
            console.log('timer tick');
            if (undetected_key = accents[$textbox.val()]){
              clearTimeout(timer);
              console.log('timer found accent!');
              set_insert(pressed.keyCodes, undetected_key);
              set_insert(released.keyCodes, 18);
              checkAndComplete($textbox, callback);
              // $textbox.trigger(jQuery.Event('keyup', { which: 85 }));
            }
          }, 150);
          // TODO: Solve case where user presses next key long time after 'Alt'
          // probably need to make this recurring, and clear it from other events
        }
        return false;
      });
      
      $(this).keyup(function(e){
        console.log('keyup keycode', e.keyCode);
        console.log(e);
        eval_key_event(e);

        // if (released.length && released.matchesSet(pressed)){
        console.log('am', allModifiers());
        console.log('!am', !allModifiers());
        console.log('mm', modifiersMatch() && !allModifiers());
        checkAndComplete($(this), callback);
        return false;
      });

    });
  }

})(jQuery);
