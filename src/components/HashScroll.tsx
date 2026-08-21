"use client";

import { useEffect } from "react";

/** Cuánto insistimos, y cada cuánto, mientras Next termina de hidratar. */
const INTENTOS = 8;
const INTERVALO_MS = 100;

/**
 * Coloca la página en la sección del hash al entrar por un enlace profundo
 * (por ejemplo /#metodo desde una página de portfolio).
 *
 * El salto que hace el navegador al cargar no sobrevive: llega antes de que
 * React hidrate y la hidratación devuelve la página arriba. Un par de frames
 * tampoco bastan, porque el reposicionamiento de Next llega después. Así que
 * insistimos durante un momento y paramos en cuanto el usuario toca el scroll,
 * para no pelearle el control.
 */
export default function HashScroll() {
  useEffect(() => {
    const { hash } = window.location;
    // TEMPORAL: rastro para diagnosticar en produccion.
    (window as any).__hs = { montado: true, hash, t0: Date.now(), pasos: [] as unknown[] };
    if (!hash || hash.length < 2) return;

    let destino: Element | null = null;
    try {
      destino = document.querySelector(hash);
    } catch {
      return; // hash que no es un selector válido
    }
    (window as any).__hs.encontrado = !!destino;
    if (!destino) return;

    const seccion = destino;
    let temporizador = 0;
    let intentos = 0;

    const rendirse = () => {
      window.clearTimeout(temporizador);
      quitarEscuchas();
    };

    const colocar = () => {
      // Instantáneo a propósito: animar miles de píxeles no aporta nada.
      const antes = Math.round(window.scrollY);
      seccion.scrollIntoView({ behavior: "instant", block: "start" });
      (window as any).__hs.pasos.push({
        ms: Date.now() - (window as any).__hs.t0,
        antes,
        despues: Math.round(window.scrollY),
      });
      if (++intentos < INTENTOS) {
        temporizador = window.setTimeout(colocar, INTERVALO_MS);
      } else {
        quitarEscuchas();
      }
    };

    const eventos = ["wheel", "touchstart", "keydown"] as const;
    function quitarEscuchas() {
      eventos.forEach((e) => window.removeEventListener(e, rendirse));
    }
    eventos.forEach((e) =>
      window.addEventListener(e, rendirse, { passive: true, once: true }),
    );

    temporizador = window.setTimeout(colocar, 0);

    return () => {
      window.clearTimeout(temporizador);
      quitarEscuchas();
    };
  }, []);

  return null;
}
