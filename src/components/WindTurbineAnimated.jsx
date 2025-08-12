// src/components/WindTurbineAnimated.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * Odtwarzanie animacji GLB w podzakresie [cutStart, duration - cutEnd]
 * z ręcznym sterowaniem czasem (zero "tyknięcia" na pętli).
 *
 * Props:
 * - url        : ścieżka do GLB (domyślnie /models/wiatrak.glb)
 * - actionName : nazwa klipu (domyślnie pierwszy)
 * - speed      : prędkość odtwarzania (1 = normalnie)
 * - playing    : pauza/wznowienie (true/false)
 * - cutStart   : ile sekund uciąć z początku (default 0.01)
 * - cutEnd     : ile sekund uciąć z końca (default 0.01)
 */
export function WindTurbineAnimated({
  url = "/models/wiatrak.glb",
  actionName,
  speed = 1,
  playing = true,
  cutStart = 0.01,
  cutEnd = 0.01,
  ...props
}) {
  const ref = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions, names, mixer } = useAnimations(animations, ref);

  // lokalny zegar w podzakresie
  const startRef = useRef(0);
  const endRef = useRef(0);
  const spanRef = useRef(0);
  const tRef = useRef(0);
  const actionRef = useRef(null);

  useEffect(() => {
    if (!names.length) return;
    const clipName = actionName || names[0];
    const action = actions[clipName];
    if (!action) return;

    const clip = action.getClip();
    const start = Math.max(0, Math.min(cutStart, clip.duration - 1e-6));
    const end = Math.max(start + 1e-6, clip.duration - Math.max(0, cutEnd));
    const span = Math.max(1e-6, end - start);

    // włącz akcję, ale wyłącz automatyczne przesuwanie czasu
    action.enabled = true;
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();
    mixer.timeScale = 0;

    startRef.current = start;
    endRef.current = end;
    spanRef.current = span;
    tRef.current = start + 1e-5; // wystartuj tuż po początku
    actionRef.current = action;

    // ustaw pozę na starcie
    action.time = tRef.current;
    mixer.update(0);

    return () => {
      action.stop();
      actionRef.current = null;
    };
  }, [actions, names, actionName, mixer, cutStart, cutEnd]);

  // ręczne odtwarzanie w zakresie [start, end) — żadnych skoków do 0/duration
  useFrame((_, dt) => {
    const action = actionRef.current;
    if (!action) return;

    if (!playing || speed === 0) {
      mixer.update(0);
      return;
    }

    const start = startRef.current;
    const span = spanRef.current;

    // lokalny czas modulo span
    const local = (tRef.current - start + dt * Math.max(0, speed)) % span;
    tRef.current = start + local;

    // odśwież pozę bez kroku czasu mixera
    action.time = tRef.current;
    mixer.update(0);
  });

  return <primitive ref={ref} object={scene} {...props} dispose={null} />;
}

useGLTF.preload("/models/wiatrak.glb");
