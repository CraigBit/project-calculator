// Получение кнопок
const displayScreen = document.querySelector('.screen p');
const backSpace = document.querySelector('.backspace');
const clearAll = document.querySelector('.ac');
const clearDisplay = document.querySelector('.c');
const convertNumber = document.querySelector('.math_abs');
const calculationButtons = document.querySelector('.buttons');
const dotButton = document.querySelector('.dot');
const memoryClear = document.querySelector('.memory_clear');
const memorySave = document.querySelector('.memory_save');
const memoryRead = document.querySelector('.memory_read');
const memoryPlus = document.querySelector('.memory_plus');
const memoryMinus = document.querySelector('.memory_minus');
const rvtButton = document.querySelector('.rvt');
const zeroButton = document.querySelector('.zero');

// переменная для контроля кнопок MR MS MC M+ M-
let memoryValue = '';

// переменная-блокиратор для дробных значений
let dotReset = true;

// переменная, которая будет доставать текст из таргета события
let key;

// переменная, принимающая результат вычисления и выводящая его на экран по нажатию кнопки "="
let calcResult = '';

// переменная, которая будет возвращать предыдущее выражение (кнопка Rvt)
let rvtValue = '';

digits = new RegExp('[0-9]');

//-----------------------------------------------------------------------------------------------------------------------------------

//Кнопка Rvt
rvtButton.onclick = function () {
  if (rvtValue !== '') {
    displayScreen.textContent = rvtValue;
  }
};

//Кнопка MC
memoryClear.onclick = function () {
  if (memoryValue === '') return;
  memoryValue = '';
  console.log(memoryValue);
};

//Кнопка MS
memorySave.onclick = function () {
  if (
    !Number.isNaN(Number(displayScreen.textContent)) &&
    displayScreen.textContent !== ''
  ) {
    memoryValue = Number(displayScreen.textContent);
    console.log(memoryValue);
  }
};

//Кнопка MR
memoryRead.onclick = function () {
  if (memoryValue === '') return;
  displayScreen.textContent = memoryValue;
};

//Кнопка M+
memoryPlus.onclick = function () {
  if (
    !Number.isNaN(Number(displayScreen.textContent)) &&
    displayScreen.textContent !== ''
  ) {
    memoryValue = Number(memoryValue);
    memoryValue += Number(displayScreen.textContent);
    console.log(memoryValue);
  }
};

//Кнопка M-
memoryMinus.onclick = function () {
  if (
    !Number.isNaN(Number(displayScreen.textContent)) &&
    displayScreen.textContent !== ''
  ) {
    memoryValue = Number(memoryValue);
    memoryValue -= Number(displayScreen.textContent);
    console.log(memoryValue);
  }
};

//Кнопка 0
zeroButton.onclick = function (event) {
  key = event.target.textContent;
  if (displayScreen.textContent.length > 29) {
    key = '';
  }
  if (
    displayScreen.textContent === '' ||
    displayScreen.textContent === '0' ||
    displayScreen.textContent === 'Infinity'
  ) {
    displayScreen.textContent = key;
  } else {
    displayScreen.textContent += key;
  }
  if (displayScreen.textContent.match(/[^0-9\.]0\d+/)) {
    displayScreen.textContent = displayScreen.textContent.substring(
      0,
      displayScreen.textContent.length - 1
    );
  }

  if (displayScreen.textContent.length >= 20) {
    displayScreen.style.fontSize = '20px';
  } else if (displayScreen.textContent.length < 20) {
    displayScreen.style.fontSize = '28px';
  }
};

//Кнопка .
dotButton.onclick = function (event) {
  key = event.target.textContent;
  if (displayScreen.textContent.length > 29) {
    key = '';
  }
  if (
    displayScreen.textContent[displayScreen.textContent.length - 1] == '+' ||
    displayScreen.textContent[displayScreen.textContent.length - 1] == '-' ||
    displayScreen.textContent[displayScreen.textContent.length - 1] == '*' ||
    displayScreen.textContent[displayScreen.textContent.length - 1] == '/' ||
    displayScreen.textContent[displayScreen.textContent.length - 1] == '('
  ) {
    displayScreen.textContent += '0' + key;
    dotReset = false;
  } else if (
    displayScreen.textContent === '' ||
    displayScreen.textContent === 'Infinity'
  ) {
    displayScreen.textContent = '0' + key;
    dotReset = false;
  } else if (dotReset && displayScreen.textContent !== '') {
    displayScreen.textContent += key;
    dotReset = false;
  } else if (
    displayScreen.textContent[displayScreen.textContent.length - 1] == '0' &&
    !displayScreen.textContent.match(/\.\d+$/)
  ) {
    displayScreen.textContent += key;
    dotReset = false;
  }

  if (displayScreen.textContent.length >= 20) {
    displayScreen.style.fontSize = '20px';
  } else if (displayScreen.textContent.length < 20) {
    displayScreen.style.fontSize = '28px';
  }
};

//Кнопка <-
backSpace.onclick = function (event) {
  key = event.target.textContent;
  if (displayScreen.textContent === '') return;
  if (
    key === '<-' &&
    displayScreen.textContent[displayScreen.textContent.length - 1] === '.'
  ) {
    dotReset = true;
  } else if (key === '<-' && !displayScreen.textContent.includes('.')) {
    dotReset = true;
  } else {
    dotReset = false;
  }

  displayScreen.textContent = displayScreen.textContent.substring(
    0,
    displayScreen.textContent.length - 1
  );

  if (displayScreen.textContent.length >= 20) {
    displayScreen.style.fontSize = '20px';
  } else if (displayScreen.textContent.length < 20) {
    displayScreen.style.fontSize = '28px';
  }
};

//Кнопка AC
clearAll.onclick = function () {
  displayScreen.textContent = '';
  memoryValue = '';
  calcResult = '';
  dotReset = true;
  rvtValue = '';
};

//Кнопка C
clearDisplay.onclick = function () {
  displayScreen.textContent = '';
  dotReset = true;
};

//Кнопка +/-
convertNumber.onclick = function () {
  let num = Number(displayScreen.textContent);
  if (num < 0) {
    displayScreen.textContent = Math.abs(num);
  } else if (num > 0) {
    displayScreen.textContent = -num;
  }
};

//Остальные кнопки (цифры, операторы)
calculationButtons.onclick = function (event) {
  key = event.target.textContent;

  if (!event.target.classList.contains('btn')) return;
  if (
    event.target.classList.contains('ac') ||
    event.target.classList.contains('math_abs') ||
    event.target.classList.contains('backspace') ||
    event.target.classList.contains('memory') ||
    event.target.classList.contains('dot') ||
    event.target.classList.contains('c') ||
    event.target.classList.contains('rvt') ||
    event.target.classList.contains('zero')
  )
    return;

  if (key === '+' || key === '-' || key === '/' || key === '*') {
    dotReset = true;
  }

  // Действия при нажатии кнопки "="
  if (event.target.classList.contains('equal')) {
    rvtValue = displayScreen.textContent;
    calcResult = eval(displayScreen.textContent);

    // Вывод Infinity при делении на ноль. Если результат вычисления будет занимать более 12 знаков после запятой, то выведет 999999999999 или -99999999999
    if (displayScreen.textContent.match(/\/0$/)) {
      displayScreen.textContent = 'Infinity';
    } else if (calcResult > 999999999999) {
      calcResult = 999999999999;
      displayScreen.textContent = calcResult;
    } else if (calcResult < -99999999999) {
      calcResult = -99999999999;
      displayScreen.textContent = calcResult;
    }
    // Максимальное количество знаков после запятой равен 8
    displayScreen.textContent = +calcResult.toFixed(8);
    dotReset = false;
    if (!displayScreen.textContent.includes('.')) {
      dotReset = true;
    }
  }

  // Действия при нажатии цифр и операторов "+", "-", "*", "/"
  if (!event.target.classList.contains('equal')) {
    if (displayScreen.textContent.length > 29) {
      key = '';
    } else if (
      displayScreen.textContent === 'Infinity' ||
      displayScreen.textContent === '-Infinity'
    ) {
      displayScreen.textContent = key;
    } else if (displayScreen.textContent !== '0') {
      displayScreen.textContent += key;
    } else if (
      displayScreen.textContent === '0' &&
      !event.target.classList.contains('operator')
    ) {
      displayScreen.textContent = key;
    } else if (
      displayScreen.textContent === '0' &&
      event.target.classList.contains('operator')
    ) {
      displayScreen.textContent += key;
    }
    if (displayScreen.textContent.match(/[^0-9()]{2}$/)) {
      displayScreen.textContent = displayScreen.textContent.substring(
        0,
        displayScreen.textContent.length - 1
      );
    }

    if (displayScreen.textContent.match(/[^0-9\.]0\d+/)) {
      displayScreen.textContent = displayScreen.textContent.substring(
        0,
        displayScreen.textContent.length - 1
      );
    }
  }

  if (displayScreen.textContent.length >= 20) {
    displayScreen.style.fontSize = '20px';
  } else if (displayScreen.textContent.length < 20) {
    displayScreen.style.fontSize = '28px';
  }
};
