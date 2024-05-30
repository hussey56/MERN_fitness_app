import React, { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = text.slice(0, maxLength);
  const fullText = text;

  return (
    <div>
      {isExpanded ? (
        <>
          <p id='swtext'>{fullText} </p>
          {text.length > maxLength && 
          <span className='text-primary' style={{cursor:'pointer'}} onClick={handleToggle}>Read Less</span>
}
        </>
      ) : (
        <>
        {text.length > maxLength ?
          <p id='swtext'>{truncatedText}...</p>
          : <p id="swtext">{fullText}</p>
        }
        
          {text.length > maxLength && 
          <span className='text-primary' style={{cursor:'pointer'}} onClick={handleToggle}>Read More</span>
}
        </>
      )}
    </div>
  );
};

export default ReadMore;