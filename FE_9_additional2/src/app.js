let rootNode = document.getElementById('root');

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const FIVE = 5;
const TEN = 10;
const HUNDRED = 100;
const MIN_NUMBER = 9;
const MAX_NUMBER = 40000;
const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;
let MIN_HEIGHT = 3;
let MIN_WIDTH = 4;

let game = createElem('div', rootNode, '', 'game');
game.style.height = GAME_HEIGHT + TWO + 'px';
game.style.width = GAME_WIDTH + TWO + 'px';
game.style.border = '1px solid #A5A5A5';

createNewGameFild();

let generateBtn = document.getElementsByClassName('generateNew')[ZERO];
generateBtn.addEventListener('click', createNewGameFild);

//------------------------functions-----------------------------

function createNewGameFild() {
  game.innerHTML = '<div class="insideGame"></div>';
  let firstElement = game.children[ZERO];
  firstElement.style.height = GAME_HEIGHT + 'px';
  firstElement.style.width = GAME_WIDTH + 'px';
  let numberElement = MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER + ONE - MIN_NUMBER));
  document.getElementById('out').innerHTML = `${numberElement}`;
  let counterElement = ONE;
  if (numberElement <= FIVE * FIVE) {
    //25  120  160
    MIN_HEIGHT = GAME_HEIGHT / FIVE;
    MIN_WIDTH = GAME_WIDTH / FIVE;
  } else if (numberElement <= TWO * TWO * HUNDRED) {
    //400  30  40
    MIN_HEIGHT = GAME_HEIGHT / (TWO * TEN);
    MIN_WIDTH = GAME_WIDTH / (TWO * TEN);
  } else if (numberElement <= FIVE * FIVE * HUNDRED) {
    //2500  12  16
    MIN_HEIGHT = GAME_HEIGHT / (FIVE * TEN);
    MIN_WIDTH = GAME_WIDTH / (FIVE * TEN);
  } else if (numberElement <= HUNDRED * HUNDRED) {
    //10000  6  8
    MIN_HEIGHT = GAME_HEIGHT / HUNDRED;
    MIN_WIDTH = GAME_WIDTH / HUNDRED;
  } else if (numberElement <= TWO * TWO * HUNDRED * HUNDRED) {
    //40000  3  4
    MIN_HEIGHT = GAME_HEIGHT / (TWO * HUNDRED);
    MIN_WIDTH = GAME_WIDTH / (TWO * HUNDRED);
  }
  if (numberElement > FIVE * FIVE * HUNDRED && numberElement <= HUNDRED * HUNDRED) {
    counterElement = startGrid(firstElement, MIN_HEIGHT, MIN_WIDTH, numberElement, counterElement, FIVE);
  } else if (numberElement > HUNDRED * HUNDRED && numberElement <= TWO * TWO * HUNDRED * HUNDRED) {
    counterElement = startGrid(firstElement, MIN_HEIGHT, MIN_WIDTH, numberElement, counterElement, TWO * TEN);
  }
  while (counterElement < numberElement) {
    let insideGame = document.getElementsByClassName('insideGame');
    for (let i = 0; i < insideGame.length; i++) {
      let parent = insideGame[i];
      let parentHeight = parseInt(parent.style.height) / MIN_HEIGHT;
      let parentWidth = parseInt(parent.style.width) / MIN_WIDTH;
      if (parentHeight > ONE && parentWidth > ONE) {
        Math.round(Math.random())
          ? partHeight(parent, parentHeight, parentWidth)
          : partWidth(parent, parentHeight, parentWidth);
        counterElement++;
        i++;
      } else if (parentWidth === ONE && parentHeight > ONE) {
        partHeight(parent, parentHeight, parentWidth);
        counterElement++;
        i++;
      } else if (parentHeight === ONE && parentWidth > ONE) {
        partWidth(parent, parentHeight, parentWidth);
        counterElement++;
        i++;
      } else if (parentHeight === ONE && parentWidth === ONE) {
        parent.classList.add('insideGameFinished');
        parent.classList.remove('insideGame');
        i--;
      }
      if (counterElement === numberElement) {
        break;
      }
    }
  }
  let insideGame = document.getElementsByClassName('insideGame');
  for (let i = 0; i < insideGame.length; i++) {
    insideGame[i].addEventListener('click', getColor);
  }
  let insideGameFinished = document.getElementsByClassName('insideGameFinished');
  for (let i = 0; i < insideGameFinished.length; i++) {
    insideGameFinished[i].addEventListener('click', getColor);
  }
}

function partWidth(parent, parentHeight, parentWidth) {
  parent.classList.add('inside');
  parent.classList.remove('insideGame');
  let width1 = ONE + Math.floor(Math.random() * (parentWidth - ONE));
  let width2 = parentWidth - width1;
  if (parentHeight === ONE && width1 === ONE) {
    let insideGame1 = createElem('div', parent, '', 'insideGameFinished');
    insideGame1.style.height = parentHeight * MIN_HEIGHT + 'px';
    insideGame1.style.width = width1 * MIN_WIDTH + 'px';
  } else {
    let insideGame1 = createElem('div', parent, '', 'insideGame');
    insideGame1.style.height = parentHeight * MIN_HEIGHT + 'px';
    insideGame1.style.width = width1 * MIN_WIDTH + 'px';
  }
  if (parentHeight === ONE && width2 === ONE) {
    let insideGame2 = createElem('div', parent, '', 'insideGameFinished');
    insideGame2.style.height = parentHeight * MIN_HEIGHT + 'px';
    insideGame2.style.width = width2 * MIN_WIDTH + 'px';
  } else {
    let insideGame2 = createElem('div', parent, '', 'insideGame');
    insideGame2.style.height = parentHeight * MIN_HEIGHT + 'px';
    insideGame2.style.width = width2 * MIN_WIDTH + 'px';
  }
}

function partHeight(parent, parentHeight, parentWidth) {
  parent.classList.add('inside');
  parent.classList.remove('insideGame');
  let height1 = ONE + Math.floor(Math.random() * (parentHeight - ONE));
  let height2 = parentHeight - height1;
  if (height1 === ONE && parentWidth === ONE) {
    let insideGame1 = createElem('div', parent, '', 'insideGameFinished');
    insideGame1.style.height = height1 * MIN_HEIGHT + 'px';
    insideGame1.style.width = parentWidth * MIN_WIDTH + 'px';
  } else {
    let insideGame1 = createElem('div', parent, '', 'insideGame');
    insideGame1.style.height = height1 * MIN_HEIGHT + 'px';
    insideGame1.style.width = parentWidth * MIN_WIDTH + 'px';
  }
  if (height2 === ONE && parentWidth === ONE) {
    let insideGame2 = createElem('div', parent, '', 'insideGameFinished');
    insideGame2.style.height = height2 * MIN_HEIGHT + 'px';
    insideGame2.style.width = parentWidth * MIN_WIDTH + 'px';
  } else {
    let insideGame2 = createElem('div', parent, '', 'insideGame');
    insideGame2.style.height = height2 * MIN_HEIGHT + 'px';
    insideGame2.style.width = parentWidth * MIN_WIDTH + 'px';
  }
}

function startGrid(parent, minHeight, minWidth, numElem, countElem, part) {
  parent.classList.add('inside');
  parent.classList.remove('insideGame');
  countElem--;
  for (let i = 0; i < part * part; i++) {
    let insideGame = createElem('div', parent, '', 'insideGame');
    insideGame.style.height = GAME_HEIGHT / part + 'px';
    insideGame.style.width = GAME_WIDTH / part + 'px';
  }
  countElem += part * part;
  let timesH = GAME_HEIGHT / part / minHeight;
  let timesW = GAME_WIDTH / part / minWidth;
  let numElemInGrid = timesH * timesW;
  let times = Math.floor(numElem / numElemInGrid) - ONE - part;
  let insideGame = document.getElementsByClassName('insideGame');
  while (times) {
    let elem = insideGame[insideGame.length - 1 - Math.floor(Math.random() * insideGame.length)];
    elem.classList.add('inside');
    elem.classList.remove('insideGame');
    countElem--;
    for (let i = 0; i < numElemInGrid; i++) {
      let insideGame = createElem('div', elem, '', 'insideGameFinished');
      insideGame.style.height = minHeight + 'px';
      insideGame.style.width = minWidth + 'px';
    }
    times--;
    countElem += numElemInGrid;
  }
  return countElem;
}

function getColor(e) {
  e.target.style.backgroundColor = document.getElementById('background_color').value;
  this.style.borderColor = document.getElementById('border_color').value;
}

function createElem(strElem, parent, strText, strClass, arrAttribute) {
  let elem = document.createElement(strElem);
  if (strText) {
    elem.appendChild(document.createTextNode(strText));
  }
  if (strClass) {
    elem.className = strClass;
  }
  if (parent) {
    parent.appendChild(elem);
  }
  if (arrAttribute) {
    for (let i = 0; i < arrAttribute.length; i++) {
      elem.setAttribute(arrAttribute[i][ZERO], arrAttribute[i][ONE]);
    }
  }
  return elem;
}
