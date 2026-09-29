import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

// twitter:card was already summary_large_image, but no image was ever supplied,
// so every share of the site rendered as a bare text card. This generates one
// at build time from the brand tokens — no binary asset to keep in sync.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "dayrlism — Dare. Reason. Build.";

const BG = "#06181C";
const ACCENT = "#4DF0C4";
const TEXT = "#EAF6F4";
const MUTED = "#82A6A8";

export default async function Image() {
  const profile = await getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ACCENT,
              display: "flex",
            }}
          />
          <div style={{ color: MUTED, fontSize: 26, letterSpacing: 2 }}>DAYRLISM.INFO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: TEXT, fontSize: 82, fontWeight: 700, letterSpacing: -2 }}>
            Dare. Reason.{" "}
            <span style={{ color: ACCENT, marginLeft: 18 }}>Build.</span>
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 30, marginTop: 22, maxWidth: 900 }}>
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: MUTED, fontSize: 24 }}>
          <div style={{ display: "flex" }}>{profile.fullName}</div>
          <div style={{ display: "flex", color: ACCENT }}>{profile.title}</div>
        </div>
      </div>
    ),
    size,
  );
}
