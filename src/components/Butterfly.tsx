"use client";

import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ButterflyProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  name?: string;
  glowColor?: string;
  glowIntensity?: number;
}

export function Butterfly({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0], 
  name,
  glowColor = "#4CC6F1",
  glowIntensity = 8
}: ButterflyProps) {
  const group = useRef<THREE.Group>(null!);
  const hoverGroup = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF("https://files.catbox.moe/xi5x9o.glb");
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.emissive = new THREE.Color(glowColor);
          material.emissiveIntensity = glowIntensity;
          material.toneMapped = false;
        }
      }
    });
    return clone;
  }, [scene, glowColor, glowIntensity]);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      if (firstAction) {
        firstAction.play();
        // Offset the animation start so they aren't perfectly in sync
        firstAction.time = Math.random() * firstAction.getClip().duration;
      }
    }
  }, [actions]);

  useFrame((state) => {
    if (hoverGroup.current) {
      const t = state.clock.getElapsedTime();
      
      // Unique seed based on initial position so they don't hover in perfect sync
      const seed = position[0] + position[1] + position[2];
      
      // Pronounced idle floating animation (Independent of scroll)
      hoverGroup.current.position.y = Math.sin(t * 1.2 + seed) * 0.25;
      hoverGroup.current.position.x = Math.cos(t * 0.8 + seed) * 0.15;
      hoverGroup.current.position.z = Math.sin(t * 1.5 + seed) * 0.1;
      
      // Gentle swaying rotation
      hoverGroup.current.rotation.z = Math.sin(t * 0.5 + seed) * 0.15;
      hoverGroup.current.rotation.x = Math.cos(t * 0.4 + seed) * 0.1;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation} name={name} dispose={null}>
      <group ref={hoverGroup}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload("https://files.catbox.moe/xi5x9o.glb");
