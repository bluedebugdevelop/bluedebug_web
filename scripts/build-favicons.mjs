/**
 * Genera los iconos de pestana a partir del logo de marca, el mismo que usan
 * Navbar y Footer. Sin esto Next sirve el favicon por defecto de
 * create-next-app y en la pestana sale el logo de Next, no el nuestro.
 *
 * Produce:
 *   src/app/icon.png        256x256, transparente (lo referencia Next)
 *   src/app/apple-icon.png  180x180 sobre blanco (iOS no respeta el alpha)
 *   src/app/favicon.ico     16/32/48 con PNG incrustado
 *
 * Uso: node scripts/build-favicons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { decode, encode } from "./png-knockout.mjs";
import { resize } from "./png-resize.mjs";

const ORIGEN = "public/logo-bd/logo-bd-256.png";

/** Aplana sobre un fondo opaco, para los destinos que ignoran el alpha. */
function sobreFondo({ w, h, px }, [fr, fg, fb]) {
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const d = i * 4;
    const a = px[d + 3] / 255;
    out[d] = Math.round(px[d] * a + fr * (1 - a));
    out[d + 1] = Math.round(px[d + 1] * a + fg * (1 - a));
    out[d + 2] = Math.round(px[d + 2] * a + fb * (1 - a));
    out[d + 3] = 255;
  }
  return { w, h, px: out };
}

/**
 * Empaqueta varios PNG en un .ico. El formato admite PNG incrustado tal cual
 * (Vista en adelante), asi que no hay que pasar por BMP.
 */
function ico(pngs) {
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: icono
  cabecera.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entradas = pngs.map(({ side, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(side >= 256 ? 0 : side, 0); // 0 significa 256
    e.writeUInt8(side >= 256 ? 0 : side, 1);
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([cabecera, ...entradas, ...pngs.map((p) => p.data)]);
}

const logo = decode(readFileSync(ORIGEN));
console.log(`origen: ${ORIGEN} — ${logo.w}x${logo.h}`);

writeFileSync("src/app/icon.png", encode(resize(logo, 256)));
writeFileSync(
  "src/app/apple-icon.png",
  encode(sobreFondo(resize(logo, 180), [255, 255, 255])),
);
writeFileSync(
  "src/app/favicon.ico",
  ico([16, 32, 48].map((side) => ({ side, data: encode(resize(logo, side)) }))),
);

console.log("escritos: src/app/icon.png, apple-icon.png, favicon.ico");
