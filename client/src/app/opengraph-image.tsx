import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Célestin Ryf — Software Engineer";

// Static, build-time social card: dark ground, name, role, terminal nod.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#f87171" }} />
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#facc15" }} />
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#4ade80" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, color: "#ffffff", letterSpacing: -3 }}>
            Célestin Ryf
          </div>
          <div style={{ fontSize: 36, color: "#a3a3a3", marginTop: 16 }}>
            Software engineer · CS student at the University of Washington
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#fb923c", fontFamily: "monospace" }}>
          $ github.com/celestinryf — work, case studies, contact
        </div>
      </div>
    ),
    size
  );
}
