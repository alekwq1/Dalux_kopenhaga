import {
  Environment,
  useScroll,
  Float,
  Center,
  MeshDistortMaterial,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { useFrame } from "@react-three/fiber";
import { config } from "../config";
import { BAM } from "./BAM";
import { Znak_Zapytania } from "./Znak_Zapytania";
import { PytanieZolte } from "./PytanieZolte";
import { MacBookPro } from "./MacBookPro";
import { WindTurbineAnimated } from "./WindTurbineAnimated";
import * as THREE from "three";
import { Monitor } from "./Monitor";
import { ParkBench } from "./ParkBench";
import { Balloon } from "./Balloon";
import { Mailbox } from "./Mailbox";
import { Pigeon } from "./Pigeon";
import { motion } from "framer-motion-3d";
import { CAR } from "./CAR";
import { Latarka_MAPA } from "./Latarka_MAPA";
import { Mapa_Pineska_Duza } from "./Mapa_Pineska_Duza";
import { PetrolStation } from "./PetrolStation";

const SECTIONS_DISTANCE = 10;

export const Experience = () => {
  const [section, setSection] = useState(config.sections[0]);

  const sceneContainer = useRef();
  const scrollData = useScroll();

  useFrame(() => {
    sceneContainer.current.position.z =
      -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
    setSection(
      config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))]
    );
  });
  return (
    <>
      <Environment preset="sunset" />
      <Avatar currentSection={section} /> {/* <— przekazujemy nazwę sekcji */}
      {/* SHADOWS & FLOOR */}
      <ContactShadows opacity={0.5} scale={[30, 30]} color="#9c8e66" />
      <mesh position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#f5f3ee" />
      </mesh>
      <motion.group ref={sceneContainer} animate={section}>
        {/*HOME*/}
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0,
            },
          }}
        >
          <Float floatIntensity={2} speed={2}>
            <Znak_Zapytania
              position-z={0}
              position-y={2.4}
              scale={0.5}
              rotation={[
                THREE.MathUtils.degToRad(0), // oś X
                THREE.MathUtils.degToRad(270), // oś Y
                THREE.MathUtils.degToRad(0), // oś Z
              ]}
            />

            <Float floatIntensity={2} speed={2}></Float>
            <PytanieZolte
              position-z={1}
              position-y={2.4}
              position-x={1.4}
              scale={0.5}
              rotation={[
                THREE.MathUtils.degToRad(0), // oś X
                THREE.MathUtils.degToRad(270), // oś Y
                THREE.MathUtils.degToRad(0), // oś Z
              ]}
            />

            <Float floatIntensity={2} speed={2}></Float>
            <PytanieZolte
              position-z={1}
              position-y={1.4}
              position-x={-1.4}
              scale={0.5}
              rotation={[
                THREE.MathUtils.degToRad(0), // oś X
                THREE.MathUtils.degToRad(270), // oś Y
                THREE.MathUtils.degToRad(0), // oś Z
              ]}
            />

            <Float floatIntensity={2} speed={2}></Float>
            <MacBookPro
              position-x={-1}
              position-y={0.5}
              position-z={0}
              scale={0.3}
              rotation-y={Math.PI / 4}
            />
          </Float>

          <WindTurbineAnimated
            url="/models/wiatrak.glb"
            speed={0.3}
            playing={true}
            cutStart={0.035}
            cutEnd={0.0}
            position={[4, 0, -5]}
            rotation-y={THREE.MathUtils.degToRad(0)}
            scale={0.2}
          />
          <BAM
            position-x={1.5}
            position-y={0.5}
            position-z={0}
            scale={1.5}
            rotation={[
              THREE.MathUtils.degToRad(0), // oś X
              THREE.MathUtils.degToRad(270), // oś Y
              THREE.MathUtils.degToRad(0), // oś Z
            ]}
          />
          <Float floatIntensity={0.6}>
            <Center disableY disableZ>
              <SectionTitle
                size={0.8}
                position-y={1.6}
                position-z={-3}
                bevelEnabled
                bevelThickness={0.3}
              >
                {config.home.title}
              </SectionTitle>
            </Center>
          </Float>
          <Center disableY disableZ>
            <SectionTitle
              size={1.2}
              position-x={-2.6}
              position-z={-3}
              bevelEnabled
              bevelThickness={0.3}
              rotation-y={Math.PI / 10}
            >
              {config.home.subtitle}
            </SectionTitle>
          </Center>
        </motion.group>
        {/*SKILLS*/}
        <motion.group
          position-z={SECTIONS_DISTANCE}
          position-y={-5}
          variants={{ skills: { y: 0 } }}
        >
          <group position-x={-2}>
            <SectionTitle
              position-z={1.9}
              position-x={2.7}
              position-y={0}
              rotation={[
                THREE.MathUtils.degToRad(0), // oś X
                THREE.MathUtils.degToRad(10), // oś Y
                THREE.MathUtils.degToRad(0), // oś Z
              ]}
            >
              PAPERMAPS
            </SectionTitle>

            <CAR
              scale={2.5}
              position-z={1}
              position-x={0}
              position-y={0.55}
              rotation={[
                THREE.MathUtils.degToRad(0), // oś X
                THREE.MathUtils.degToRad(-50), // oś Y
                THREE.MathUtils.degToRad(0), // oś Z
              ]}
            />

            <Float floatIntensity={1} speed={1.2} rotationIntensity={0.3}>
              <Mapa_Pineska_Duza
                scale={1}
                position-z={1.8}
                position-x={4.0}
                position-y={1.0}
                rotation={[
                  THREE.MathUtils.degToRad(20),
                  THREE.MathUtils.degToRad(-50),
                  THREE.MathUtils.degToRad(0),
                ]}
              />
            </Float>
            <Float floatIntensity={1} speed={1.2} rotationIntensity={0.3}>
              <Latarka_MAPA
                scale={1}
                position-z={1}
                position-x={0}
                position-y={1.7}
                rotation={[
                  THREE.MathUtils.degToRad(20),
                  THREE.MathUtils.degToRad(-50),
                  THREE.MathUtils.degToRad(0),
                ]}
              />
            </Float>
            <PetrolStation
              scale={3}
              position-z={0}
              position-x={4}
              position-y={1.2}
              rotation={[
                THREE.MathUtils.degToRad(0),
                THREE.MathUtils.degToRad(-80),
                THREE.MathUtils.degToRad(0),
              ]}
            />
          </group>
        </motion.group>

        {/* PROJECTS */}
        <motion.group
          position-z={2 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{ projects: { y: 0 } }}
        >
          <group position-x={1}>
            <SectionTitle
              position-x={-0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
            >
              PROJECTS
            </SectionTitle>

            <group
              position-x={0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
              scale={0.8}
            >
              <Monitor
                scale={0.02}
                position-y={1}
                rotation-y={-Math.PI / 2}
                position-z={-1}
              />

              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color="white" />
              </RoundedBox>
            </group>
          </group>
        </motion.group>

        {/* CONTACT */}
        <motion.group
          position-z={3 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{ contact: { y: 0 } }}
        >
          <SectionTitle position-x={-2} position-z={0.6}>
            CONTACT
          </SectionTitle>
          <group position-x={-2}>
            <ParkBench
              scale={0.5}
              position-x={-0.5}
              position-z={-2.5}
              rotation-y={-Math.PI / 4}
            />
            <group position-y={2.2} position-z={-0.5}>
              <Float floatIntensity={2} rotationIntensity={1.5}>
                <Balloon scale={1.5} position-x={-0.5} color="#71a2d9" />
              </Float>
              <Float
                floatIntensity={1.5}
                rotationIntensity={2}
                position-z={0.5}
              >
                <Balloon scale={1.3} color="#d97183" />
              </Float>
              <Float speed={2} rotationIntensity={2}>
                <Balloon scale={1.6} position-x={0.4} color="yellow" />
              </Float>
            </group>
          </group>

          <Mailbox
            scale={0.25}
            rotation-y={1.25 * Math.PI}
            position-x={1}
            position-y={0.25}
            position-z={0.5}
          />
          <Float floatIntensity={1.5} speed={3}>
            <Pigeon
              position-x={2}
              position-y={1.5}
              position-z={-0.5}
              scale={0.3}
            />
          </Float>
        </motion.group>
      </motion.group>
    </>
  );
};
