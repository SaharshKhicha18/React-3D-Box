import React, {useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import {Physics, useBox, usePlane} from '@react-three/cannon';
import { BoxBufferGeometry} from 'three';
import './App.css'

function Box(props) {
  const [ref, api] = useBox(() => ( {mass:1, position: [0,2,0] }));
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  
  return (
    <mesh position={[0, 2, 0]}
      {...props}
      ref={ref}
      scale={active ? 2 : 1}
      onClick={() => setActive(!active), api.velocity.set(0,4,0)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'magenta' : 'purple'} />
    </mesh>
  )
}

function Plane(){
  const [ref] = usePlane(() => ({rotation: [-Math.PI/2,0,0]}));
  return(
    <mesh position={[0,0,0]} rotation = {[-Math.PI/2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]}/>
      <meshLambertMaterial attach='material' color = 'white'/>
    </mesh>
  )
}

export default function App() {
  return (
  <Canvas>
    <ambientLight />
    <Stars />
    <OrbitControls />
    <pointLight position={[10, 10, 10]} />
    <Physics>
      <Box />
      <Box />
      <Plane />
    </Physics>
  </Canvas>
  );
}

