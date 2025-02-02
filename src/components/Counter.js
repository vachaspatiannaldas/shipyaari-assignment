import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 3) {
      setCount(count + 1);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Counter Component</h2>
      <div className="card p-4 mt-3 mx-auto" style={{ maxWidth: '300px' }}>
        <h3>Count: {count}</h3>
        <button 
          className="btn btn-primary mt-3"
          onClick={increment}
          disabled={count >= 3}
        >
          Increment
        </button>
        {count >= 3 && (
          <p className="text-danger mt-2">Maximum limit reached!</p>
        )}
      </div>
    </div>
  );
}

export default Counter;