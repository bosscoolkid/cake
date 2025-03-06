import React from 'react';

interface CandleProps {
  position: {
    left: number;
    top: number;
  };
  isBlowing: boolean;
  intensity: number;
  index: number;
}

const Candle: React.FC<CandleProps> = ({ position, isBlowing, intensity, index }) => {
  const isVisible = intensity > 0;
  
  return (
    <div
      className="candle"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: isBlowing
          ? `rotate(${Math.sin(Date.now() / 200 + index) * 5}deg)`
          : "none",
        transition: "transform 0.1s",
      }}
    >
      {isVisible && (
        <Flame 
          intensity={intensity} 
          isBlowing={isBlowing} 
        />
      )}
    </div>
  );
};

interface FlameProps {
  intensity: number;
  isBlowing: boolean;
}

const Flame: React.FC<FlameProps> = ({ intensity, isBlowing }) => {
  return (
    <div
      className="flame"
      style={{
        opacity: intensity / 100,
        height: `${Math.max(15, intensity / 3)}px`,
        transform: isBlowing
          ? `skewX(${10 + Math.sin(Date.now() / 100) * 10}deg)`
          : "none",
        transition: "opacity 0.1s, height 0.1s",
        animation: isBlowing
          ? "flicker 0.5s ease-in-out alternate infinite"
          : "flicker 1s ease-in-out alternate infinite",
      }}
    />
  );
};

export default Candle;