import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { config, useSpring, animated } from "@react-spring/three";

function Box(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame(() => (ref.current.rotation.x += 0.005));

  const { scale } = useSpring({
    scale: clicked ? [2, 2, 2] : [1, 1, 1],
    config: config.molasses ,
  });

  return (
    <animated.mesh
      {...props}
      ref={ref}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </animated.mesh>
  );
}

function App() {
  return (
    <>
      <h1>Mugi's Three.js App'</h1>
      <div id="canvas-container">
        <Canvas>
          <Box position={[-1.6, 0, 0]} />
          <Box position={[1.6, 0, 0]} />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
