import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from "use-cannon"
import { OrbitControls, Sky } from "drei"

import "./styles.css";

import Lights from "./Lights"
import Rabbit from "./Rabbit"
import Grass from "./Grass"

export default function App() {
  return (
    <Canvas camera={{
      position: [10, 10, 15],
      fov: 50
    }} shadowMap >
      <OrbitControls />
      <Sky />
      <fog attach="fog" args={["white", 20, 70]} />
      <Lights />
      <Physics
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 0.1,
          restitution: 0.1,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
        gravity={[0, -10, 0]}
      >
        <Rabbit position={[0, -9, 0]} />
        <Grass position={[0, -10, 0]} />
      </Physics>
    </Canvas >
  )
}