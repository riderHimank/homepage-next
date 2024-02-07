"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import RoomScene from "./components/RoomScene_2";
import { motion } from "framer-motion";
import TWEEN from "@tweenjs/tween.js";

const marks = [
  {
    key: "A",
    title: "EVENTS",
    description: "Laptop Screen",
    camPos: {
      x: -4.3,
      y: 1.2,
      z: -2.5,
    },
    lookAt: {
      x: -4.3,
      y: 1,
      z: -5,
    },
    pos: {
      x: -4.255,
      y: 1.55,
      z: -3.5,
    },
    textAt: {
      x: -5.25,
      y: 2.3,
      z: -5,
    },
  },
  {
    key: "B",
    title: "QR",
    description: "QR code is here",
    camPos: {
      x: -4.2,
      y: 1.2,
      z: -2.5,
    },
    lookAt: {
      x: -6.5,
      y: -0.2,
      z: -4.5,
    },
    pos: {
      x: -4.87,
      y: 1.26,
      z: -3.3,
    },
    textAt: {
      x: -10,
      y: 0,
      z: -4.5,
    },
  },
  // {
  //   key: "C",
  //   title: "Tablet",
  //   description: "Theme Video Playing",
  //   camPos: {
  //     x: -4,
  //     y: 2,
  //     z: -2.3,
  //   },
  //   lookAt: {
  //     x: -7,
  //     y: -0.5,
  //     z: -2.3,
  //   },
  //   pos: {
  //     x: -5.5,
  //     y: 1.45,
  //     z: -2.1,
  //   },
  //   textAt: {
  //     x: -7.5,
  //     y: 1.3,
  //     z: -1.15,
  //   },
  // },
  {
    key: "D",
    title: "Calendar",
    description: "xyz days to go!",
    camPos: {
      x: -4.5,
      y: 2,
      z: -1.5,
    },
    lookAt: {
      x: -8,
      y: 1.85,
      z: -1.5,
    },
    pos: {
      x: -5.9,
      y: 2.05,
      z: -1.65,
    },
    textAt: {
      x: -7.5,
      y: 2.6,
      z: -2.5,
    },
  },
  {
    key: "E",
    title: "Kartavya",
    description: "Kartavya Trophy",
    camPos: {
      x: -3.2,
      y: 2,
      z: -2,
    },
    lookAt: {
      x: -2.5,
      y: 2,
      z: -3,
    },
    pos: {
      x: -3.18,
      y: 2.25,
      z: -3.4,
    },
    textAt: {
      x: -3.55,
      y: 3,
      z: -5,
    },
  },
  {
    key: "F",
    title: "Merch",
    description: "ALcher Merch",
    camPos: {
      x: -4,
      y: 2,
      z: 0.8,
    },
    lookAt: {
      x: -5,
      y: 1.85,
      z: 0.3,
    },
    pos: {
      x: -5.5,
      y: 2,
      z: 0,
    },
    textAt: {
      x: -8,
      y: 1.9,
      z: 2,
    },
  },
  {
    key: "G",
    title: "Sponsor",
    description: "Piggy Bank",
    camPos: {
      x: -3,
      y: 1,
      z: 0.1,
    },
    lookAt: {
      x: -5,
      y: 1,
      z: 0.1,
    },
    pos: {
      x: -5.5,
      y: 0.9,
      z: -0.2,
    },
    textAt: {
      x: -8,
      y: 1.2,
      z: 4.5,
    },
  },
  {
    key: "H",
    title: "Teams",
    description: "Id Card",
    camPos: {
      x: -3.8,
      y: 1.66,
      z: -2.4,
    },
    lookAt: {
      x: -3.62,
      y: 1.56,
      z: -5,
    },
    pos: {
      x: -3.7,
      y: 1.66,
      z: -3.7,
    },
    textAt: {
      x: -3.62,
      y: 1.66,
      z: -3.4,
    },
  },
  {
    key: "I",
    title: "MUN",
    description: "Microphone",
    camPos: {
      x: -3.8,
      y: 1.2,
      z: -2.4,
    },
    lookAt: {
      x: -3.8,
      y: 1.2,
      z: -5.4,
    },
    pos: {
      x: -4.05,
      y: 1.05,
      z: -3,
    },
    textAt: {
      x: -3.7,
      y: 1,
      z: -3.4,
    },
  },
  {
    key: "J",
    title: "Photo",
    description: "Photoframe",
    camPos: {
      x: -2.5,
      y: 1.35,
      z: -2,
    },
    lookAt: {
      x: -2.5,
      y: 1.35,
      z: -3,
    },
    pos: {
      x: -2.7,
      y: 1.35,
      z: -3.4,
    },
    textAt: {
      x: -3,
      y: 0.7,
      z: -5,
    },
  },
];

//a component creating a button as of now!
function Annotations({ controls }) {
  const { camera } = useThree();
  const [selected, setSelected] = useState("");
  const [backtrack, setBackTrack] = useState(false);

  const handleReturn = (e) => {
    setSelected("");
    const targetX = -3.5;
    const targetY = 1.4;
    const targetZ = -1.8;

    const camPosX = -2;
    const camPosY = 1.5;
    const camPosZ = -1;

    // change target
    new TWEEN.Tween(controls.current.target)
      .to(
        {
          x: targetX,
          y: targetY,
          z: targetZ,
        },
        3000
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    // change camera position
    new TWEEN.Tween(camera.position)
      .to(
        {
          x: camPosX,
          y: camPosY,
          z: camPosZ,
        },
        3000
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    setBackTrack(!backtrack);
    setTimeout(() => {
      controls.current.enabled = backtrack;
    }, 10);
  };

  return (
    <React.Fragment>
      {marks.map((a, i) => {
        return (
          <>
            <Html key={a.key} position={[a.pos.x, a.pos.y, a.pos.z]}>
              {!backtrack && (
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                  height="34"
                  width="34"
                  transform="translate(-13 -13)"
                  style={{ cursor: "pointer" }}
                  onPointerUp={() => {
                    // console.log(controls.current);
                    // controls.current.enableDamping = false;
                    setSelected(a.key);
                    const isSameAnnotation = a.key === selected;
                    setBackTrack(isSameAnnotation ? false : true);
                    const targetX = isSameAnnotation ? -3.5 : a.lookAt.x;
                    const targetY = isSameAnnotation ? 1.4 : a.lookAt.y;
                    const targetZ = isSameAnnotation ? -1.8 : a.lookAt.z;

                    const camPosX = isSameAnnotation ? -2 : a.camPos.x;
                    const camPosY = isSameAnnotation ? 1.5 : a.camPos.y;
                    const camPosZ = isSameAnnotation ? -1 : a.camPos.z;

                    // change target
                    new TWEEN.Tween(controls.current.target)
                      .to(
                        {
                          x: targetX,
                          y: targetY,
                          z: targetZ,
                        },
                        3000
                      )
                      .easing(TWEEN.Easing.Cubic.Out)
                      .start();

                    // change camera position
                    new TWEEN.Tween(camera.position)
                      .to(
                        {
                          x: camPosX,
                          y: camPosY,
                          z: camPosZ,
                        },
                        3000
                      )
                      .easing(TWEEN.Easing.Cubic.Out)
                      .start();
                    setSelected(backtrack ? -1 : a.key);
                    setTimeout(() => {
                      controls.current.enabled = false;
                    }, 3100);
                    // console.log(controls.current);
                  }}
                >
                  {
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M12.75 3.03109C14.1423 2.22724 15.8577 2.22724 17.25 3.03109L24.2404 7.06699C25.6327 7.87083 26.4904 9.35641 26.4904 10.9641V19.0359C26.4904 20.6436 25.6327 22.1292 24.2404 22.933L17.25 26.9689C15.8577 27.7728 14.1423 27.7728 12.75 26.9689L5.75962 22.933C4.36731 22.1292 3.50962 20.6436 3.50962 19.0359V10.9641C3.50962 9.35641 4.36731 7.87083 5.75962 7.06699L12.75 3.03109Z"
                          stroke="white"
                          strokeWidth="3"
                        />
                        <path
                          d="M19 15.5714H15.5714V19H14.4286V15.5714H11V14.4286H14.4286V11H15.5714V14.4286H19V15.5714Z"
                          fill="white"
                        />
                      </svg>
                    </>
                  }
                </motion.svg>
              )}
            </Html>
            <Html key={i} position={[a.textAt.x, a.textAt.y, a.textAt.z]}>
              {a.key === selected && backtrack && (
                <>
                  <motion.div
                    className="blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                  >
                    <motion.div
                      className="title"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 3 }}
                      style={{ color: "white", fontSize: 48 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="32"
                        viewBox="0 0 29 32"
                        fill="none"
                      >
                        <path
                          d="M14.5 0.5L16.5506 13.808L29 16L16.5506 18.192L14.5 31.5L12.4494 18.192L0 16L12.4494 13.808L14.5 0.5Z"
                          fill="white"
                        />
                      </svg>
                      {a.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="32"
                        viewBox="0 0 29 32"
                        fill="none"
                      >
                        <path
                          d="M14.5 0.5L16.5506 13.808L29 16L16.5506 18.192L14.5 31.5L12.4494 18.192L0 16L12.4494 13.808L14.5 0.5Z"
                          fill="white"
                        />
                      </svg>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                      style={{ color: "white", fontSize: 20 }}
                    >
                      {a.description}
                    </motion.p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                    className="return"
                    onClick={handleReturn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M21.333 9.70835V12.2917H5.83305L12.9372 19.3959L11.103 21.23L0.873047 11L11.103 0.77002L12.9372 2.60419L5.83305 9.70835H21.333Z"
                        fill="white"
                      />
                    </svg>
                  </motion.button>
                </>
              )}
            </Html>
          </>
        );
      })}
    </React.Fragment>
  );
}

function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
}

export default function App() {
  const ref = useRef();
  return (
    <Canvas
      camera={{
        fov: 70,
        position: [-2, 1.5, -1],
        zoom: 1,
      }}
      shadows
    >
      <OrbitControls
        ref={ref}
        target={[-3.5, 1.4, -1.8]}
        enableZoom={false}
        enableDamping={true}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        dampingFactor={0.02}
        enabled={true}
      />
      <ambientLight intensity={1.5} />
      <Annotations controls={ref} />
      <RoomScene></RoomScene>
      {/* <axesHelper args={[20, 20, 20]} /> */}
      <Tween />
    </Canvas>
  );
}
