import { useState, useEffect } from 'react';

const Counter = ({ target, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    // Calcula o tempo de incremento para durar o tempo total definido
    let totalMiliseconds = duration;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime > 10 ? incrementTime : 10); // Limite de 10ms para não travar o browser

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default Counter;