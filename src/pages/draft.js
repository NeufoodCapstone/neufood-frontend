import React from 'react';
function draft() {
  const Fruits = [
    { name: 'Apple' },
    { name: 'Apricot' },
    { name: 'Honeyberry' },
    { name: 'Papaya' },
    { name: 'Jambul' },
    { name: 'Plum' },
    { name: 'Lemon' },
    { name: 'Pomelo' }
  ];
  return (
    <div>
      {Fruits.map(data => (
        <p>{data.name}</p>
      ))}
    </div>
  );
}
export default draft;