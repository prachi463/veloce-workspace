import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0f12",
          color: "#e7ebef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            backgroundImage: "linear-gradient(90deg, #10b981, #06b6d4)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Veloce Workspace
        </div>
        <div style={{ fontSize: 28, marginTop: 20, color: "#9aa4b2", display: "flex" }}>
          Fluid Motion. Instant Intelligence. Local Processing.
        </div>
      </div>
    ),
    { ...size }
  );
}
