import React, { Suspense, useState } from 'react'
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "use-cannon"

import { useKey } from "./useKey"

function Loading() {
  return (
    <mesh visible position={[0, 2, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Model({ position }) {
  const pressedS = useKey("s")
  const [frameCount, setFrameCount] = useState(0);
  const gltf = useLoader(GLTFLoader, "/models/rabbit/rabbit.gltf")
  const [ref, api] = useBox(() => ({ position, mass: 0.1, args: [0.5, 1, 0.5], onCollide: e => console.log(e.contact.impactVelocity) }))
  useFrame(state => {
    setFrameCount((prev) => {
      return prev + 1
    })
    if (frameCount > 100) {
      api.velocity.set(0, 2, 2)
      setFrameCount(0)
    }
    if (pressedS) {
      console.log(state)
      api.velocity.set(0, 2, 2)
    }
    api.rotation.set(0, 0, 0)
  })
  return (
    <mesh ref={ref} name={"rabbit"} castShadow opacity={0.5} >
      {/* <boxBufferGeometry attach="geometry"
        args={[2, 2, 2]}
      />
      <meshPhongMaterial attach="material" color="#0000cc" opacity={0.1} /> */}
      <primitive castShadow object={gltf.scene}>
      </primitive>
    </mesh>
  )
}

export default function Rabbit({ position }) {
  return (
    <Suspense fallback={<Loading />}>
      <Model position={position} />
    </Suspense>
  );
}

