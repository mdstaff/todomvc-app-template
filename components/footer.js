import React from 'react';

const e = React.createElement;

// init
const items = [
  { label: 'Taste JavaScript', checked: false, completed: true, value: "Create todomvc template" },
  { label: 'Buy a unicorn', checked: false, completed: false, value: "Rule the web" }
];

// mock state
const state = {
  items,
  filter: '',
}

const filters = [
  { href: '#/', label: 'All' },
  { href: '#/active', label: 'Active' },
  { href: '#/completed', label: 'Completed' }
];

const FilterItem = ({ href, label, filter }) => {
  const updateFilter = () => {
    state.filter = href;
  };
  const home = !filter.href;
  const selected = (home && label === 'All') || filter.href === href;
  const item = e('a', { className: selected ? 'selected' : '', href, onClick: updateFilter }, label);
  return e('li', { key: `filter-item-${href}` }, item);
};

const Footer = ({ state: { items, filter }, dispatch }) => {
  const filterItems = filters.map(item => FilterItem({ ...item, filter, dispatch }));

  return e('footer', { className: 'footer', id: 'footer' }, [
    e('span', { key: 'footer-span', className: 'todo-count' }, [
      e('strong', { key: 'footer-span-strong' }, items.length), '\u00a0item left'
    ]),
    e('ul', { key: 'footer-ul', className: 'filters' }, filterItems),
    e('button', { key: 'footer-button', className: 'clear-completed' }, 'Clear completed')
  ]);
};

const App = () => e(Footer, { state });

export default App;