import React from 'react';

// Simple CSS-based particle background for better performance
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Static background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5"></div>
        
        {/* Simple static dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground;

