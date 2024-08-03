import React from 'react';

const Card = ({ name, email, college, phone, checked, onToggle }) => {
  const cardStyle = {
    border: `2px solid ${checked ? 'green' : 'red'}`,
    boxShadow: `0 10px 20px 0 ${checked ? 'green' : 'red'}`,
    padding: '16px',
    margin: '16px',
    borderRadius: '8px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    backgroundColor: 'black',
    transition: 'transform 0.2s',
};
   
    const buttonStyle = {
      background: checked ? 'linear-gradient(45deg, #32CD32, #008000)' : 'linear-gradient(45deg, #FF6347, #FF4500)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontFamily: 'Roboto, sans-serif',
      fontSize: '18px',
      transition: 'background 0.3s, transform 0.2s',
  };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
    };

    return (
        <div className="card" style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = cardHoverStyle.transform} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>College: {college}</p>
            <p>Phone: {phone}</p>
            <button style={buttonStyle} onClick={onToggle}>
                {checked ? "Check Out" : "Check In"}
            </button>
        </div>
    );
};

export default Card;