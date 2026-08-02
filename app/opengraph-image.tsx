import { ImageResponse } from "next/og";

export const alt = "Excuse Me — a service of the Department of No";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
          backgroundColor: "#f3efe6",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.45), transparent 40%), repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(154,143,124,0.08) 28px)",
          color: "#1c2430",
          padding: "56px 64px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#4a5563",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                border: "1px solid #9a8f7c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6e2f2f",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              DN
            </div>
            Department of No
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            Form EX-04B
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: "-0.03em" }}>
            Excuse Me
          </div>
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 34,
              color: "#1c2430",
              maxWidth: 900,
            }}
          >
            Professionally generated reasons for absolutely anything.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "ui-monospace, monospace",
            fontSize: 20,
            color: "#6b7280",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>Office of Plausible Explanations</span>
          <div
            style={{
              border: "2px solid #6e2f2f",
              color: "#6e2f2f",
              padding: "10px 18px",
              transform: "rotate(-6deg)",
              fontSize: 18,
              letterSpacing: "0.16em",
            }}
          >
            Approved
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
