import { useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaItem {
  name: string;
  link: string;
  bg: string;       // Tailwind arbitrary bg — raw hex for inline style
  emoji?: string;
}

interface Section {
  title: string;
  items: MediaItem[];
  accentColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const OTT_APPS: MediaItem[] = [
  {
    name: "ETV WIN",
    link: "https://play.google.com/store/apps/details?id=com.etvwin.mobile",
    bg: "#b91c1c",
    emoji: "📺",
  },
  {
    name: "SUN NXT",
    link: "https://play.google.com/store/apps/details?id=com.suntv.sunnxt",
    bg: "#ea580c",
    emoji: "☀️",
  },
  {
    name: "HOT STAR",
    link: "https://play.google.com/store/apps/details?id=in.startv.hotstar",
    bg: "#1d4ed8",
    emoji: "⭐",
  },
  {
    name: "ZEE 5",
    link: "https://play.google.com/store/apps/details?id=com.graymatrix.did",
    bg: "#7c3aed",
    emoji: "5️⃣",
  },
  {
    name: "AHA",
    link: "https://play.google.com/store/apps/details?id=ahaflix.tv",
    bg: "#be185d",
    emoji: "🎬",
  },
  {
    name: "SONY LIV",
    link: "https://play.google.com/store/apps/details?id=com.sonyliv",
    bg: "#0f766e",
    emoji: "🔴",
  },
  {
    name: "AMAZON PRIME",
    link: "https://play.google.com/store/apps/details?id=com.amazon.avod.thirdpartyclient",
    bg: "#0369a1",
    emoji: "🛒",
  },
  {
    name: "NET FLIX",
    link: "https://play.google.com/store/apps/details?id=com.netflix.mediaclient",
    bg: "#dc2626",
    emoji: "🎭",
  },
];

const TV_CHANNELS: MediaItem[] = [
  {
    name: "ETV",
    link: "https://play.google.com/store/apps/details?id=com.etvwin.mobile",
    bg: "#b45309",
    emoji: "📡",
  },
  {
    name: "GEMINI",
    link: "https://play.google.com/store/apps/details?id=com.suntv.sunnxt",
    bg: "#4338ca",
    emoji: "♊",
  },
  {
    name: "STAR MAA",
    link: "https://play.google.com/store/apps/details?id=in.startv.hotstar",
    bg: "#0e7490",
    emoji: "⭐",
  },
  {
    name: "ZEE TELUGU",
    link: "https://play.google.com/store/apps/details?id=com.graymatrix.did",
    bg: "#6d28d9",
    emoji: "🌸",
  },
  {
    name: "SPORTS",
    link: "https://play.google.com/store/apps/details?id=com.sonyliv",
    bg: "#065f46",
    emoji: "🏆",
  },
];

const NEWS_CHANNELS: MediaItem[] = [
  {
    name: "TV9",
    link: "https://www.youtube.com/live/II_m28Bm-iM?si=s14Ud_UQus9xzsc4",
    bg: "#9f1239",
    emoji: "📰",
  },
  {
    name: "V6",
    link: "https://www.youtube.com/live/U58aDf-zfmY?si=Xu9hU2bYRT7_bT9w",
    bg: "#1e40af",
    emoji: "📢",
  },
  {
    name: "T NEWS",
    link: "https://www.youtube.com/live/e_JVjPm96V8?si=297yQg0titTxWYlc",
    bg: "#92400e",
    emoji: "🗞️",
  },
  {
    name: "N TV",
    link: "https://www.youtube.com/live/L0RktSIM980?si=f574WHml0qnMJ1LO",
    bg: "#1f2937",
    emoji: "📻",
  },
];

const YOUTUBE_CHANNELS: MediaItem[] = [
  {
    name: "SS LOCAL",
    link: "https://youtube.com/@sslocal264?si=Lg5VJWkdkUDtMB1Q",
    bg: "#dc2626",
    emoji: "▶️",
  },
  {
    name: "DJ SONGS",
    link: "https://youtube.com/playlist?list=PL8yjkbZSTUmU32VtYBtYLgwjmnbiIuwrI&si=ojEj-eg7GAq1lbrg",
    bg: "#7c3aed",
    emoji: "🎵",
  },
  {
    name: "FOLK SONGS",
    link: "https://youtu.be/_r0Ct38-gUU?si=ER30j6CGd8ATvfcL",
    bg: "#065f46",
    emoji: "🎶",
  },
];

const SECTIONS: Section[] = [
  { title: "OTT APPS", items: OTT_APPS, accentColor: "#22dd44" },
  { title: "TV CHANNELS", items: TV_CHANNELS, accentColor: "#22dd44" },
  { title: "NEWS CHANNELS", items: NEWS_CHANNELS, accentColor: "#22dd44" },
  { title: "YOUTUBE", items: YOUTUBE_CHANNELS, accentColor: "#22dd44" },
];

// ─── MediaCard Component ───────────────────────────────────────────────────────

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 shrink-0 group"
      style={{ width: "90px" }}
    >
      {/* Icon box */}
      <div
        className="rounded-2xl flex items-center justify-center text-3xl transition-all duration-200 group-hover:scale-110 group-active:scale-95"
        style={{
          width: "72px",
          height: "72px",
          background: item.bg,
          boxShadow: `0 4px 16px ${item.bg}55`,
        }}
      >
        {item.emoji}
      </div>
      {/* Label */}
      <span
        className="text-center leading-tight font-bold text-white/90 group-hover:text-white transition-colors duration-150"
        style={{ fontSize: "10px", maxWidth: "88px" }}
      >
        {item.name}
      </span>
    </a>
  );
}

// ─── ScrollableRow Component ───────────────────────────────────────────────────

function ScrollableRow({ section }: { section: Section }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full">
      {/* Section heading */}
      <div className="flex items-center gap-3 px-4 mb-4">
        <div
          className="h-5 w-1 rounded-full"
          style={{ background: section.accentColor }}
        />
        <h2
          className="font-display text-lg tracking-widest uppercase"
          style={{
            color: section.accentColor,
            fontFamily: "'Black Han Sans', sans-serif",
            textShadow: `0 0 16px ${section.accentColor}88`,
          }}
        >
          {section.title}
        </h2>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 px-4 pb-2 overflow-x-auto"
        style={{ touchAction: "pan-x" }}
      >
        {section.items.map((item) => (
          <MediaCard key={item.name} item={item} />
        ))}
      </div>

      {/* Divider */}
      <div
        className="mt-5 mx-4"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, oklch(0.82 0.22 142 / 0.3), transparent)",
        }}
      />
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.13 0.04 142 / 0.5) 0%, oklch(0.08 0 0) 60%)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-white/10"
        style={{
          background: "oklch(0.10 0.01 142 / 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <img
          src="/assets/uploads/IMG_20230812_092139-1.png"
          alt="SS LOCAL logo"
          style={{ height: "52px", width: "52px", objectFit: "contain", borderRadius: "12px" }}
        />
        <div>
          <h1
            className="text-xl font-display tracking-widest leading-none"
            style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: "#22dd44",
              textShadow: "0 0 24px rgba(34,221,68,0.6)",
            }}
          >
            SS LOCAL
          </h1>
          <p className="text-xs font-body tracking-wider" style={{ color: "oklch(0.55 0 0)" }}>
            YOUR MEDIA HUB
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col gap-7 py-6">
        {SECTIONS.map((section) => (
          <ScrollableRow key={section.title} section={section} />
        ))}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-xs border-t border-white/10"
        style={{ color: "oklch(0.45 0 0)" }}
      >
        © 2026. Built with ❤️ using{" "}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-primary transition-colors"
          style={{ color: "oklch(0.65 0.15 142)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
