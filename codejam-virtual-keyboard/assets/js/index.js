let body = document.querySelector('body');
body.insertAdjacentHTML('beforeend', `<textarea id="text" name="text" class="textarea" rows="10"></textarea>`);
body.insertAdjacentHTML('beforeend', `<div class="keyboard"></div>`);
let keyboardArea = document.querySelector('.keyboard');
let languageForKeys = localStorage.getItem('languageForKeys') ? localStorage.getItem('languageForKeys') : 0;
let capsMode = 0;
let area = document.querySelector('.textarea');

let keyboard = {
  string1 : {
    'symbol' : [['ё', 'Ё', '\`', '\~'], ['1', '\!', '1', '\!'], ['2', '\"', '2', '\@'], ['3', '\№', '3', '\#'], ['4', '\;', '4', '\$'], ['5', '\%', '5', '\%'], ['6', '\:', '6', '\^'], ['7', '\?', '7', '\&'], ['8', '\*', '8', '\*'], ['9', '\(', '9', '\('], ['0', '\)', '0', '\)'], ['\-', '\_', '\-', '\_'], ['\=', '\+', '\=', '\+'], 'backspace'],
    'keyCode' : ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
  },
  string2 : {
    'symbol' : ['Tab', ['й', 'Й', 'q', 'Q'], ['ц', 'Ц', 'w', 'W'], ['у', 'У', 'e', 'E'], ['к', 'К', 'r', 'R'], ['е', 'Е', 't', 'T'], ['н', 'Н', 'y', 'Y'], ['г', 'Г', 'u', 'U'], ['ш', 'Ш', 'i', 'I'], ['щ', 'Щ', 'o', 'O'], ['з', 'З', 'p', 'P'], ['х', 'Х', '\[', '\{'], ['ъ', 'Ъ', '\]', '\}'], ['\\', '\/', '\\', '\|'], 'DEL'],
    'keyCode' : ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
  },
  string3 : {
    'symbol' : ['Caps Lock', ['ф', 'Ф', 'a', 'A'], ['ы', 'Ы', 's', 'S'], ['в', 'В', 'd', 'D'], ['а', 'А', 'f', 'F'], ['п', 'П', 'g', 'G'], ['р', 'Р', 'h', 'H'], ['о', 'О', 'j', 'J'], ['л', 'Л', 'k', 'K'], ['д', 'Д', 'l', 'L'], ['ж', 'Ж', '\;', '\:'], ['э', 'Э', '\'', '\"'], 'Enter'],
    'keyCode' : ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
  },
  string4 : {
    'symbol' : ['Shift', ['я', 'Я', 'z', 'Z'], ['ч', 'Ч', 'x', 'X'], ['с', 'С', 'c', 'C'], ['м', 'М', 'v', 'V'], ['и', 'И', 'b', 'B'], ['т', 'Т', 'n', 'N'], ['ь', 'Ь', 'm', 'M'], ['б', 'Б', '\,', '\<'], ['ю', 'Ю', '\.', '\>'], ['\.', '\,', '\/', '\?'], '⇧', 'Shift'],
    'keyCode' : ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
  },
  string5 : {
    'symbol' : ['Ctrl', 'Win', 'Alt', '', 'Alt', '⇦', '⇩', '⇨', 'Ctrl'],
    'keyCode' : ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"],
  }
}

let rows = {};
for (let i = 1; i <= 5; i++) {
  let row = i;
  keyboardArea.insertAdjacentHTML('beforeend', `<div class="row row${row}"></div>`);
  rows[`row${row}`] = keyboardArea.querySelector(`.row${row}`);
}


for (let i = 1; i <= 5; i++) {
  let row = i;
  for (let j = 0, l = keyboard[`string${row}`].keyCode.length; j < l; j++) {
  	let k = keyboard[`string${row}`].symbol[j];
  	let key = (typeof k === "string")?k:k[languageForKeys];
  	rows[`row${row}`].insertAdjacentHTML('beforeend', `<div class="button">${key}</div>`);
	}
}

let keys = {};

for (let i = 1; i <= 5; i++) {
  let row = rows[`row${i}`];
  for (let j = 0, l = keyboard[`string${i}`].keyCode.length; j < l; j++) {
    let key = row.querySelector(`.button:nth-child(${j+1})`);
    let keyName = keyboard[`string${i}`].keyCode[j];
    keys[`${keyName}`] = {
      button : key, 
      symbol : keyboard[`string${i}`].symbol[j],
    };

  }
}
console.log(keys);

//localStorage.setItem('languageForKeys', 2);

const reDraw = (lang, caps, keys) => {
  for (key in keys) {
    let keyArr = keys[key]['symbol'];
    if (Array.isArray(keyArr)) {
      let elem = keys[key]['button'];
      elem.textContent = keyArr[+lang + +caps];
    }
  }
}

for (let key in keys) {
  keys[key]['button'].addEventListener('click', (event) => {
    let keyCode = key+''; 
    switch(keyCode) {
      case 'Backspace': area.value = area.value.slice(0,-1);
        break;
      case 'Delete': area.value = area.value.slice(1);
        break;
      case 'Space': area.value +=" ";
        break;
      case 'Enter': area.value +="\n";
        break;
      case 'Tab': area.value +="    ";
        break;
      case 'CapsLock':
        if (keys["CapsLock"].button.classList.contains('button--active')) {
          keys["CapsLock"].button.classList.remove('button--active');
          capsMode = 0;
          reDraw(languageForKeys,capsMode,keys);
        } else {
          keys["CapsLock"].button.classList.add('button--active');
          capsMode = 1;
          reDraw(languageForKeys,capsMode,keys);
        }
        break;
      default: let arr = keys[key]['symbol'];
        if (Array.isArray(arr)) {
          let res = arr[+languageForKeys + +capsMode];
          area.value += res;
        }
        break;
    }
  });
}
