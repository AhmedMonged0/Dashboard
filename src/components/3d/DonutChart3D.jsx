import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSegment = ({ startAngle, endAngle, color, radius = 2, height = 0.5, delay = 0 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time * 2 + delay) * 0.1;
      meshRef.current.rotation.y = time * 0.2 + delay;
    }
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const innerRadius = radius * 0.6;
    
    // Outer arc
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    
    // Inner arc (reverse direction)
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, endAngle, startAngle, true);
    shape.holes.push(hole);
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 8
    });
  }, [startAngle, endAngle, radius, height]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, 0, -height / 2]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial 
        color={color}
        metalness={0.4}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const DonutChart3DScene = ({ segments }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2, 0]} intensity={0.8} color="#f59e0b" />
      
      {segments.map((segment, index) => (
        <group key={segment.name}>
          <AnimatedSegment
            startAngle={segment.startAngle}
            endAngle={segment.endAngle}
            color={segment.color}
            delay={index * 0.3}
          />
          <Text
            position={[
              Math.cos(segment.midAngle) * 3,
              0,
              Math.sin(segment.midAngle) * 3
            ]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {segment.name}
          </Text>
        </group>
      ))}
      
      {/* Base platform */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.1, 32]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.3} />
      </mesh>
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={10}
      />
    </>
  );
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-white">Loading 3D Donut Chart...</div>
  </div>
);

const DonutChart3D = ({ title }) => {
  const data = useMemo(() => [
    { name: 'Desktop', value: 60, color: '#f59e0b' },
    { name: 'Mobile', value: 25, color: '#475569' },
    { name: 'Tablet', value: 15, color: '#334155' },
  ], []);

  const segments = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return data.map((item) => {
      const startAngle = currentAngle;
      const segmentAngle = (item.value / total) * Math.PI * 2;
      const endAngle = currentAngle + segmentAngle;
      currentAngle = endAngle;
      
      return {
        ...item,
        startAngle,
        endAngle,
        midAngle: startAngle + segmentAngle / 2
      };
    });
  }, [data]);

  return (
    <div className="bg-slate-700 rounded-2xl p-6 h-96">
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
      <div className="h-80">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 3, 5], fov: 60 }}
            shadows
            gl={{ 
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: true,
              powerPreference: "high-performance"
            }}
            onCreated={({ gl }) => {
              gl.setClearColor('#334155', 1);
            }}
            dpr={[1, 2]}
          >
            <DonutChart3DScene segments={segments} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default DonutChart3D;

