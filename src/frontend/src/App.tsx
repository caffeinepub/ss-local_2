import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MediaItem {
  name: string;
  link: string;
  bg: string;
  emoji?: string;
  image?: string;
  type: "app" | "youtube";
}

interface Section {
  title: string;
  items: MediaItem[];
  accentColor: string;
}

// ─── YouTube helpers ──────────────────────────────────────────────────────────

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const liveMatch = u.pathname.match(/\/live\/([A-Za-z0-9_-]{11})/);
    if (liveMatch) return liveMatch[1];
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1).split("?")[0];
      if (id.length >= 11) return id.slice(0, 11);
    }
    const v = u.searchParams.get("v");
    if (v) return v;
    return null;
  } catch {
    return null;
  }
}

function buildEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
}

function buildAppLink(playStoreUrl: string): string {
  try {
    const u = new URL(playStoreUrl);
    const pkg = u.searchParams.get("id");
    if (pkg) {
      return (
        `intent://#Intent;scheme=https;package=${pkg};` +
        `S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`
      );
    }
  } catch {
    // fall through
  }
  return playStoreUrl;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const OTT_APPS: MediaItem[] = [
  {
    name: "ETV WIN",
    link: "https://play.google.com/store/apps/details?id=com.etvwin.mobile",
    bg: "#b91c1c",
    image: "/assets/uploads/etv-win-2.png",
    type: "app",
  },
  {
    name: "SUN NXT",
    link: "https://play.google.com/store/apps/details?id=com.suntv.sunnxt",
    bg: "#ea580c",
    image: "/assets/uploads/sun-nxt-6.jpeg",
    type: "app",
  },
  {
    name: "HOT STAR",
    link: "https://play.google.com/store/apps/details?id=in.startv.hotstar",
    bg: "#1d4ed8",
    image: "/assets/uploads/hot-star-1.jpeg",
    type: "app",
  },
  {
    name: "ZEE 5",
    link: "https://play.google.com/store/apps/details?id=com.graymatrix.did",
    bg: "#7c3aed",
    image: "/assets/uploads/zee-5-4.png",
    type: "app",
  },
  {
    name: "AHA",
    link: "https://play.google.com/store/apps/details?id=ahaflix.tv",
    bg: "#ea580c",
    image: "/assets/uploads/aha-3.jpeg",
    type: "app",
  },
  {
    name: "SONY LIV",
    link: "https://play.google.com/store/apps/details?id=com.sonyliv",
    bg: "#0f766e",
    image: "/assets/uploads/Sony-liv-5.jpeg",
    type: "app",
  },
  {
    name: "AMAZON PRIME",
    link: "https://play.google.com/store/apps/details?id=com.amazon.avod.thirdpartyclient",
    bg: "#0369a1",
    image: "/assets/generated/amazon-prime-icon.dim_200x200.png",
    type: "app",
  },
  {
    name: "NET FLIX",
    link: "https://play.google.com/store/apps/details?id=com.netflix.mediaclient",
    bg: "#dc2626",
    image: "/assets/generated/netflix-icon.dim_200x200.png",
    type: "app",
  },
];

const TV_CHANNELS: MediaItem[] = [
  {
    name: "ETV",
    link: "https://play.google.com/store/apps/details?id=com.etvwin.mobile",
    bg: "#b45309",
    image: "/assets/uploads/Etv-2.png",
    type: "app",
  },
  {
    name: "GEMINI",
    link: "https://play.google.com/store/apps/details?id=com.suntv.sunnxt",
    bg: "#4338ca",
    image: "/assets/uploads/Gemini-3.jpeg",
    type: "app",
  },
  {
    name: "STAR MAA",
    link: "https://play.google.com/store/apps/details?id=in.startv.hotstar",
    bg: "#0e7490",
    image: "/assets/uploads/star-maa-1.jpeg",
    type: "app",
  },
  {
    name: "ZEE TELUGU",
    link: "https://play.google.com/store/apps/details?id=com.graymatrix.did",
    bg: "#6d28d9",
    image: "/assets/uploads/zee-telugu-4.jpeg",
    type: "app",
  },
  {
    name: "SPORTS",
    link: "https://play.google.com/store/apps/details?id=com.sonyliv",
    bg: "#065f46",
    image: "/assets/uploads/sports-5.jpeg",
    type: "app",
  },
];

const NEWS_CHANNELS: MediaItem[] = [
  {
    name: "TV9",
    link: "https://www.youtube.com/live/II_m28Bm-iM?si=s14Ud_UQus9xzsc4",
    bg: "#9f1239",
    image: "/assets/uploads/TV9-2.png",
    type: "youtube",
  },
  {
    name: "V6",
    link: "https://www.youtube.com/live/U58aDf-zfmY?si=Xu9hU2bYRT7_bT9w",
    bg: "#1e40af",
    image: "/assets/uploads/V6-4.jpeg",
    type: "youtube",
  },
  {
    name: "T NEWS",
    link: "https://www.youtube.com/live/e_JVjPm96V8?si=297yQg0titTxWYlc",
    bg: "#92400e",
    image: "/assets/uploads/Tnews-3.jpeg",
    type: "youtube",
  },
  {
    name: "NTV",
    link: "https://www.youtube.com/live/L0RktSIM980?si=f574WHml0qnMJ1LO",
    bg: "#1f2937",
    image: "/assets/uploads/NTV-1.jpeg",
    type: "youtube",
  },
];

const YOUTUBE_CHANNELS: MediaItem[] = [
  {
    name: "SS LOCAL",
    link: "https://youtube.com/@sslocal264?si=Lg5VJWkdkUDtMB1Q",
    bg: "#dc2626",
    image: "/assets/uploads/SS-Local-3.png",
    type: "youtube",
  },
  {
    name: "DJ SONGS",
    link: "https://youtube.com/playlist?list=PL8yjkbZSTUmU32VtYBtYLgwjmnbiIuwrI&si=ojEj-eg7GAq1lbrg",
    bg: "#7c3aed",
    image: "/assets/uploads/DJ-Songs-2.jpeg",
    type: "youtube",
  },
  {
    name: "FOLK SONGS",
    link: "https://youtu.be/_r0Ct38-gUU?si=ER30j6CGd8ATvfcL",
    bg: "#065f46",
    image: "/assets/uploads/Folk-songs-1.jpeg",
    type: "youtube",
  },
];

const SECTIONS: Section[] = [
  { title: "NEWS CHANNELS", items: NEWS_CHANNELS, accentColor: "#22dd44" },
  { title: "YOUTUBE", items: YOUTUBE_CHANNELS, accentColor: "#22dd44" },
  { title: "TV CHANNELS", items: TV_CHANNELS, accentColor: "#22dd44" },
  { title: "OTT APPS", items: OTT_APPS, accentColor: "#22dd44" },
];

// ─── YouTube Modal ─────────────────────────────────────────────────────────────

function YouTubeModal({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  const videoId = extractYouTubeId(item.link);

  return (
    <dialog
      aria-label={`Play ${item.name}`}
      open
      className="fixed inset-0 z-50 flex flex-col items-center justify-center m-0 w-full h-full max-w-none max-h-none border-0 p-0"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="relative w-full mx-4 rounded-2xl overflow-hidden"
        style={{ maxWidth: "640px", background: "#000" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key !== "Escape") e.stopPropagation();
        }}
        role="document"
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#111" }}
        >
          <span className="font-bold text-white tracking-wider text-sm">
            {item.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Player */}
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          {videoId ? (
            <iframe
              src={buildEmbedUrl(videoId)}
              title={item.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/70"
              style={{ background: "#0a0a0a" }}
            >
              <span className="text-5xl">{item.emoji}</span>
              <p className="text-sm text-center px-6">
                This link opens a playlist or channel.
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-sm font-bold text-black"
                style={{ background: "#22dd44" }}
                onClick={onClose}
              >
                Open in YouTube
              </a>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-white/30">Tap outside to close</p>
    </dialog>
  );
}

// ─── MediaCard Component ───────────────────────────────────────────────────────

function MediaCard({
  item,
  onYouTubeClick,
}: {
  item: MediaItem;
  onYouTubeClick: (item: MediaItem) => void;
}) {
  const iconContent = item.image ? (
    <img
      src={item.image}
      alt={item.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "16px",
      }}
    />
  ) : (
    <span style={{ fontSize: "30px" }}>{item.emoji}</span>
  );

  if (item.type === "youtube") {
    return (
      <button
        onClick={() => onYouTubeClick(item)}
        type="button"
        className="flex flex-col items-center gap-2 shrink-0 group bg-transparent border-0 p-0 cursor-pointer"
        style={{ width: "90px" }}
      >
        <div
          className="rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-110 group-active:scale-95"
          style={{
            width: "72px",
            height: "72px",
            background: item.bg,
            boxShadow: `0 4px 16px ${item.bg}55`,
          }}
        >
          {iconContent}
        </div>
        <span
          className="text-center leading-tight font-bold text-white/90 group-hover:text-white transition-colors duration-150"
          style={{ fontSize: "10px", maxWidth: "88px" }}
        >
          {item.name}
        </span>
      </button>
    );
  }

  return (
    <a
      href={buildAppLink(item.link)}
      className="flex flex-col items-center gap-2 shrink-0 group"
      style={{ width: "90px" }}
    >
      <div
        className="rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-110 group-active:scale-95"
        style={{
          width: "72px",
          height: "72px",
          background: item.bg,
          boxShadow: `0 4px 16px ${item.bg}55`,
        }}
      >
        {iconContent}
      </div>
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

function ScrollableRow({
  section,
  onYouTubeClick,
}: {
  section: Section;
  onYouTubeClick: (item: MediaItem) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full">
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

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 px-4 pb-2 overflow-x-auto"
        style={{ touchAction: "pan-x" }}
      >
        {section.items.map((item) => (
          <MediaCard
            key={item.name}
            item={item}
            onYouTubeClick={onYouTubeClick}
          />
        ))}
      </div>

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
  const [activeYT, setActiveYT] = useState<MediaItem | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, oklch(0.13 0.04 142 / 0.5) 0%, oklch(0.08 0 0) 60%)",
      }}
    >
      {activeYT && (
        <YouTubeModal item={activeYT} onClose={() => setActiveYT(null)} />
      )}

      <header
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b border-white/10"
        style={{
          background: "oklch(0.10 0.01 142 / 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <img
          src="/assets/uploads/IMG_20230812_092139-1.png"
          alt="SS LOCAL logo"
          style={{
            height: "52px",
            width: "52px",
            objectFit: "contain",
            borderRadius: "12px",
          }}
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
          <p
            className="text-xs font-body tracking-wider"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            YOUR MEDIA HUB
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-7 py-6">
        {SECTIONS.map((section) => (
          <ScrollableRow
            key={section.title}
            section={section}
            onYouTubeClick={setActiveYT}
          />
        ))}
      </main>

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
