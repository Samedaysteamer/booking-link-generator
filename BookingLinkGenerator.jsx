import React from 'react';

export default function BookingLinkGenerator() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'red' }}>🚨 TEST VERSION ACTIVE 🚨</h1>
      <p>This is a temporary version to verify deploy is working correctly.</p>
      <button 
        style={{
          backgroundColor: 'red',
          color: 'white',
          fontSize: '20px',
          padding: '10px 30px',
          borderRadius: '10px',
          border: 'none',
          marginTop: '20px'
        }}
      >
        Test Button
      </button>
    </div>
  );
}
