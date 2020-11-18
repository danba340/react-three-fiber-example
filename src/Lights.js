export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        intensity={0.5} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
    </>
  )
}