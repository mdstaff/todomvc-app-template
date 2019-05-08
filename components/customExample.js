import { useState, useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title])
}

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  useDocumentTitle(count);

  useEffect(() => {
    document.title = `You Clicked ${count} times.`
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment} style={{ padding: 10, borderRadius: 6 }}>
        Click me
     </button>
    </div>
  );
}