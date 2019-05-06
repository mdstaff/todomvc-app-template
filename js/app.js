const e = React.createElement;

const uuid = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const Header = () => {
  return e('header', { className: 'header' }, [
    e('h1', { key: uuid() }, 'todos'),
    e('input', { key: uuid(), className: 'new-todo', placeholder: "suh", autoFocus: true })
  ]);
};

const MainSection = () => {
  const Items = [
    { label: 'Taste JavaScript', checked: false, completed: true, value: "Create todomvc template" },
    { label: 'Buy a unicorn', checked: false, completed: false, value: "Rule the web" }
  ];

  const itemElements = Items.map(item => e(Item, { ...item, key: uuid() }));

  return e('section', { className: 'main' }, [
    e('input', { key: uuid(), id: "toggle-all", className: "toggle-all", type: "checkbox" }),
    e('label', { key: uuid(), htmlFor: "toggle-all" }, 'Mark all as complete'),
    e('ul', { key: uuid(), className: "todo-list" }, itemElements)
  ]);
};

// label = Taste JavaScript
// value = Create todomvc template
const Item = ({ value, label, checked, completed }) => {
  return e('li', { className: completed ? 'completed' : '' }, [
    e('div', { key: uuid(), className: 'view' }, [
      e('input', { key: uuid(), className: 'toggle', type: 'checkbox', checked: !!checked }),
      e('label', { key: uuid() }, label),
      e('button', { key: uuid(), className: 'destroy' }),
    ]),
    e('input', { key: uuid(), className: 'edit', value })
  ]);
}

const Footer = () => {
  return e('footer', { className: 'footer' }, [
    e('span', { key: uuid(), className: 'todo-count' }, [e('strong', { key: uuid() }, '0'), '\u00a0item left']),
    e('ul', { key: uuid(), className: 'filters' }, [
      e('li', { key: uuid() }, e('a', { className: 'selected', href: '#/' }, 'All')),
      e('li', { key: uuid() }, e('a', { className: '', href: '#/active' }, 'Active')),
      e('li', { key: uuid() }, e('a', { className: '', href: '#/completed' }, 'Completed')),
    ]),
    e('button', { key: uuid(), className: 'clear-completed' }, 'Clear completed')
  ]);
};

const App = e(React.Fragment, {}, [
  e(Header, { key: uuid() }),
  e(MainSection, { key: uuid() }),
  e(Footer, { key: uuid() })
]);

(function (window) {
  'use strict';

  // Your starting point. Enjoy the ride!

  const domContainer = document.querySelector('#main');
  ReactDOM.render(App, domContainer);
})(window);
