"use client";

import { useEffect } from "react";

/**
 * Coloca la página en la sección del hash al entrar por un enlace profundo
 * (por ejemplo /#metodo desde una página de portfolio).
 *
 * El salto que hace el navegador al cargar se pierde: llega antes de que React
 * hidrate, y `scroll-behavior: smooth` lo convierte en una animación que la
 * hidratación cancela. Reposicionamos después, ya montados.
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

    // Dos frames: el primero cierra la hidratación, el segundo mide ya con el
    // layout definitivo. Instantáneo a propósito, animar 3000px no aporta nada.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        destino.scrollIntoView({ behavior: "instant", block: "start" });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
