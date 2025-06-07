import React from 'react';

export default function BookingLinkGenerator() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'red' }}>🚨 TEST VERSION ACTIVE 🚨</h1>
      <p>This confirms that a deploy actually occurred.</p>
      <button 
        style={{
          backgroundColor: 'black',
          color: 'white',
          fontSize: '20px',
          padding: '10px 30px',
          borderRadius: '8px',
          border: 'none',
          marginTop: '20px'
        }}
      >
        Red Deploy Button
      </button>
    </div>
  );
}
