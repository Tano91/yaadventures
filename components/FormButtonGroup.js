import React, { useState, useEffect } from 'react';

const FormButtonGroup = ({ options, setSelectedOption, register, setValue, trigger }) => {
 const [selected, setSelected] = useState(null);

 useEffect(()=>{
   if(selected){
       setValue('selectedOption', selected)
       trigger('selectedOption'); // Trigger validation for the selectedOption field
   }
 }, [selected])

 const handleClick = (option) => {
     setSelected(option);
     setSelectedOption(option);
   
  };

 return (
  <div>
    {options.map((option) => (
      <button 
       type='button'
        key={option} 
        // disabled={selected !== null && selected !== option}
        style={{ border: selected === option ? '2px solid blue' : 'none' }}
        onClick={() => handleClick(option)}
      >
        {option}
      </button>
    ))}
  </div>
 );
};

export default FormButtonGroup
