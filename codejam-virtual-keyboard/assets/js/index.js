const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend', `<textarea id="text" name="text" class="textarea" rows="10"></textarea>`);
body.insertAdjacentHTML('beforeend', `<div class="keyboard"></div>
<p class="keyboard--guide">Change the language: <span class="keyboard--samples">Shift</span> + <span class="keyboard--samples">Alt</span></p>`);

const keyboardArea = body.querySelector('.keyboard');
const area = body.querySelector('.textarea');
let languageForKeys = localStorage.getItem('languageForKeys') || 0;
let capsMode = 0;
let keys = {};

//initialization:

(() => {
  let rows = {};
  for (let i = 1; i <= 5; i++) {
    let row = i;
    keyboardArea.insertAdjacentHTML('beforeend', `<div class="row row${row}"></div>`);
    rows[`row${row}`] = keyboardArea.querySelector(`.row${row}`);
  };
  for (let i = 1; i <= 5; i++) {
    let row = i;
    for (let j = 0, l = keyboard[`string${row}`].keyCode.length; j < l; j++) {
      let k = keyboard[`string${row}`].symbol[j];
      let key = (typeof k === "string")?k:k[languageForKeys];
      rows[`row${row}`].insertAdjacentHTML('beforeend', `<div class="button">${key}</div>`);
    };
  };
  for (let i = 1; i <= 5; i++) {
    let row = rows[`row${i}`];
    for (let j = 0, l = keyboard[`string${i}`].keyCode.length; j < l; j++) {

      let key = row.querySelector(`.button:nth-child(${j+1})`);
      let keyName = keyboard[`string${i}`].keyCode[j];
      key.classList.add(`${keyName}`);
      keys[`${keyName}`] = {
        button : key, 
        symbol : keyboard[`string${i}`].symbol[j],
      };
    };
  };
})();

//functions:

const reDraw = (lang, caps, keys) => {
  for (key in keys) {
    let keyArr = keys[key]['symbol'];
    if (Array.isArray(keyArr)) {
      let elem = keys[key]['button'];
      elem.textContent = keyArr[+lang + +caps];
    };
  };
};

const switchLang = (e) => {
  if (e) {
    languageForKeys = (languageForKeys===0) ? 2 : 0;
    localStorage.setItem('languageForKeys', languageForKeys);
    reDraw(languageForKeys,capsMode,keys);
  };
};



const shiftSwitch = (keyCode) => {
  const shiftSwitcher = () => {
    capsMode = (capsMode===0) ? 1 : 0;
    reDraw(languageForKeys,capsMode,keys);
    if (capsMode===0) {
      keys['ShiftLeft']['button'].classList.remove('uppercase');
      keys['ShiftRight']['button'].classList.remove('uppercase');
    } else {
      keys['ShiftLeft']['button'].classList.add('uppercase');
      keys['ShiftRight']['button'].classList.add('uppercase');
    };
  };

  switch(keyCode) {
    case 'ShiftLeft': shiftSwitcher();
      break;
    case 'ShiftRight': shiftSwitcher();
      break;
    default: break;
  }
}

const keyActioned = (keyCode) => {
  switch(keyCode) {
    case 'Backspace': area.value = area.value.slice(0,-1);
      break;
    case 'Delete': area.value = area.value.slice(1);
      break;
    case 'Space': area.value +=" ";
      break;
    case 'Enter': area.value +="\n";
      break;
    case 'Tab': area.value +="\t";
      break;
    case 'CapsLock':
      if (keys["CapsLock"].button.classList.contains('button--active')) {
        keys["CapsLock"].button.classList.remove('button--active');
        keys['ShiftLeft']['button'].classList.remove('uppercase');
        keys['ShiftRight']['button'].classList.remove('uppercase');
        capsMode = 0;
        reDraw(languageForKeys,capsMode,keys);
      } else {
        keys["CapsLock"].button.classList.add('button--active');
        keys['ShiftLeft']['button'].classList.add('uppercase');
        keys['ShiftRight']['button'].classList.add('uppercase');
        capsMode = 1;
        reDraw(languageForKeys,capsMode,keys);
      };
      break;
    case 'AltLeft': switchLang(event.shiftKey);
      break;
    case 'AltRight': switchLang(event.shiftKey);
      break;
    case 'ShiftLeft': switchLang(event.altKey);
      break;
    case 'ShiftRight': switchLang(event.altKey);
      break;
    default: if (!keys[keyCode]) {break;}
      let arr = keys[keyCode]['symbol'];
      if (Array.isArray(arr)) {
        let res = arr[+languageForKeys + +capsMode];
        area.value += res;
      };
      if (arr === "⇦") area.value += "←";
      if (arr === "⇨") area.value += "→";
      if (arr === "⇧") area.value += "↑";
      if (arr === "⇩") area.value += "↓";
      break;
  };
}

//listeners:

let pressed = {};

keyboardArea.addEventListener('click', (event) => {
  if (event.target.classList[0]==='button') {
    let keyCode = event.target.classList[1];
    keyActioned(keyCode);
  };
});

document.addEventListener('keydown', (event) => {
  console.log(event.code);
  if (event.code+'' !== 'F5'&& event.code+'' !== 'F12') {
    event.preventDefault();
  }
  let keyCode = event.code;
  if (!keys[keyCode]) return;

  if (keyCode !== 'Backspace' && keyCode !== 'Delete') {
    if (pressed[keyCode]) return;
  }
  pressed[keyCode] = true;
  for (o in pressed) {
    let elem = keys[o]['button'];
    elem.classList.add('button--pressed');
  }
  shiftSwitch(keyCode);
  keyActioned(keyCode);
  
});

document.addEventListener('keyup', (event) => {
  let keyCode = event.code;
  for (o in pressed) {
    let elem = keys[o]['button'];
    elem.classList.remove('button--pressed');
  }
  delete pressed[keyCode];
  shiftSwitch(keyCode);
});

keyboardArea.addEventListener('mousedown', (event) => {
  if (event.target.classList[0]==='button') {
    let keyCode = event.target.classList[1];
    pressed[keyCode] = true;
    shiftSwitch(keyCode);
  }
});

keyboardArea.addEventListener('mouseup', (event) => {
  if (event.target.classList[0]==='button') {
    let keyCode = event.target.classList[1];
    delete pressed[keyCode];
    shiftSwitch(keyCode);
  }
});


