import React from 'react';

const SortButton = ({ category, sortBy }) => {
  return <button onClick={() => sortBy(category)}>{category}</button>;
};

export default SortButton;
