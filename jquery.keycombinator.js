// The plugin logic hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.
;(function($, window, document, undefined){

  // our plugin constructor
  var KeyCombinator = function( elem, options ){
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
    };




// ====================== globals ===========================
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
    if (key = keys[keyCode]){
      if (key.all != undefined){return key.all;}
      else{ return key[platform]; }
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

  function isModifier(keyCode){
    return ($.inArray(keyCode, modKeyCodes) >= 0)
  }

  function ComboPart(keyCode){
    if (keyCode !== undefined){
      this.keyCode = keyCode;
      this.keyChar = getKeyChar(keyCode);
    }
  }
  function ComboData(){
    this.comboParts= [];
    this.ctrlKey = false;
    this.altKey = false;
    this.metaKey = false;
    this.shiftKey = false;
    this.comboString = '';
  }
    
  var loopingTimer = {
    run: function(task, interval, duration){
      if (!loopingTimer.startTime){
        loopingTimer.startTime = (new Date().getTime());
        loopingTimer.running = setInterval(function(){
          loopingTimer.run(task, interval, duration);
        }, interval);
      }
      else if (((new Date()).getTime() - loopingTimer.startTime) < duration){
        task();
      }
      else {
        loopingTimer.stop();
      }
    },
    running: null,
    stop: function(){
      clearInterval(loopingTimer.running);
      loopingTimer.startTime = null;
    },
    startTime: null
  }

// ============ /"globals" ============================================




  KeyCombinator.prototype = {
    defaults: {
    },

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

    function eval_key_event(e, $textbox, callback){
      // e.stopPropagation();
      // e.preventDefault();

      loopingTimer.stop();
      var startComboLength = comboData.comboString.length;
      if (getKeyChar(e.keyCode) != undefined){
        set_insert(comboData.comboParts, new ComboPart(e.keyCode), 'keyCode');
      }
      if (e.metaKey){ comboData.metaKey = true; }
      if (e.ctrlKey){ comboData.ctrlKey = true; }
      if (e.altKey){ comboData.altKey = true; }
      if (e.shiftKey){ comboData.shiftKey = true; }
      comboData.comboString = $.map(comboData.comboParts, function(comboPart, i){
                                return comboPart.keyChar;
                              }).join(delimiter);
      if (comboData.comboString.length > startComboLength){
        $textbox.blur();  // needed for FF mac accent key hack
        $textbox.val(comboData.comboString);
        $textbox.focus();
        if (!isModifier(e.keyCode)){
          $textbox.select();
          completed = true;
          keyups = 0;
          keydowns = 0;
          loopingTimer.stop();
          if(callback){ callback(comboData); }
          comboData = new ComboData();
        }
      }
      else if (keyups == keydowns){ reset($textbox); }
    }

    function reset($textbox){
      $textbox.val('');
      completed = false;
      comboData = new ComboData();
      loopingTimer.stop();
      keydowns = 0;
      keyups = 0;    
    }

    var comboData = new ComboData();
    var completed = false;
    var keydowns = 0;
    var keyups = 0;
    var defaultCombo;
    var onComplete;

    init: function(){
      return this.each(function(){
        defaultCombo = options.defaultCombos;
        onComplete = options.onComplete;

        $(this).keydown(function(e){
          completed = false;
          keydowns += 1;
          var $textbox = $(this);
          eval_key_event(e, $textbox, onComplete);
          if (e.keyCode == 18 && comboData.comboString == getKeyChar(18)){
            var $textbox = $(this);
            loopingTimer.run(function(){
              var contents = $textbox.val();
              if (undetected_key = accents[contents[contents.length - 1]]){
                loopingTimer.stop();
                eval_key_event(new $.Event('keydown', {keyCode: undetected_key}),
                                $textbox,
                                onComplete);
              }
            }, 10, 10000);
          }
          return false;
        });
        
        $(this).keyup(function(e){
          if (!completed){
            keyups += 1;
            eval_key_event(e, $(this), onComplete);
          }
          return false;
        });

        $(this).click(function(e){ $(this).select(); });
      });
    }

    $.fn.clearKeyCombinator = function(){
      return this.each(function(){ reset($(this)) }); 
    }

    $.fn.defaultKeyCombinator = function(){
      return this.each(function(){
        reset($(this));
        for (keyChar in defaultCombo[platform]){
          comboPart = new ComboPart();
          comboPart.keyChar = keyChar;
          set_insert(comboData.comboParts, comboPart, 'keyChar');
        }
        comboData.comboString = defaultCombo[platform].join(delimiter);
        $(this).val(defaultCombo[platform].join(delimiter));
        if(onComplete){ onComplete(comboData); }
        comboData = new ComboData();
      }); 
    }
  }
  // ================= /KeyCombinator.prototype ==================



  KeyCombinator.defaults = KeyCombinator.prototype.defaults;

  $.fn.makeKeyCombinator = function(options) {
    return this.each(function() {
      new KeyCombinator(this, options).init();
    });
  };

})(jQuery, window, document);
