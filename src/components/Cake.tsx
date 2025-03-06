import React from 'react';
import Candle from './Candle';

interface CakeProps {
  age: number;
  isBlowing: boolean;
  flameIntensity: number[];
}

const Cake: React.FC<CakeProps> = ({ age, isBlowing, flameIntensity }) => {
  return (
    <div className="cake">
      <div className="plate" />
      <div className="layer layer-bottom" />
      <div className="layer layer-middle" />
      <div className="layer layer-top" />
      <div className="icing" />
      <div className="drip drip1" />
      <div className="drip drip2" />
      <div className="drip drip3" />
      
      <CandleGroup 
        count={age} 
        isBlowing={isBlowing} 
        flameIntensity={flameIntensity} 
      />
    </div>
  );
};

interface CandleGroupProps {
  count: number;
  isBlowing: boolean;
  flameIntensity: number[];
}

const CandleGroup: React.FC<CandleGroupProps> = ({ count, isBlowing, flameIntensity }) => {
  const candlesPerRow = Math.min(16, Math.floor(260 / 30));
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const intensity = flameIntensity[index] || 0;
        const row = Math.floor(index / candlesPerRow);
        const candlePosition = (index % candlesPerRow) * 30 + 40;
        
        return (
          <Candle 
            key={index}
            position={{ left: candlePosition, top: row * 58 }}
            isBlowing={isBlowing}
            intensity={intensity}
            index={index}
          />
        );
      })}
    </>
  );
};

export default Cake;