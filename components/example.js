import { useState } from 'react';

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment} style={{ padding: 10, borderRadius: 6 }}>
        Click me
      </button>
    </div>
  );
}