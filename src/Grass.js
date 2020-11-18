import React, { Suspense } from 'react'
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "use-cannon"


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

  const gltf = useLoader(GLTFLoader, "/models/grass/grass.gltf")
  const [ref] = useBox(() => ({ type: "Static", position, args: [40, 0.2, 40], onCollide: e => console.log(e.contact.impactVelocity) }))
  return (
    <mesh ref={ref} scale={[4, 4, 4]} receiveShadow>
      {/* <boxBufferGeometry attach="geometry" args={[10, 0.1, 10]} /> */}
      <meshPhongMaterial attach="material" color="#cc0000" opacity={0.1} />
      <primitive object={gltf.scene}
        recieveShadow
        position={[position[0], position[1], position[2]]}
        scale={[0.62, 0.62, 0.62]} >
      </primitive>
    </mesh>
  )
}

export default function Grass({ position }) {
  return (
    <Suspense fallback={<Loading />}>
      <Model position={position} />
    </Suspense>
  );
}

