/** 
 * todo mvc app.js
 * @author mstaff
 * @created 2019.05.04
 * @modified 2019.05.08
 */

// Shorthand
const e = React.createElement;

// Utils
const uuid = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const runCallback = (callback, value) => {
  typeof callback === 'function' && callback(value)
};

function immutableSplice(arr, start, deleteCount, ...items) {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)]
}

function immutableReplace(arr, newItem, property) {
  const start = arr.findIndex(item => item[property] === newItem[property])
  return immutableSplice(arr, start, 1, newItem);
}

function immutableRemove(arr, newItem, property) {
  const start = arr.findIndex(item => item[property] === newItem[property])
  return immutableSplice(arr, start, 1);
}

function createTodoItem(value) {
  return {
    completed: false,
    key: uuid(),
    value,
  }
}

// Config
const filters = [
  { href: '#/', label: 'All' },
  { href: '#/active', label: 'Active' },
  { href: '#/completed', label: 'Completed' }
];

const filterLogic = {
  "#/": () => true,
  "#/active": (item) => !item.completed,
  "#/completed": (item) => item.completed,
}

const initialState = {
  filter: { href: window.location.hash },
  items: [],
};

const actions = {
  ADD_ITEM: 'addItem',
  UPDATE_ITEM: 'updateItem',
  REMOVE_ITEM: 'removeItem',
  UPDATE_FILTER: 'updateFilter',
};

// Hooks
function reducer(state, { type, value }) {
  switch (type) {
    case actions.ADD_ITEM:
      return { ...state, items: [...state.items, createTodoItem(value)] };
    case actions.REMOVE_ITEM:
      return { ...state, items: immutableRemove(state.items, value, 'key') };
    case actions.UPDATE_ITEM:
      return { ...state, items: immutableReplace(state.items, value, 'key') };
    case actions.UPDATE_FILTER:
      return { ...state, filter: value };
  }
}

function useFormTextInput(initialValue, className, submit, cancel) {
  var ESCAPE_KEY = 27;
  var ENTER_KEY = 13;

  const isNew = className === NEW_TODO_CLASSNAME;

  const [value, setValue] = React.useState(initialValue);

  function handleBlur() {
    runCallback(cancel);
  }

  function handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      runCallback(cancel, value);
    } else if (event.which === ENTER_KEY) {
      runCallback(submit, value);
      isNew && setValue('');
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    className,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    value,
  }
}

function useFormCheckboxInput(initialValue, callback) {

  const [value, setValue] = React.useState(initialValue);

  function handleChange(e) {
    setValue(!value);
    runCallback(callback, value);
  }

  return {
    checked: value ? 'checked' : '',
    className: 'toggle',
    onChange: handleChange,
    type: 'checkbox',
    value,
  }
}
const NEW_TODO_CLASSNAME = 'new-todo';
const Header = ({ dispatch }) => {
  const addItem = (item) => { dispatch({ type: actions.ADD_ITEM, value: item }) }
  const newItem = useFormTextInput('', NEW_TODO_CLASSNAME, addItem);
  return e('header', { className: 'header' }, [
    e('h1', { key: 'header.heading' }, 'todos'),
    e('input', { key: 'header.input', placeholder: "suh", autoFocus: true, ...newItem })
  ]);
};

const MainSection = ({ state, dispatch }) => {
  const { items, filter } = state;

  const activeFilter = filterLogic[filter.href];
  const itemElements = items.filter(activeFilter || Boolean).map(item => e(Item, { key: item.key, item, dispatch }));

  return e('section', { className: 'main', id: 'main' }, [
    e('input', { key: 'main.toggle', id: "toggle-all", className: "toggle-all", type: "checkbox" }),
    e('label', { key: 'main.toggle.label', htmlFor: "toggle-all" }, 'Mark all as complete'),
    e('ul', { key: 'main.itemlist', className: "todo-list" }, itemElements)
  ]);
};

const Item = ({ item, dispatch }) => {
  const { key } = item;
  const removeItem = () => {
    dispatch({ type: actions.REMOVE_ITEM, value: item });
  }
  const toggleCompleted = () => {
    dispatch({ type: actions.UPDATE_ITEM, value: { ...item, completed: !item.completed } });
  }
  const submitItem = (itemValue) => {
    dispatch({ type: actions.UPDATE_ITEM, value: { ...item, value: itemValue } });
    setEditing(false);
  }
  const setEditable = () => setEditing(true);
  const clearEditable = () => setEditing(false);

  const [editing, setEditing] = React.useState();
  const checkbox = useFormCheckboxInput(item.completed, toggleCompleted);
  const todoItem = useFormTextInput(item.value, 'edit', submitItem, clearEditable);
  const rowClassNames = [
    'todo',
    checkbox.checked && 'completed',
    editing && 'editing'
  ].filter(Boolean).join(' ');

  return e('li', { className: rowClassNames }, [
    e('div', { key: `${key}-div`, className: 'view' }, [
      e('input', { key: `${key}-checkbox`, ...checkbox }),
      e('label', { key: `${key}-label`, onDoubleClick: setEditable }, todoItem.value),
      e('button', { key: `${key}-button`, className: 'destroy', onClick: removeItem }),
    ]),
    e('input', { key: `${key}-input`, ...todoItem })
  ]);
};

const Footer = ({ state: { items, filter }, dispatch }) => {
  const filterItems = filters.map(item => FilterItem({ ...item, filter, dispatch }));

  return e('footer', { className: 'footer', id: 'footer' }, [
    e('span', { key: uuid(), className: 'todo-count' }, [e('strong', { key: uuid() }, items.length), '\u00a0item left']),
    e('ul', { key: uuid(), className: 'filters' }, filterItems),
    e('button', { key: uuid(), className: 'clear-completed' }, 'Clear completed')
  ]);
};

const FilterItem = ({ href, label, filter, dispatch }) => {
  const updateFilter = (e) => {
    dispatch({ type: actions.UPDATE_FILTER, value: { href, label } })
  }
  const home = !filter.href;
  const selected = (home && label === 'All') || filter.href === href;
  const item = e('a', { className: selected ? 'selected' : '', href, onClick: updateFilter }, label);
  return e('li', { key: uuid() }, item);
};

const App = () => {
  const [localState, setLocal] = useLocalStorage(initialState);
  const [state, dispatch] = React.useReducer(reducer, localState);
  setLocal(state);


  return e(React.Fragment, {}, [
    e(Header, { key: 'header', state, dispatch }),
    e(MainSection, { key: 'main', state, dispatch }),
    e(Footer, { key: 'footer', state, dispatch })
  ]);
}

(function (window) {
  'use strict';
  const domContainer = document.querySelector('#app');
  ReactDOM.render(e(App), domContainer);
})(window);
