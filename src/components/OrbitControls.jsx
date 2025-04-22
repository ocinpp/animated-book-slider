import { atom } from "jotai";
import * as THREE from "three";

// Atom to store the OrbitControls reference and camera position setter
export const orbitControlsAtom = atom({
  controlsRef: null,
});

// Atom for smooth transitions (optional, used in the smooth transition example)
export const targetPositionAtom = atom(null);

export const setCameraPositionAtom = atom(null, (get, set, { x, y, z }) => {
  const { controlsRef } = get(orbitControlsAtom);
  const controls = controlsRef?.current;
  if (controls) {
    const camera = controls.object; // Access the camera
    camera.position.set(x, y, z); // Set new position
    controls.target.set(0, 0, 0); // Set target position
    controls.update(); // Update OrbitControls
  }
});
