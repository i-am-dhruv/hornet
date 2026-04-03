"use client";

import { useEffect, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Environment, useTexture } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { Model } from "./Model";
import { Butterfly } from "./Butterfly";
import { Loader } from "./Loader";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const { camera, scene } = useThree();
  const normalMap = useTexture('https://threejs.org/examples/textures/waternormals.jpg');
  if (normalMap) {
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  }

  useEffect(() => {
    camera.position.set(0, 0, 4.5);
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
    camera.lookAt(lookAtTarget);

    // Initial states for all 10 butterflies - slightly more contained starting positions
    const bStates = {
      b1: { x: -6, y: 2, z: -2, rx: 0, ry: 0, rz: 0 },
      b2: { x: 6, y: -1, z: -3, rx: 0, ry: 0, rz: 0 },
      b3: { x: -4, y: -3, z: -1, rx: 0, ry: 0, rz: 0 },
      b4: { x: 3, y: 4, z: -4, rx: 0, ry: 0, rz: 0 },
      b5: { x: -7, y: 0, z: 1, rx: 0, ry: 0, rz: 0 },
      w1: { x: -8, y: 5, z: -3, rx: 0, ry: 0, rz: 0 },
      w2: { x: 8, y: 5, z: -3, rx: 0, ry: 0, rz: 0 },
      w3: { x: -8, y: -5, z: -3, rx: 0, ry: 0, rz: 0 },
      w4: { x: 8, y: -5, z: -3, rx: 0, ry: 0, rz: 0 },
      w5: { x: 0, y: 6, z: -6, rx: 0, ry: 0, rz: 0 },
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Camera Moves
    tl.to(camera.position, { x: -3, y: 1, z: 4.5, ease: "sine.inOut", duration: 2 }, 0)
      .to(camera.position, { x: 4, y: -1, z: 6, ease: "sine.inOut", duration: 2 }, 2)
      .to(camera.position, { x: 0, y: 0.5, z: 5, ease: "sine.inOut", duration: 2 }, 4);

    tl.to(lookAtTarget, { x: 0.4, y: 0.6, z: 0, ease: "sine.inOut", duration: 2 }, 0)
      .to(lookAtTarget, { x: -0.4, y: -0.6, z: 0, ease: "sine.inOut", duration: 2 }, 2)
      .to(lookAtTarget, { x: 0, y: 0, z: 0, ease: "sine.inOut", duration: 2 }, 4);

    // Flight Paths for Butterflies
    tl.to(bStates.b1, { x: 8, y: -1, z: 2, ry: -3, duration: 2, ease: "sine.inOut" }, 0)
      .to(bStates.b1, { x: -10, y: 3, z: 4, ry: 2, duration: 2, ease: "sine.inOut" }, 2)
      .to(bStates.b1, { x: 0, y: 0, z: 0, ry: 0, duration: 1 }, 4);
      
    tl.to(bStates.b2, { x: -8, y: 6, z: 1, ry: 4, duration: 2, ease: "sine.inOut" }, 0.5)
      .to(bStates.b2, { x: 10, y: -6, z: -2, ry: -2, duration: 2, ease: "sine.inOut" }, 2.5);
      
    tl.to(bStates.b3, { x: 6, y: -4, z: 4, ry: -2, duration: 2, ease: "sine.inOut" }, 0.2)
      .to(bStates.b3, { x: -6, y: 5, z: -3, ry: 5, duration: 2, ease: "sine.inOut" }, 2.2);
      
    tl.to(bStates.b4, { x: -10, y: -2, z: 1, ry: 6, duration: 2.5, ease: "sine.inOut" }, 0)
      .to(bStates.b4, { x: 10, y: 4, z: -1, ry: -6, duration: 2, ease: "sine.inOut" }, 2.5);
      
    tl.to(bStates.b5, { x: 8, y: 1, z: 6, ry: -2, duration: 1.5, ease: "sine.inOut" }, 1)
      .to(bStates.b5, { x: -12, y: -8, z: -8, ry: 4, duration: 2, ease: "sine.inOut" }, 3);

    tl.to(bStates.w1, { x: 10, y: -4, z: 1, ry: -3, duration: 2, ease: "sine.inOut" }, 0)
      .to(bStates.w1, { x: -10, y: 8, z: -3, ry: 4, duration: 2 }, 3);
      
    tl.to(bStates.w2, { x: -10, y: -4, z: 1, ry: 3, duration: 2, ease: "sine.inOut" }, 0.5)
      .to(bStates.w2, { x: 10, y: 8, z: -3, ry: -4, duration: 2 }, 3.5);
      
    tl.to(bStates.w3, { x: 12, y: 0, z: 3, ry: -4, duration: 2, ease: "sine.inOut" }, 1)
      .to(bStates.w3, { x: -12, y: -6, z: -6, ry: 3, duration: 2 }, 4);
      
    tl.to(bStates.w4, { x: -12, y: 0, z: 3, ry: 4, duration: 2, ease: "sine.inOut" }, 1.5)
      .to(bStates.w4, { x: 12, y: -6, z: -6, ry: -3, duration: 2 }, 4.5);
      
    tl.to(bStates.w5, { x: 0, y: -1, z: 4, ry: 6, duration: 2.5, ease: "sine.inOut" }, 1)
      .to(bStates.w5, { x: 0, y: 10, z: -8, ry: -6, duration: 2 }, 3.5);

    const updateScene = () => {
      camera.lookAt(lookAtTarget);
      
      ["b1", "b2", "b3", "b4", "b5", "w1", "w2", "w3", "w4", "w5"].forEach(name => {
        const obj = scene.getObjectByName(name);
        if (obj) {
          const state = bStates[name as keyof typeof bStates];
          obj.position.set(state.x, state.y, state.z);
          obj.rotation.set(state.rx || 0, state.ry || 0, state.rz || 0);
        }
      });
    };

    tl.eventCallback("onUpdate", updateScene);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera, scene]);

  useFrame((state, delta) => {
    if (normalMap) {
      normalMap.offset.x += delta * 0.01;
      normalMap.offset.y += delta * 0.005;
    }
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={['#000000', 10, 25]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, 5, 5]} intensity={2.5} color="#9b2a3d" />
      <pointLight position={[5, -5, -5]} intensity={1.5} color="#4CC6F1" />
      <Environment preset="night" />
      
      <Suspense fallback={<Loader />}>
        <Model position={[0, -1, 0]} scale={1.4} />
        
        <Butterfly name="b1" position={[-6, 2, -2]} scale={0.15 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="b2" position={[6, -1, -3]} scale={0.12 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="b3" position={[-4, -3, -1]} scale={0.1 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="b4" position={[3, 4, -4]} scale={0.13 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="b5" position={[-7, 0, 1]} scale={0.18 * 2} glowColor="#4CC6F1" glowIntensity={8} />

        <Butterfly name="w1" position={[-8, 5, -3]} scale={0.14 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="w2" position={[8, 5, -3]} scale={0.14 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="w3" position={[-8, -5, -3]} scale={0.14 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="w4" position={[8, -5, -3]} scale={0.14 * 2} glowColor="#4CC6F1" glowIntensity={8} />
        <Butterfly name="w5" position={[0, 6, -6]} scale={0.16 * 2} glowColor="#4CC6F1" glowIntensity={8} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.3, 0]}>
          <planeGeometry args={[500, 500]} />
          <MeshReflectorMaterial
              resolution={1024}
              mixBlur={0}
              mixStrength={15}
              roughness={0}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#080808"
              metalness={0.9}
              normalMap={normalMap}
              normalScale={[0.15, 0.15]}
          />
        </mesh>

      </Suspense>

      <EffectComposer disableNormalPass>
        <Bloom intensity={0.8} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        <ChromaticAberration blendFunction={BlendFunction.SCREEN} offset={[0.0008, 0.0008]} />
        <Noise opacity={0.04} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
    </>
  );
}

export default function ModelViewerClient() {
  return (
    <div className="relative h-full w-full">
      <Canvas 
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }} 
        className="h-full w-full" 
        shadows 
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
