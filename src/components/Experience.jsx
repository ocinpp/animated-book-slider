import { Environment, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";
import * as THREE from "three";
import { useSetAtom, useAtomValue } from "jotai";
import { orbitControlsAtom, targetPositionAtom } from "./OrbitControls";
import { useEffect, useRef, useFrame } from "react";

export const Experience = () => {
  const setControls = useSetAtom(orbitControlsAtom);
  const targetPosition = useAtomValue(targetPositionAtom);
  const controlsRef = useRef();

  // Update the atom with the controls reference
  useEffect(() => {
    setControls((prev) => ({ ...prev, controlsRef }));
  }, []);

  return (
    <>
      <Book />
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableRotate={false}
        maxDistance={5}
        minDistance={1.5}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
      <Environment preset="studio" environmentIntensity={0.5}></Environment>
      <directionalLight
        position={[0, 1, 0]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
    </>
  );
};
