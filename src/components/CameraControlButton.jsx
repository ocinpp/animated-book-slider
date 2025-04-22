import { useSetAtom } from "jotai";
import { setCameraPositionAtom } from "./OrbitControls";

function CameraControlButton() {
  const setCameraPosition = useSetAtom(setCameraPositionAtom);

  return (
    <button
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        color: "red",
        zIndex: 100,
      }}
      onClick={() => setCameraPosition({ x: 0, y: -0.5, z: 4 })}
    >
      Reset Camera
    </button>
  );
}

export default CameraControlButton;
