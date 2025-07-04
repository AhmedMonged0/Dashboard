import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedBar = ({ position, height, color, delay = 0 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.y = Math.max(0.1, Math.sin(time * 2 + delay) * 0.3 + height);
      meshRef.current.rotation.y = Math.sin(time * 0.5 + delay) * 0.1;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      scale={[0.8, height, 0.8]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial 
        color={color} 
        metalness={0.3}
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </Box>
  );
};

const Chart3DScene = ({ chartData }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
      
      {chartData.map((item, index) => (
        <group key={item.name}>
          <AnimatedBar
            position={[index * 1.5 - 3, item.value / 200, 0]}
            height={item.value / 200}
            color={item.color}
            delay={index * 0.5}
          />
          <Text
            position={[index * 1.5 - 3, -0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {item.name}
          </Text>
        </group>
      ))}
      
      {/* Grid floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
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
    <div className="text-white">Loading 3D Chart...</div>
  </div>
);

const Chart3D = ({ data, title }) => {
  const chartData = useMemo(() => [
    { name: 'Jan', value: 400, color: '#f59e0b' },
    { name: 'Feb', value: 600, color: '#f59e0b' },
    { name: 'Mar', value: 800, color: '#f59e0b' },
    { name: 'Apr', value: 1200, color: '#f59e0b' },
    { name: 'May', value: 1400, color: '#f59e0b' },
  ], []);

  return (
    <div className="bg-slate-700 rounded-2xl p-6 h-96">
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
      <div className="h-80">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [5, 5, 5], fov: 60 }}
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
            <Chart3DScene chartData={chartData} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default Chart3D;

