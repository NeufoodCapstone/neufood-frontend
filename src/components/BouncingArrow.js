import React, { useState } from 'react';
import '../pages/about.css'; // Import a CSS file for styling
import downArrow from '../imgs/about/down-arrow.png';

const BouncingArrow = () => {
  const [animate, setAnimate] = useState(true);

  const handleClick = () => {
    // Handle click event
    setAnimate(false); // Stop the bouncing animation
    // Scroll to the next section or perform any other action
  };

  const handleScroll = () => {
    // Handle scroll event
    setAnimate(false); // Stop the bouncing animation
    // Scroll to the next section or perform any other action
  };

  return (
    <div
      className={`bouncing-arrow ${animate ? 'bounce' : ''}`}
      onClick={handleClick}
      onScroll={handleScroll}
    >
      {/* Arrow icon or any other content */}
     <img src={downArrow}
     style={{
        width: "50px",
        height: "50px",
        marginTop: "50px",
        marginBottom: "50px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
    
     }}/>
    </div>
  );
};

export default BouncingArrow;