import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Grid } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GALLERY_PHOTOS } from '../../data/portfolio';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Global variable to track hovered photo's Z position without triggering React re-renders
let globalFocusTarget: number | null = null;

// Custom DoF Controller to smoothly pull focus
function DoFController() {
  const dofRef = useRef<any>(null);
  
  useFrame(() => {
    if (dofRef.current) {
      // If a photo is hovered, focus on it. Otherwise, focus on the front photos (Z=0).
      const targetZ = globalFocusTarget !== null ? globalFocusTarget : 0;
      
      // Some versions of postprocessing expose target, others expose focusDistance directly.
      if (dofRef.current.target && dofRef.current.target.lerp) {
        dofRef.current.target.lerp(new THREE.Vector3(0, 0, targetZ), 0.1);
      } else if (dofRef.current.focusDistance !== undefined) {
        // Fallback if target is not exposed
        const normalizedTarget = Math.abs(16 - targetZ) * 0.01;
        dofRef.current.focusDistance = THREE.MathUtils.lerp(dofRef.current.focusDistance, normalizedTarget, 0.1);
      }
    }
  });

  return <DepthOfField ref={dofRef} target={[0, 0, 0]} focusDistance={0} focalLength={0.02} bokehScale={6} height={480} />;
}

// Individual Photo Frame Component
function PhotoFrame({ url, position, rotation, navigate }: { url: string; position: [number, number, number]; rotation?: [number, number, number]; navigate: (path: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  // Store the initial Y position to add the float offset to it
  const initialY = position[1];

  useFrame((state) => {
    if (groupRef.current) {
      // Spring physics for hover scaling
      const targetScale = hovered ? 1.08 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
      
      // Slight floating motion to make the wall feel alive
      const floatOffset = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      groupRef.current.position.y = initialY + floatOffset;
    }
  });

  return (
    <group 
      position={position} 
      rotation={rotation} 
      ref={groupRef}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHover(true);
        document.body.style.cursor = 'pointer';
        globalFocusTarget = position[2]; // Pull focus to this photo's Z depth
      }}
      onPointerOut={(e) => { 
        e.stopPropagation(); 
        setHover(false);
        document.body.style.cursor = 'auto';
        globalFocusTarget = null; // Return focus to default
      }}
      onClick={(e) => {
        e.stopPropagation();
        navigate('/photography');
      }}
    >
      {/* Thick brutalist solid black shadow */}
      <mesh position={[0.3, -0.3, -0.1]}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* The actual photo */}
      <Image 
        url={url} 
        transparent 
        scale={[3, 4]} 
        position={[0, 0, 0]}
      />
    </group>
  );
}

// 3D Photo Wall Component
function PhotoWall({ navigate }: { navigate: (path: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Subtle and soft parallax effect based on mouse cursor position
      const targetX = (mouse.x * Math.PI) * 0.02;
      const targetY = (mouse.y * Math.PI) * 0.02;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.03);
    }
  });

  // Reduced to 9 slots for better visual spacing and performance
  const positions: [number, number, number][] = [
    [-4.5, 2, 2],       // 0: Close left
    [4.5, -2, 0],       // 1: Close right
    [-1, -3, -4],       // 2: Mid bottom
    [2, 3, -6],         // 3: Mid top right
    [-5, -1, -9],       // 4: Far left
    [5, 1, -12],        // 5: Far right
    [-2, 4, -15],       // 6: Very far top left
    [1, -4, -18],       // 7: Very far bottom right
    [-6, 2, -22],       // 8: Deep left
  ];

  // Fill exactly 9 slots.
  let photos = [...GALLERY_PHOTOS];
  while (photos.length < positions.length) {
    photos = [...photos, ...GALLERY_PHOTOS];
  }
  photos = photos.slice(0, positions.length);

  return (
    <group ref={groupRef}>
      {photos.map((photo, index) => (
        <PhotoFrame 
          key={`${photo.title}-${index}`} 
          url={photo.src} 
          position={positions[index]} 
          rotation={[0, (index % 2 === 0 ? 0.1 : -0.1), (index % 2 === 0 ? -0.05 : 0.05)]} 
          navigate={navigate}
        />
      ))}
    </group>
  );
}

// Background Theme Component
function BackgroundTheme() {
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group position={[0, 0, -20]}>
      {/* Infinite architectural grid pushed deeper */}
      <Grid 
        position={[0, -15, 0]} 
        args={[100, 100]} 
        cellSize={1} 
        cellThickness={1.5} 
        cellColor="#000000" 
        sectionSize={5} 
        sectionThickness={2} 
        sectionColor="#a0a0a0" 
        fadeDistance={60} 
        fadeStrength={1.5} 
      />
      
      {/* Brutalist massive floating wireframe */}
      <mesh ref={wireframeRef} position={[0, 5, -10]}>
        <icosahedronGeometry args={[20, 0]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  const navigate = useNavigate();

  // Highly performant motion values for the custom cursor (doesn't trigger React re-renders)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 400 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-auto"
      onMouseMove={(e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
        {/* F0F0F0 matches the brutalist light gray background */}
        <color attach="background" args={['#F0F0F0']} />
        <fog attach="fog" args={['#F0F0F0', 10, 50]} />
        
        <ambientLight intensity={1} />
        <BackgroundTheme />
        <Suspense fallback={null}>
          <PhotoWall navigate={navigate} />
        </Suspense>

        {/* Cinematic Depth of Field with Dynamic Focus */}
        <EffectComposer>
          <DoFController />
        </EffectComposer>
      </Canvas>

      {/* Brutalist "Check out" Cursor Overlay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 bg-primary-yellow text-black font-black uppercase px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_black] text-sm tracking-widest whitespace-nowrap"
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovering ? 1 : 0, 
          scale: isHovering ? 1 : 0.8,
          // Offset the cursor bubble slightly so it doesn't hide the actual mouse pointer
          marginLeft: '20px',
          marginTop: '20px'
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        Check out
      </motion.div>
    </div>
  );
}
