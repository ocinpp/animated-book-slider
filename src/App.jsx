import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <UI />
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [0, -0.5, window.innerWidth > 800 ? 4 : 9],
          fov: window.innerWidth > 800 ? 35 : 60,
        }}
      >
        <group position-y={0} position-x={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
