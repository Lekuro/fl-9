let rootNode = document.getElementById('root');

const MAX_ACTION = 10;
const ZERO = 0;
const ONE = 1;
let dragElement = null;

let form = createElem('form', '', '', [['action', '#todo'], ['method', 'get']]);
createElem('h2', form, 'TODO Cat List');
let h3 = createElem('h3', form, 'Maximum item per list are created');
let divInputBut = createElem('div', form);
let input = createElem('input', divInputBut, '', [['type', 'text'], ['placeholder', 'Add New Action']]);
let button = createElem('button', divInputBut, '', [['type', 'button'], ['disabled', '']]);
createElem('i', button, 'add_box', '', 'material-icons right');
createElem('hr', form);
let ul = createElem('ul', form, '', [['id', 'drop']]);
let divImg = createElem('div', form, '', '', 'img');
createElem('img', divImg, '', [['src', 'assets/img/cat.png'], ['alt', 'cat_paw']]);

button.addEventListener('click', addAction);
input.addEventListener('keyup', activeButton);

//addAction('Find the cat');
//addAction(`Prepare cat's carry`, true);
//addAction('Bathe a Cat');

rootNode.appendChild(form);

//------------------------functions-----------------------------
function addAction(text) {
  let arrLi = document.getElementsByTagName('li');
  if (arrLi.length < MAX_ACTION) {
    let li = createElem('Li', ul, '', [['draggable', 'true']], 'draggingLi');
    arguments[ONE]
      ? li.innerHTML = '<i class="material-icons">check_box</i><i class="material-icons right">delete</i>'
      : li.innerHTML =
          '<i class="material-icons">check_box_outline_blank</i><i class="material-icons right">delete</i>';
    let liText =
      typeof arguments[ZERO] === 'string' ? document.createTextNode(text) : document.createTextNode(input.value); //document.querySelector('input')
    li.appendChild(liText);

    li.lastElementChild.addEventListener('click', deleteElement);
    li.firstElementChild.addEventListener('click', changeChecked);

    if (document.querySelector('input')) {
      document.querySelector('input').value = '';
      document.querySelector('button').disabled = true;
    }

    if (arrLi.length === MAX_ACTION) {
      document.querySelector('input').disabled = true;
      h3.style.display = 'block';
    }
  }
}

function activeButton() {
  let value = document.querySelector('input').value;
  value ? button.disabled = false : button.disabled = true;
}

function deleteElement() {
  this.parentElement.remove();
  let arrLi = document.getElementsByTagName('li');
  let h3Display = h3.style.display;
  if (arrLi.length < MAX_ACTION && h3Display === 'block') {
    h3.style.display = 'none';
    document.querySelector('input').disabled = false;
  }
}

function changeChecked() {
  this.textContent === 'check_box' ? this.innerHTML = 'check_box_outline_blank' : this.innerHTML = 'check_box';
}

function createElem(strElem, parent, strText, arrAttribute, strClass) {
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
//-------------drag drop-----------------------
ul.addEventListener('dragstart', event => {
  dragElement = event.target;
  dragElement.style.backgroundColor = '#ddffdd';
});

ul.addEventListener('dragover', event => {
  if (event.target.className === 'draggingLi') {
    event.preventDefault();

    let bounding = event.target.getBoundingClientRect();
    let offset = bounding.y + bounding.height / (ONE + ONE);

    if (event.clientY - offset > ZERO) {
      event.target.style['border-top'] = '';
      event.target.style['border-bottom'] = '4px dotted #bbbbff';
    } else {
      event.target.style['border-top'] = '4px dotted #bbbbff';
      event.target.style['border-bottom'] = '';
    }
  }
});

ul.addEventListener('dragleave', event => {
  event.target.style['border-bottom'] = '';
  event.target.style['border-top'] = '';
  dragElement.style.backgroundColor = '';
});

ul.addEventListener('drop', event => {
  if (event.target.className === 'draggingLi') {
    event.preventDefault();

    if (event.target.style['border-bottom']) {
      event.target.style['border-bottom'] = '';
      ul.insertBefore(dragElement, event.target.nextSibling);
    } else {
      event.target.style['border-top'] = '';
      ul.insertBefore(dragElement, event.target);
    }
  }
});
