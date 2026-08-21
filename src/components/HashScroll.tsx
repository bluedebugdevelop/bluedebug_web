"use client";

import { useEffect } from "react";

/**
 * Ventana durante la que insistimos en colocar la página. El primer intento
 * suele bastar, pero si la hidratación se retrasa hace falta un segundo aviso.
 * Los timers se estiran bastante durante la carga, así que el corte va por
 * tiempo transcurrido y no por número de intentos.
 */
const VENTANA_MS = 1500;
const INTERVALO_MS = 100;

/**
 * Coloca la página en la sección del hash al entrar por un enlace profundo
 * (por ejemplo /#metodo desde una página de portfolio).
 *
 * El salto que hace el navegador al cargar no sobrevive: llega antes de que
 * React hidrate y la hidratación devuelve la página arriba. Reposicionamos ya
 * montados, y paramos en cuanto el visitante toca el scroll para no quitarle
 * el control.
 */
export default function HashScroll() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;

    let destino: Element | null = null;
    try {
      destino = document.querySelector(hash);
    } catch {
      return; // hash que no es un selector válido
    }
    if (!destino) return;

    const seccion = destino;
    const limite = Date.now() + VENTANA_MS;
    let temporizador = 0;

    const eventos = ["wheel", "touchstart", "keydown", "mousedown"] as const;

    const parar = () => {
      window.clearTimeout(temporizador);
      eventos.forEach((e) => window.removeEventListener(e, parar));
    };

    const colocar = () => {
      // Instantáneo a propósito: animar miles de píxeles no aporta nada.
      seccion.scrollIntoView({ behavior: "instant", block: "start" });
      if (Date.now() < limite) {
        temporizador = window.setTimeout(colocar, INTERVALO_MS);
      } else {
        parar();
      }
    };

    eventos.forEach((e) =>
      window.addEventListener(e, parar, { passive: true, once: true }),
    );
    temporizador = window.setTimeout(colocar, 0);

    return parar;
  }, []);

  return null;
}
