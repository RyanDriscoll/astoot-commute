import React from 'react';

const FilterInput = (props) => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <form className='form-group'>
      <input
        onChange={handleChange}
        value={inputValue}
        className='form-control shadow'
        placeholder="Filter results"
      />
    </form>
  )
};

export default FilterInput;