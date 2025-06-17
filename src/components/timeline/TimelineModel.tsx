
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface TimelineModelProps {
  year: string;
  modelType: string;
}

export const TimelineModel = ({ year, modelType }: TimelineModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const renderModel = () => {
    switch (modelType) {
      case 'football':
        return (
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial 
              color="#ffffff" 
              map={createFootballTexture()} 
            />
          </mesh>
        );
      case 'book':
        return (
          <group>
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[1.5, 2, 0.2]} />
              <meshPhongMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
              <planeGeometry args={[1.3, 1.8]} />
              <meshPhongMaterial color="#FFF8DC" />
            </mesh>
          </group>
        );
      case 'crown':
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[1.2, 1.4, 0.3, 8]} />
              <meshPhongMaterial color="#FFD700" />
            </mesh>
            {Array.from({ length: 5 }).map((_, i) => (
              <mesh key={i} position={[
                Math.cos(i * Math.PI * 2 / 5) * 1.3,
                0.4,
                Math.sin(i * Math.PI * 2 / 5) * 1.3
              ]}>
                <coneGeometry args={[0.1, 0.5, 4]} />
                <meshPhongMaterial color="#FFD700" />
              </mesh>
            ))}
          </group>
        );
      case 'phone':
        return (
          <mesh>
            <boxGeometry args={[0.6, 1.2, 0.1]} />
            <meshPhongMaterial color="#1a1a1a" />
          </mesh>
        );
      case 'protest':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 2]} />
              <meshPhongMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0, 1, 0]}>
              <planeGeometry args={[1.5, 1]} />
              <meshPhongMaterial color="#FF6B6B" />
            </mesh>
          </group>
        );
      case 'map':
        return (
          <mesh>
            <planeGeometry args={[2, 1.5]} />
            <meshPhongMaterial color="#4ECDC4" />
          </mesh>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhongMaterial color="#9333EA" />
          </mesh>
        );
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
        {renderModel()}
      </Float>
    </group>
  );
};

// Helper function to create football texture
const createFootballTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 256);
  
  // Black pentagons
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(128, 128, 30, 0, Math.PI * 2);
  ctx.fill();
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};
