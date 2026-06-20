import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ZodiacMatch — Chinese Zodiac Compatibility";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a1816 0%, #2d2018 50%, #3a2520 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Instrument Serif", Georgia, serif',
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 400,
            color: "#e8e0d8",
            textAlign: "center",
          }}
        >
          Find your{" "}
          <span style={{ color: "#c0392b", fontStyle: "italic" }}>
            animal
          </span>{" "}
          match
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#8a847c",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Chinese Zodiac Compatibility Tool
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#6b635b",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          zodiacmatch.xyz
        </div>
      </div>
    ),
    size,
  );
}
