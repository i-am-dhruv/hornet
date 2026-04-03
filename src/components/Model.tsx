"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { MathUtils } from "three";
import type { Group } from "three";

const MODEL_URL = "https://files.catbox.moe/o60blw.glb";

export function Model(props: JSX.IntrinsicElements["group"]) {
  const groupRef = useRef<Group>(null!);
  const { scene } = useGLTF(MODEL_URL);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      useGLTF.preload(MODEL_URL);
    }
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Smooth hover scale animation
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.set(
        MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 10),
        MathUtils.lerp(groupRef.current.scale.y, targetScale, delta * 10),
        MathUtils.lerp(groupRef.current.scale.z, targetScale, delta * 10)
      );
    }
  });

  return (
    <group 
      ref={groupRef} 
      {...props} 
      dispose={null}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <primitive object={scene} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}
