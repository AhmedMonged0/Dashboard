import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Enhanced3DDonut = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  
  const data = [
    { name: 'Desktop', value: 60, color: '#f59e0b' },
    { name: 'Mobile', value: 25, color: '#475569' },
    { name: 'Tablet', value: 15, color: '#334155' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const segments = data.map((item, index) => {
    const startAngle = currentAngle;
    const segmentAngle = (item.value / total) * 360;
    const endAngle = currentAngle + segmentAngle;
    currentAngle = endAngle;
    
    return {
      ...item,
      startAngle,
      endAngle,
      segmentAngle,
      midAngle: startAngle + segmentAngle / 2
    };
  });

  const createPath = (centerX, centerY, radius, innerRadius, startAngle, endAngle) => {
    const start1 = polarToCartesian(centerX, centerY, radius, endAngle);
    const end1 = polarToCartesian(centerX, centerY, radius, startAngle);
    const start2 = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const end2 = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start1.x, start1.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end1.x, end1.y,
      "L", end2.x, end2.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, start2.x, start2.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 h-96 relative overflow-hidden">
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 to-transparent"></div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80 flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: isVisible ? 1 : 0, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* SVG Donut Chart */}
          <svg width="280" height="280" className="relative z-10">
            <defs>
              {/* Gradients for 3D effect */}
              {segments.map((segment, index) => (
                <radialGradient key={`gradient-${index}`} id={`gradient-${index}`}>
                  <stop offset="0%" stopColor={segment.color} stopOpacity="0.8" />
                  <stop offset="70%" stopColor={segment.color} stopOpacity="1" />
                  <stop offset="100%" stopColor={segment.color} stopOpacity="0.6" />
                </radialGradient>
              ))}
              
              {/* Shadow filter */}
              <filter id="shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Segments */}
            {segments.map((segment, index) => {
              const isHovered = hoveredSegment === index;
              const radius = isHovered ? 110 : 100;
              const innerRadius = isHovered ? 55 : 50;
              
              return (
                <motion.g key={index}>
                  {/* 3D Base (Shadow) */}
                  <motion.path
                    d={createPath(140, 140, radius + 5, innerRadius + 5, segment.startAngle, segment.endAngle)}
                    fill="#000"
                    opacity="0.3"
                    transform="translate(0, 8)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 0.3 : 0 }}
                    transition={{ delay: index * 0.2 }}
                  />
                  
                  {/* Main Segment */}
                  <motion.path
                    d={createPath(140, 140, radius, innerRadius, segment.startAngle, segment.endAngle)}
                    fill={`url(#gradient-${index})`}
                    stroke="#1e293b"
                    strokeWidth="2"
                    filter="url(#shadow)"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    initial={{ 
                      scale: 0,
                      rotate: -segment.segmentAngle
                    }}
                    animate={{ 
                      scale: isVisible ? 1 : 0,
                      rotate: 0
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      filter: "brightness(1.2)"
                    }}
                    transition={{ 
                      delay: index * 0.3,
                      duration: 0.8,
                      type: "spring"
                    }}
                  />

                  {/* Animated Glow */}
                  <motion.path
                    d={createPath(140, 140, radius, innerRadius, segment.startAngle, segment.endAngle)}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="3"
                    opacity="0"
                    animate={{ 
                      opacity: isHovered ? [0, 0.8, 0] : 0,
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: isHovered ? Infinity : 0
                    }}
                  />
                </motion.g>
              );
            })}

            {/* Center Circle */}
            <motion.circle
              cx="140"
              cy="140"
              r="45"
              fill="url(#centerGradient)"
              stroke="#1e293b"
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            
            <defs>
              <radialGradient id="centerGradient">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </radialGradient>
            </defs>
          </svg>

          {/* Labels */}
          {segments.map((segment, index) => {
            const labelRadius = 130;
            const labelAngle = segment.midAngle;
            const labelX = 140 + labelRadius * Math.cos((labelAngle - 90) * Math.PI / 180);
            const labelY = 140 + labelRadius * Math.sin((labelAngle - 90) * Math.PI / 180);
            
            return (
              <motion.div
                key={`label-${index}`}
                className="absolute text-white text-sm font-medium pointer-events-none"
                style={{
                  left: labelX - 20,
                  top: labelY - 10,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3 + 1.5 }}
              >
                <div className="text-center">
                  <div>{segment.name}</div>
                  <div className="text-xs text-slate-300">{segment.value}%</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div 
        className="absolute bottom-4 left-4 space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-slate-300 text-xs">{segment.name}</span>
          </div>
        ))}
      </motion.div>

      {/* Interactive hint */}
      <motion.div
        className="absolute bottom-4 right-4 text-slate-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        Hover segments
      </motion.div>
    </div>
  );
};

export default Enhanced3DDonut;

