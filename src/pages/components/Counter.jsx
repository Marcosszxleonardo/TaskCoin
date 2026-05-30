import { useState, useEffect } from 'react';

const Counter = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime > 10 ? incrementTime : 10);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default Counter;