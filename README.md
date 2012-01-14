stored in the variable:
- comboString (string): A user-friendly string for the key combo that's tailored to the current OS
- comboParts (array): Array of all the parts of the key combo. Each element is an object with the following:
  - keyChar (char): the actual key character
  - keyCode (integer): the keyCode of the pressed key
- ctrlKey (boolean): Indicates whether the key combo includes a ctrl key
- altKey (boolean): Indicates whether the key combo includes an alt key
