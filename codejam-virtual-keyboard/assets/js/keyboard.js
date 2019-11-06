const keyboard = { // eslint-disable-line no-unused-vars
  string1: {
    symbol: [
      ['ё', 'Ё', '`', '~'], ['1', '!', '1', '!'], ['2', '"', '2', '@'],
      ['3', '№', '3', '#'], ['4', ';', '4', '$'], ['5', '%', '5', '%'], ['6', ':', '6', '^'],
      ['7', '?', '7', '&'], ['8', '*', '8', '*'], ['9', '(', '9', '('], ['0', ')', '0', ')'],
      ['-', '_', '-', '_'], ['=', '+', '=', '+'], 'backspace'],
    keyCode: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
      'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  },
  string2: {
    symbol: [
      'Tab', ['й', 'Й', 'q', 'Q'], ['ц', 'Ц', 'w', 'W'], ['у', 'У', 'e', 'E'], ['к', 'К', 'r', 'R'],
      ['е', 'Е', 't', 'T'], ['н', 'Н', 'y', 'Y'], ['г', 'Г', 'u', 'U'], ['ш', 'Ш', 'i', 'I'],
      ['щ', 'Щ', 'o', 'O'], ['з', 'З', 'p', 'P'], ['х', 'Х', '[', '{'], ['ъ', 'Ъ', ']', '}'],
      ['\\', '/', '\\', '|'], 'DEL'],
    keyCode: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO',
      'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  },
  string3: {
    symbol: [
      'Caps Lock', ['ф', 'Ф', 'a', 'A'], ['ы', 'Ы', 's', 'S'], ['в', 'В', 'd', 'D'],
      ['а', 'А', 'f', 'F'], ['п', 'П', 'g', 'G'], ['р', 'Р', 'h', 'H'], ['о', 'О', 'j', 'J'],
      ['л', 'Л', 'k', 'K'], ['д', 'Д', 'l', 'L'], ['ж', 'Ж', ';', ':'], ['э', 'Э', '\'', '"'],
      'Enter'],
    keyCode: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK',
      'KeyL', 'Semicolon', 'Quote', 'Enter'],
  },
  string4: {
    symbol: [
      'Shift', ['я', 'Я', 'z', 'Z'], ['ч', 'Ч', 'x', 'X'], ['с', 'С', 'c', 'C'],
      ['м', 'М', 'v', 'V'], ['и', 'И', 'b', 'B'], ['т', 'Т', 'n', 'N'], ['ь', 'Ь', 'm', 'M'],
      ['б', 'Б', ',', '<'], ['ю', 'Ю', '.', '>'], ['.', ',', '/', '?'], '⇧', 'Shift'],
    keyCode: ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma',
      'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  },
  string5: {
    symbol: ['Ctrl', 'Win', 'Alt', '', 'Alt', '⇦', '⇩', '⇨', 'Ctrl'],
    keyCode: ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft',
      'ArrowDown', 'ArrowRight', 'ControlRight'],
  },
};
