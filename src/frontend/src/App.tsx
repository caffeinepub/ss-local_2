import { useState } from "react";

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

function extractPlaylistId(url: string): string | null {
  try {
    const u = new URL(url);
    return u.searchParams.get("list");
  } catch {
    return null;
  }
}

function buildEmbedUrl(item: MediaItem, muted: boolean): string {
  const muteParam = muted ? "1" : "0";
  const videoId = extractYouTubeId(item.link);
  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${muteParam}&rel=0&playsinline=1&modestbranding=1`;
  }
  const playlistId = extractPlaylistId(item.link);
  if (playlistId) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1&mute=${muteParam}&rel=0&playsinline=1&modestbranding=1`;
  }
  return "";
}

function buildAppLink(playStoreUrl: string): string {
  try {
    const u = new URL(playStoreUrl);
    const pkg = u.searchParams.get("id");
    if (pkg) {
      return `intent://#Intent;scheme=https;package=${pkg};S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;
    }
  } catch {
    // fall through
  }
  return playStoreUrl;
}

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
    link: "https://www.youtube.com/live/ANU5_XHW2wA?si=MXyXj4wzBhELan7Z",
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
    name: "RB NEWS",
    link: "https://youtube.com/@rbnews123?si=8nEPPgDnunxpqj0F",
    bg: "#b91c1c",
    image: "/assets/generated/rb-news-logo.dim_200x200.png",
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

const BHAKTHI_CHANNELS: MediaItem[] = [
  {
    name: "Bhakthi",
    link: "https://www.youtube.com/live/d0dB3kSCMmM?si=2pXoD4YSgLi3uZ5o",
    bg: "#f59e0b",
    emoji: "🕉️",
    type: "youtube",
  },
  {
    name: "Hindhu Dharmam",
    link: "https://www.youtube.com/live/r-VKXUVmytU?si=y0QCNPPQMVIEdI0G",
    bg: "#d97706",
    emoji: "🙏",
    type: "youtube",
  },
  {
    name: "CVR OM",
    link: "https://www.youtube.com/live/2FtpKyiHgvk?si=ZSZswAH-MuOr3wzt",
    bg: "#b45309",
    emoji: "🔔",
    type: "youtube",
  },
  {
    name: "SVBC",
    link: "https://www.youtube.com/live/L5WTm0DVvdk?si=4AhKHK0-WgqsUDqv",
    bg: "#92400e",
    emoji: "🛕",
    type: "youtube",
  },
];

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

const SECTIONS: Section[] = [
  { title: "NEWS CHANNELS", items: NEWS_CHANNELS, accentColor: "#22dd44" },
  { title: "YOUTUBE", items: YOUTUBE_CHANNELS, accentColor: "#22dd44" },
  {
    title: "BHAKTHI CHANNELS",
    items: BHAKTHI_CHANNELS,
    accentColor: "#22dd44",
  },
  { title: "OTT APPS", items: OTT_APPS, accentColor: "#22dd44" },
];

const DEFAULT_CHANNEL = NEWS_CHANNELS[0];

function TopPlayer({
  current,
  muted,
  onUnmute,
}: { current: MediaItem; muted: boolean; onUnmute: () => void }) {
  const embedUrl = buildEmbedUrl(current, muted);
  return (
    <div
      className="w-full"
      style={{ background: "#000", borderBottom: "2px solid #22dd44" }}
    >
      <div
        className="flex items-center gap-2 px-3 py-1"
        style={{ background: "#111" }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22dd44",
            display: "inline-block",
            boxShadow: "0 0 6px #22dd44",
          }}
        />
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#22dd44" }}
        >
          {current.name}
        </span>
      </div>
      <div
        style={{ position: "relative", paddingTop: "56.25%" }}
        onClick={muted ? onUnmute : undefined}
        onKeyDown={muted ? (e) => e.key === "Enter" && onUnmute() : undefined}
        role={muted ? "button" : undefined}
        tabIndex={muted ? 0 : undefined}
      >
        {embedUrl ? (
          <>
            <iframe
              key={`${current.name}-${muted}`}
              src={embedUrl}
              title={current.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
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
            {muted && (
              <button
                type="button"
                onClick={onUnmute}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(0,0,0,0.65)",
                    borderRadius: "16px",
                    padding: "18px 32px",
                    border: "2px solid #22dd44",
                    boxShadow: "0 0 24px rgba(34,221,68,0.5)",
                  }}
                >
                  <span style={{ fontSize: "36px" }}>🔊</span>
                  <span
                    style={{
                      color: "#22dd44",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    TAP TO UNMUTE
                  </span>
                </div>
              </button>
            )}
          </>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: "#0a0a0a" }}
          >
            <p className="text-sm text-white/60 text-center px-6">
              This channel opens in YouTube
            </p>
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-bold text-black"
              style={{ background: "#22dd44" }}
            >
              Open in YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function MediaCard({
  item,
  onYouTubeClick,
}: { item: MediaItem; onYouTubeClick: (item: MediaItem) => void }) {
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
          className="text-center leading-tight font-bold"
          style={{ fontSize: "10px", maxWidth: "88px", color: "#1a1a2e" }}
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
        className="text-center leading-tight font-bold"
        style={{ fontSize: "10px", maxWidth: "88px", color: "#1a1a2e" }}
      >
        {item.name}
      </span>
    </a>
  );
}

function ScrollableRow({
  section,
  onYouTubeClick,
}: { section: Section; onYouTubeClick: (item: MediaItem) => void }) {
  return (
    <section className="w-full">
      <div
        className="flex items-center gap-3 px-4 mb-4"
        style={{ background: "#000", paddingTop: "8px", paddingBottom: "8px" }}
      >
        <div
          className="h-5 w-1 rounded-full"
          style={{ background: section.accentColor }}
        />
        <h2
          className="font-display text-lg tracking-widest uppercase"
          style={{
            color: section.accentColor,
            fontFamily: "'Black Han Sans', sans-serif",
            textShadow: `0 1px 4px rgba(0,0,0,0.5), 0 0 12px ${section.accentColor}88`,
          }}
        >
          {section.title}
        </h2>
      </div>
      <div
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
            "linear-gradient(to right, rgba(34,221,68,0.4), transparent)",
        }}
      />
    </section>
  );
}

export default function App() {
  const [currentChannel, setCurrentChannel] =
    useState<MediaItem>(DEFAULT_CHANNEL);
  const [muted, setMuted] = useState(true);

  function handleYouTubeClick(item: MediaItem) {
    const embedUrl = buildEmbedUrl(item, false);
    if (embedUrl) {
      setCurrentChannel(item);
      setMuted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/assets/generated/floral-bg.dim_1200x1200.jpg')",
        backgroundSize: "500px 500px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
      }}
    >
      <header
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "rgba(34,221,68,0.3)",
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
              textShadow:
                "0 1px 3px rgba(0,0,0,0.2), 0 0 20px rgba(34,221,68,0.5)",
            }}
          >
            SS LOCAL
          </h1>
          <p
            className="text-xs font-body tracking-wider"
            style={{ color: "#666" }}
          >
            YOUR MEDIA HUB
          </p>
        </div>
      </header>

      <TopPlayer
        current={currentChannel}
        muted={muted}
        onUnmute={() => setMuted(false)}
      />

      <main className="flex-1 flex flex-col gap-7 py-6">
        {SECTIONS.map((section) => (
          <ScrollableRow
            key={section.title}
            section={section}
            onYouTubeClick={handleYouTubeClick}
          />
        ))}
      </main>

      <footer
        className="text-center py-4 text-xs border-t"
        style={{
          color: "#555",
          borderColor: "rgba(34,221,68,0.3)",
          background: "rgba(255,255,255,0.7)",
        }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-primary transition-colors"
          style={{ color: "#16a34a" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
