// src/components/SkillProgress.jsx

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SkillProgress = ({ name, progress, color, category }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const targetProgress = Math.max(0, Math.min(progress, 100));
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setAnimatedProgress(prev => {
        if (prev === targetProgress) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev < targetProgress ? prev + 1 : prev - 1;
      });
    }, 15);

    return () => clearInterval(intervalRef.current);
  }, [progress]);

  const radius = 45;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-gray-800/50 p-4 text-center">
      <div className="relative mx-auto h-28 w-28">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle className="text-gray-700" strokeWidth={stroke} stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
          <circle
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            // FIX: Use the 'color' prop directly in the style for the stroke
            style={{ stroke: color, transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
          {`${Math.round(animatedProgress)}%`}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{category}</p>
      </div>
    </div>
  );
};

SkillProgress.propTypes = {
  name: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default SkillProgress;