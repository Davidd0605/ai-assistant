import { useEffect, useState } from 'react';

export default function App() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setHealth({ error: err.message }));
  }, []);

  return <div> Test test: {health ? JSON.stringify(health) : 'Loading...'}</div>;
}