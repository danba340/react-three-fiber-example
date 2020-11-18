import React, { useEffect, useState, useRef } from 'react'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { Physics, useBox } from "use-cannon"
import { OrbitControls, Sky } from "drei"

import "./styles.css";

import Lights from "./Lights"
import Rabbit from "./Rabbit"
import Grass from "./Grass"

export default function App() {
  return (
    <Canvas camera={{
      position: [10, 10, 15]
    }} shadowMap >
      <OrbitControls />
      <Sky />
      <fog attach="fog" args={["white", 20, 70]} />
      <Lights />
      <Physics
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 1,
          restitution: 0.5,
          // contactEquationStiffness: 1e7,
          // contactEquationRelaxation: 1,
          // frictionEquationStiffness: 1e7,
          // frictionEquationRelaxation: 2,
        }}
        gravity={[0, -10, 0]}
      >
        <Rabbit position={[0, 0, 0]} />
        <Grass position={[0, -10, 0]} />
      </Physics>
    </Canvas >
  )
}