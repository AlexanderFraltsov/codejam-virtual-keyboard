const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend', '<textarea id="text" name="text" class="textarea" rows="10"></textarea>');
body.insertAdjacentHTML('beforeend', '<div class="keyboard"></div><p class="keyboard--guide">Change the language: <span class="keyboard--samples">Shift</span> + <span class="keyboard--samples">Alt</span> , or CLICK HERE</p>');

const keyboardArea = body.querySelector('.keyboard');
const area = body.querySelector('.textarea');
let languageForKeys = localStorage.getItem('languageForKeys') || 0;
let capsMode = 0;
const keys = {};

// initialization:

(() => {
  const rows = {};
  for (let row = 1; row <= 5; row += 1) {
    keyboardArea.insertAdjacentHTML('beforeend', `<div class="row row${row}"></div>`);
    rows[`row${row}`] = keyboardArea.querySelector(`.row${row}`);
    for (let j = 0, l = keyboard[`string${row}`].keyCode.length; j < l; j += 1) {
      const keyContainer = keyboard[`string${row}`].symbol[j];
      const key = (typeof keyContainer === 'string') ? keyContainer : keyContainer[languageForKeys];
      rows[`row${row}`].insertAdjacentHTML('beforeend', `<div class="button">${key}</div>`);
    }
  }
  for (let i = 1; i <= 5; i += 1) {
    const row = rows[`row${i}`];
    for (let j = 0, l = keyboard[`string${i}`].keyCode.length; j < l; j += 1) {
      const key = row.querySelector(`.button:nth-child(${j + 1})`);
      const keyName = keyboard[`string${i}`].keyCode[j];
      key.classList.add(`${keyName}`);
      keys[`${keyName}`] = {
        button: key,
        symbol: keyboard[`string${i}`].symbol[j],
      };
    }
  }
})();

// functions:

const reDraw = (lang, caps, keys) => {
  for (const key in keys) {
    const keyArr = keys[key].symbol;
    if (Array.isArray(keyArr)) {
      const elem = keys[key].button;
      elem.textContent = keyArr[+lang + +caps];
    }
  }
};

const switchLang = (e) => {
  if (e) {
    languageForKeys = (languageForKeys === 0) ? 2 : 0;
    localStorage.setItem('languageForKeys', languageForKeys);
    reDraw(languageForKeys, capsMode, keys);
  }
};

const shiftSwitch = (keyCode) => {
  const shiftSwitcher = () => {
    capsMode = (capsMode === 0) ? 1 : 0;
    reDraw(languageForKeys, capsMode, keys);
    if (capsMode === 0) {
      keys.ShiftLeft.button.classList.remove('uppercase');
      keys.ShiftRight.button.classList.remove('uppercase');
    } else {
      keys.ShiftLeft.button.classList.add('uppercase');
      keys.ShiftRight.button.classList.add('uppercase');
    }
  };
  switch (keyCode) {
    case 'ShiftLeft': shiftSwitcher();
      break;
    case 'ShiftRight': shiftSwitcher();
      break;
    default: break;
  }
};

const keyActioned = (keyCode) => {
  switch (keyCode) {
    case 'Backspace': {
      area.value = area.value.slice(0, -1);
      break;
    }
    case 'Delete': {
      area.value = area.value.slice(1);
      break;
    }
    case 'Space': {
      area.value += ' ';
      break;
    }
    case 'Enter': {
      area.value += '\n';
      break;
    }
    case 'Tab': {
      area.value += '\t';
      break;
    }
    case 'CapsLock': {
      if (capsMode === 1) {
        keys.CapsLock.button.classList.remove('button--active');
        keys.ShiftLeft.button.classList.remove('uppercase');
        keys.ShiftRight.button.classList.remove('uppercase');
        capsMode = 0;
        reDraw(languageForKeys, capsMode, keys);
      } else {
        keys.CapsLock.button.classList.add('button--active');
        keys.ShiftLeft.button.classList.add('uppercase');
        keys.ShiftRight.button.classList.add('uppercase');
        capsMode = 1;
        reDraw(languageForKeys, capsMode, keys);
      }
      break;
    }
    case 'AltLeft': {
      switchLang(event.shiftKey);
      break;
    }
    case 'AltRight': {
      switchLang(event.shiftKey);
      break;
    }
    case 'ShiftLeft': {
      switchLang(event.altKey);
      break;
    }
    case 'ShiftRight': {
      switchLang(event.altKey);
      break;
    }
    default: {
      if (!keys[keyCode]) break;
      const arr = keys[keyCode].symbol;
      if (Array.isArray(arr)) {
        const res = arr[+languageForKeys + +capsMode];
        area.value += res;
      }
      if (arr === '⇦') area.value += '←';
      if (arr === '⇨') area.value += '→';
      if (arr === '⇧') area.value += '↑';
      if (arr === '⇩') area.value += '↓';
      break;
    }
  }
};

// listeners:

const pressed = {};

keyboardArea.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'button') {
    const keyCode = event.target.classList[1];
    keyActioned(keyCode);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code !== 'F5' && event.code !== 'F12') {
    event.preventDefault();
  }
  const keyCode = event.code;
  if (!keys[keyCode]) return;
  if (keyCode !== 'Backspace' && keyCode !== 'Delete') {
    if (pressed[keyCode]) return;
  }
  pressed[keyCode] = true;
  for (const o in pressed) {
    const elem = keys[o].button;
    elem.classList.add('button--pressed');
  }
  shiftSwitch(keyCode);
  keyActioned(keyCode);
});

document.addEventListener('keyup', (event) => {
  const keyCode = event.code;
  for (const o in pressed) {
    const elem = keys[o].button;
    elem.classList.remove('button--pressed');
  }
  delete pressed[keyCode];
  shiftSwitch(keyCode);
});

keyboardArea.addEventListener('mousedown', (event) => {
  if (event.target.classList[0] === 'button') {
    const keyCode = event.target.classList[1];
    pressed[keyCode] = true;
    shiftSwitch(keyCode);
  }
});

keyboardArea.addEventListener('mouseup', (event) => {
  if (event.target.classList[0] === 'button') {
    const keyCode = event.target.classList[1];
    delete pressed[keyCode];
    shiftSwitch(keyCode);
  }
});

body.querySelector('.keyboard--guide').addEventListener('click', (event) => {
  switchLang(event);
});
