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

### Basic
Attach jquery.keycombinator to your keycombo input boxes:

```js
$('#myKeyComboInput').makeKeyCombinator({
  defaultCombos: {
    mac: ['⌃', 'F'],
    win: ['Ctrl', 'F'],
    unix: ['Ctrl', 'F']
  },
  onComplete: function(keyComboData){
    console.log(keyComboData);
  }
});
```

### Clearing
Clear a keycombinator box upon clicking a button. :

### Reset to Defaults
Reset a keycombinator to its default value 

Options
-------

Returned Data
-------------
stored in the variable:

- comboString (string): A user-friendly string for the key combo that's tailored to the current OS
- comboParts (array): Array of all the parts of the key combo. Each element is an object with the following:
  - keyChar (char): the actual key character
  - keyCode (integer): the keyCode of the pressed key (not included in `defaultKeyCombinator()` callbacks)
- ctrlKey (boolean): Indicates whether the key combo includes a ctrl key
- altKey (boolean): Indicates whether the key combo includes an alt key

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
