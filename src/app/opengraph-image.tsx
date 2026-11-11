import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "BlueDebug — El trabajo manual que sobra, fuera";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori necesita el TTF; se descarga una vez en build. Si falla, usa la de serie.
async function loadDisplayFont(weight: 500 | 800) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,${weight}&display=swap`,
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((res) => res.arrayBuffer());
    return { name: "Bricolage", data, weight, style: "normal" as const };
  } catch {
    return null;
  }
}

export default async function Image() {
  const [regular, bold, logo] = await Promise.all([
    loadDisplayFont(500),
    loadDisplayFont(800),
    readFile(join(process.cwd(), "public/logo-bd/logo-bd-256.png")),
  ]);
  const fonts = [regular, bold].filter((font) => font !== null);
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
          fontFamily: fonts.length ? "Bricolage" : undefined,
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
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.045em",
          }}
        >
          <span>El trabajo manual</span>
          <span style={{ display: "flex" }}>
            que sobra,&nbsp;
            <span
              style={{
                color: "#0B6EB4",
                borderBottom: "10px solid #E8590C",
                paddingBottom: 2,
              }}
            >
              fuera
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            fontWeight: 500,
            color: "#4A5F72",
            borderTop: "2px solid rgba(16, 32, 46, 0.14)",
            paddingTop: 24,
          }}
        >
          <span>Automatización de procesos y software a medida en Gijón</span>
          <span style={{ color: "#0B6EB4" }}>bluedebug.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
