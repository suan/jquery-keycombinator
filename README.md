jquery.keycombinator
====================
jquery.keycombinator is a do-it-all plugin to let your _users_ define keyboard shortcuts. Simply slap it onto an input box and it will detect any entered key combinations and provide detailed data in a callback function, with OS-specific key symbols. [**Try out the demo**][demo]!

Installation
------------
Download the plugin:

- [.zip format][zip]
- [.tar.gz format][tar]

and depending on your web framework, copy either the `jquery.keycombinator.js` or `jquery.keycombinator.min.js` file into your project.

Usage
-----
First, include the plugin in pages you want to use it. For example in plain HTML:

```html
<script src="path/to/jquery.keycombinator.min.js" type="text/javascript"></script>
```

### Setup
Attach jquery.keycombinator to your keycombo input boxes:

```js
$('#myKeyComboInput').makeKeyCombinator({
  defaultCombos: {
    mac: ['⌃', '⇧', 'F'],
    win: ['Ctrl', 'Shift', 'F'],
    unix: ['Ctrl', 'Shift', 'F']
  },
  onComplete: function(keyComboData){
    console.log(keyComboData);
  }
});
```

### Clearing
Clear a keycombinator box upon clicking a button. The configured `onComplete` callback will be called with an empty `keyComboData`:

```
$('#clearBtn').click(function(){
  $('#myKeyComboInput').clearKeyCombinator();
});
```

### Reset to Defaults
Reset a keycombinator to its default value upon clickng a button. The configured `onComplete` callback will be called with the `defaultCombo` specific to the current OS:

```
$('#resetBtn').click(function(){
  $('#myKeyComboInput').defaultKeyCombinator();
});
```

Options
-------
__onComplete__ _(required)_: Callback function triggered when a key combination has been detected, allowing you to make use of the key combination data - to save in localStorage for use on other pages, for example. It needs a single argument, which is the variable containing the keycombo data. Example:

```js
onComplete: function(keyComboData){ console.log(keyComboData); }
```

==================

__defaultCombos__: The keycombo to reset to when `defaultKeyCombinator()` is called. Should contain an array of OS-styled chars for each of the 3 keys `mac`, `win`, and `unix`. Required if you plan to call `defaultKeyCombinator()`. Example:

```js
defaultCombos: {
  mac: ['⌃', '⇧', 'F'],
  win: ['Ctrl', 'Shift', 'F'],
  unix: ['Ctrl', 'Shift', 'F']
}
```

Returned Data
-------------
Here's what's stored in the callback variable:

- `comboString` (string): A user-friendly string for the key combo that's tailored to the current OS
- `comboParts` (array): Array of all the parts of the key combo. Each element is an object with the following:
  - `keyChar` (char): the actual key character
  - `keyCode` (integer): the keyCode of the pressed key (not included in `defaultKeyCombinator()` callbacks)
- `ctrlKey` (boolean): Indicates whether the key combo includes a ctrl key
- `altKey` (boolean): Indicates whether the key combo includes an alt key
- `shiftKey` (boolean): Indicates whether the key combo includes an shift key

Browser Support
---------------
jquery.keycombinator has been tested on new versions of Chrome, Safari, Firefox, and IE. It's not guaranteed to work in other browsers.

Known Issues
------------
Apart from combinations already used by the OS and browser, these are key combinations that are known not to work (in any permutation):

- Mac
  - Firefox
      - ⌃⌥`
  - Chrome
      - ⌃⌥`
      - ⌃⌥←
      - ⌃⌥→

Credits
-------
Huge kudos to the [jwerty project][jwerty], which this is sort of a reverse of, and which introduced me to the wonderful world of Mac modifier key symbols.



[demo]: http://suan.github.com/jquery-keycombinator/ 
[zip]: https://github.com/suan/jquery-keycombinator/zipball/master
[tar]: https://github.com/suan/jquery-keycombinator/tarball/master
[jwerty]: http://keithcirkel.co.uk/jwerty/
