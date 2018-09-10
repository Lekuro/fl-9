const rootNode = document.getElementById('root');

let todoItems = [];

const ZERO = 0;
const ONE = 1;

const createElem = (strElem, parent, strText, arrAttribute, strClass) => {
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
};

const deleteElement = e => {
  const newList = todoItems.filter(item => item.id !== e.target.parentNode.id);
  localStorage.setItem('todoItems', JSON.stringify(newList));
  todoItems = newList;
  e.target.parentNode.remove();
  if (todoItems.length === ZERO) {
    document.getElementsByTagName('p')[ZERO].style.display = 'block';
  }
};
const modifyElement = e => {
  rootNode.innerHTML = '';
  window.location.hash = `#/modify/${e.target.parentNode.id}`;
  let section = document.createElement('section');
  createElem('h1', section, 'Modify item');
  let input = createElem('input', section, '', [['autocomplete', 'true']]);
  input.value = e.target.textContent;
  let div = createElem('div', section, '', '', 'twoButton');
  let buttonCancel = createElem('button', div, 'Cancel', '', 'cancel');
  buttonCancel.addEventListener('click', () => {
    window.location.hash = '#/';
  });
  let button = createElem('button', div, 'Save changes', [['disabled', '']], 'saveCanges');
  rootNode.appendChild(section);
  const activeButton = () => {
    input.value ? button.disabled = false : button.disabled = true;
  };
  input.addEventListener('keyup', activeButton);
  const saveChange = () => {
    const description = input.value;
    const newList = todoItems.map(item => {
      if (item.id === e.target.parentNode.id) {
        item.description = description;
      }
      return item;
    });
    localStorage.setItem('todoItems', JSON.stringify(newList));
    window.location.hash = '#/';
  };
  button.addEventListener('click', saveChange);
};

const createMain = () => {
  rootNode.innerHTML = '';
  window.location.hash = '';
  const section = document.createElement('section');
  createElem('h1', section, 'Simple TODO application');
  const div = createElem('div', section, '', '', 'simple');
  const button = createElem('button', div, 'Add new task', '', 'addNewTask');
  button.addEventListener('click', () => {
    window.location.hash = '#/add';
  });
  const p = createElem('p', section, 'TODO is empty');
  const ul = createElem('ul', section, '', [['id', 'tasks']]);
  if (JSON.parse(localStorage.getItem('todoItems'))) {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
  }
  if (todoItems.length) {
    p.style.display = 'none';
    for (let i = 0; i < todoItems.length; i++) {
      if (!todoItems[i].isDone) {
        let li = createElem('li', ul, '', [['id', todoItems[i].id]], 'task');
        createElem('button', li, '', '', 'unchecked');
        createElem('button', li, todoItems[i].description, '', 'textButton');
        createElem('button', li, '', '', 'delete');

        li.lastElementChild.addEventListener('click', deleteElement);
        li.children[ONE].addEventListener('click', modifyElement);

        const changeChecked = () => {
          li.firstElementChild.classList.add('checked');
          li.firstElementChild.classList.remove('unchecked');
          const newList = todoItems.map(item => {
            if (item.id === todoItems[i].id) {
              item.isDone = true;
            }
            return item;
          });
          localStorage.setItem('todoItems', JSON.stringify(newList));
          let newLi = li.cloneNode(true);
          newLi.lastElementChild.addEventListener('click', deleteElement);
          newLi.children[ONE].addEventListener('click', modifyElement);
          li.remove();
          ul.appendChild(newLi);
        };
        li.firstElementChild.addEventListener('click', changeChecked);
      }
    }
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].isDone) {
        let li = createElem('li', ul, '', [['id', todoItems[i].id]], 'task');
        createElem('button', li, '', '', 'checked');
        createElem('button', li, todoItems[i].description, '', 'textButton');
        createElem('button', li, '', '', 'delete');
        li.lastElementChild.addEventListener('click', deleteElement);
        li.children[ONE].addEventListener('click', modifyElement);
      }
    }
  }
  rootNode.appendChild(section);
};
createMain();

const createAdd = () => {
  rootNode.innerHTML = '';
  const section = document.createElement('section');
  createElem('h1', section, 'Add task');
  const input = createElem('input', section, '', [['autocomplete', 'true']]);
  const div = createElem('div', section, '', '', 'twoButton');
  const buttonCancel = createElem('button', div, 'Cancel', '', 'cancel');
  buttonCancel.addEventListener('click', () => {
    window.location.hash = '#/';
  });
  const button = createElem('button', div, 'Save changes', [['disabled', '']], 'saveCanges');
  rootNode.appendChild(section);
  const activeButton = () => {
    input.value ? button.disabled = false : button.disabled = true;
  };

  input.addEventListener('keyup', activeButton);
  const addTask = () => {
    const id = 'task_' + +new Date();
    const description = input.value;
    const item = { isDone: false, id, description };
    todoItems.push(item);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    window.location.hash = '#/';
  };
  button.addEventListener('click', addTask);
};

const checkHash = () => {
  let hash = window.location.hash;
  if (hash === '#/') {
    createMain();
  } else if (hash === '#/add') {
    createAdd();
  }
};
window.addEventListener('hashchange', checkHash);
