// Hook
const NAMESPACE = 'todoMVC';

const { localStorage } = window;

function useLocalStorage(initialValue) {

  const storedItem = localStorage.getItem(NAMESPACE);
  const item = storedItem ? JSON.parse(storedItem) : initialValue;

  const setValue = value => {
    try {
      localStorage.setItem(NAMESPACE, JSON.stringify(value)); // Save to local storage
    } catch (error) {
      console.log(error);
    }
  };

  return [item, setValue];
}