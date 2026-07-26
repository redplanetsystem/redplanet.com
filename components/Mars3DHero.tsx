'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, MeshDistortMaterial, Sphere, Ring } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Rotating Mars Core with Atmospheric Distortion and Orbital Ring
function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Outer Atmospheric Aura */}
      <Sphere args={[1.85, 64, 64]}>
        <meshBasicMaterial color="#ff3300" transparent opacity={0.12} side={THREE.BackSide} />
      </Sphere>

      {/* Main Distorted Martian Sphere */}
      <Sphere ref={meshRef} args={[1.7, 128, 128]}>
        <MeshDistortMaterial
          color="#ff3300"
          attach="material"
          distort={0.35}
          speed={1.4}
          roughness={0.55}
          metalness={0.3}
          emissive="#ff3300"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Orbital Satellite Relay Ring (Node 08) */}
      <Ring ref={ringRef} args={[2.4, 2.45, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.4} />
      </Ring>
    </group>
  );
}

export default function Mars3DHero() {
  // Live Satellite & Mars News Telemetry Ticker State
  const [marsNews, setMarsNews] = useState<string>(
    'Orbital Relay 08: Synchronizing Martian atmosphere telemetry & cinematic music feeds for Elon Musk & early pioneers.'
  );

  useEffect(() => {
    const newsHeadlines = [
      'Orbital Relay 08: Atmospheric pressure stabilizing at 710 Pa. Mars music syndication active.',
      'Elon Musk Roadmap: Red Planet engineering the sovereign sonic architecture for human settlement.',
      'RedPlanet.tv Live: Broadcasting cinematic tracks across 180+ countries and interplanetary nodes.',
      'Autonomous Trading & Satellite Uplink: Expert Sniper Pro v2 monitoring global financial and space assets.'
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % newsHeadlines.length;
      setMarsNews(newsHeadlines[index]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[580px] rounded-3xl overflow-hidden border border-white/15 glass-panel shadow-2xl flex flex-col justify-between p-6">
      
      {/* Top Overlay: Mission Status & Elon Musk / Mars Vision Header */}
      <div className="absolute top-6 left-6 right-6 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-2xl border border-white/10 font-mono text-xs backdrop-blur-xl">
          <div className="text-marsRed font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-marsRed animate-ping" />
            MARS COLONIZATION INITIATIVE
          </div>
          <div className="text-neutral-300 text-[10px] mt-0.5">Fulfilling Elon Musk’s Dream — Powered by Deblaq & Win</div>
        </div>

        <div className="glass-panel px-4 py-2 rounded-2xl border border-white/10 font-mono text-xs text-right backdrop-blur-xl hidden md:block">
          <div className="text-neonCyan font-bold">ORBITAL RELAY NODE 08</div>
          <div className="text-neutral-300 text-[10px] mt-0.5">Atmosphere: -63°C | Wind: 12 m/s</div>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#ff3300" />
            <pointLight position={[-5, -3, -5]} intensity={1.0} color="#00f0ff" />

            <Planet />

            <Sparkles count={150} scale={8} size={2.8} speed={0.4} color="#00f0ff" />
            <Stars radius={50} depth={35} count={3000} factor={2} fade speed={0.6} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.9}
              maxPolarAngle={Math.PI / 1.6}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Overlay: Live Satellite Mars News & Gateway Callout */}
      <div className="relative z-10 mt-auto flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 pointer-events-auto">
        <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10 font-mono text-xs max-w-xl backdrop-blur-xl space-y-1">
          <div className="text-[10px] text-neonCyan uppercase tracking-widest font-bold flex items-center gap-1.5">
            <span>📡</span> Live Satellite News Feed (Mars & Earth):
          </div>
          <p className="text-neutral-200 text-xs font-sans line-clamp-1">{marsNews}</p>
        </div>

        <div className="glass-panel px-4 py-3 rounded-2xl border border-marsRed/40 font-mono text-xs text-center backdrop-blur-xl bg-marsRed/10">
          <div className="text-white font-bold uppercase">Want to Go to Mars?</div>
          <div className="text-[10px] text-neutral-300">You have to pass through us. Founders: Deblaq & Win</div>
        </div>
      </div>
    </div>
  );
}