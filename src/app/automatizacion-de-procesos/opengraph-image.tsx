import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "BlueDebug: automatización de procesos para empresas en Gijón y Asturias";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori necesita el TTF; se descarga una vez en build. Si falla, usa la de serie.
async function loadFont(family: string, spec: string, name: string, weight: 500 | 800) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:${spec}&display=swap`,
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((res) => res.arrayBuffer());
    return { name, data, weight, style: "normal" as const };
  } catch {
    return null;
  }
}

export default async function Image() {
  const [regular, bold, mono, logo] = await Promise.all([
    loadFont("Bricolage+Grotesque", "opsz,wght@96,500", "Bricolage", 500),
    loadFont("Bricolage+Grotesque", "opsz,wght@96,800", "Bricolage", 800),
    loadFont("IBM+Plex+Mono", "wght@500", "Plex Mono", 500),
    readFile(join(process.cwd(), "public/logo-bd/logo-bd-256.png")),
  ]);
  const fonts = [regular, bold, mono].filter((font) => font !== null);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F5F7F9",
          color: "#10202E",
          fontFamily: regular ? "Bricolage" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} alt="" />
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em" }}>BlueDebug</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.045em",
          }}
        >
          <span>Automatización</span>
          <span style={{ display: "flex" }}>
            de&nbsp;
            <span
              style={{
                color: "#0B6EB4",
                borderBottom: "10px solid #E8590C",
                paddingBottom: 2,
              }}
            >
              procesos
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            fontWeight: 500,
            fontFamily: mono ? "Plex Mono" : undefined,
            color: "#4A5F72",
            borderTop: "2px solid rgba(16, 32, 46, 0.15)",
            paddingTop: 24,
          }}
        >
          <span>Facturas · Altas de cliente · Informes · Avisos</span>
          <span style={{ color: "#0B6EB4" }}>Gijón · Asturias</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
