export type Clip = {
  id: string;
  label: string;
  tag: string;
  src: string;
  poster: string;
  /** trim in point inside the source file, in seconds */
  start: number;
  /** length of the segment used in the reel */
  dur: number;
  tint: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  category: "short" | "long" | "commercial" | "music";
  year: string;
  role: string;
  length: string;
  views: string;
  retention: string;
  description: string;
  tags: string[];
  src: string;
  poster: string;
  /** tailwind classes for the media box (bento layout) */
  media: string;
  span: string;
  portrait?: boolean;
  credits: { k: string; v: string }[];
};

export const REEL: Clip[] = [
  {
    id: "c1",
    label: "BEHIND THE CUT",
    tag: "craft",
    src: "https://videos.pexels.com/video-files/36036743/15283012_1920_1080_60fps.mp4",
    poster:
      "https://images.pexels.com/videos/36036743/pexels-photo-36036743.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    start: 1.5,
    dur: 5.5,
    tint: "#ffb454",
  },
  {
    id: "c2",
    label: "WILD COAST",
    tag: "aerial",
    src: "https://videos.pexels.com/video-files/10234380/10234380-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/10234380/beach-cliff-drone-ocean-10234380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    start: 6,
    dur: 6,
    tint: "#58d3c6",
  },
  {
    id: "c3",
    label: "NOCNA ZMIANA",
    tag: "music video",
    src: "https://videos.pexels.com/video-files/7669226/7669226-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/7669226/pexels-photo-7669226.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    start: 8,
    dur: 5,
    tint: "#9d8cff",
  },
  {
    id: "c4",
    label: "SKATE OR DIE",
    tag: "action",
    src: "https://videos.pexels.com/video-files/13062515/13062515-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/13062515/pexels-photo-13062515.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    start: 0.4,
    dur: 4.6,
    tint: "#ff4d3d",
  },
  {
    id: "c5",
    label: "CITRUS DROP",
    tag: "commercial",
    src: "https://videos.pexels.com/video-files/8212412/8212412-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8212412/pexels-photo-8212412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    start: 3,
    dur: 5,
    tint: "#c3e86b",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "neon-drift",
    index: "01",
    title: "Neon Drift",
    client: "Aurora Motors",
    category: "commercial",
    year: "2026",
    role: "Edit · Color · Sound",
    length: "0:60",
    views: "1.2M",
    retention: "84%",
    description:
      "Nocny spot miejski zmontowany pod beat: 148 cięć w 60 sekund, rytmiczna synchronizacja z silnikiem i neonem. Całość gradowana do ciepło-zimnego kontraktu teal & orange.",
    tags: ["Premiere Pro", "Color Grading", "Sound Design", "1.2M Views"],
    src: "https://videos.pexels.com/video-files/40145657/17147038_3840_2160_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/40145657/b-roll-bokeh-fitness-40145657.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[16/10]",
    span: "lg:col-span-8",
    credits: [
      { k: "Klient", v: "Aurora Motors" },
      { k: "Agencja", v: "Studio Północ" },
      { k: "Format", v: "16:9 · 4K · 25fps" },
      { k: "Delivery", v: "72h" },
    ],
  },
  {
    id: "morning-routine",
    index: "02",
    title: "5AM Routine",
    client: "@lena.builds",
    category: "short",
    year: "2026",
    role: "Short-form system",
    length: "0:34",
    views: "3.4M",
    retention: "91%",
    description:
      "Seria 24 verticali z hookiem w pierwszych 1.2 sekundy. Dynamiczne captiony, punch-in co 3 sekundy, sound design pod każde przejście.",
    tags: ["Vertical 9:16", "Captions", "Hook Design", "3.4M Views"],
    src: "https://videos.pexels.com/video-files/13929670/13929670-hd_1080_1920_24fps.mp4",
    poster:
      "https://images.pexels.com/videos/13929670/adult-beautiful-business-city-13929670.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    media: "aspect-[4/5] lg:aspect-[8/9]",
    span: "lg:col-span-4",
    portrait: true,
    credits: [
      { k: "Klient", v: "Lena Marzec" },
      { k: "Platforma", v: "TikTok / Reels" },
      { k: "Format", v: "9:16 · 1080×1920" },
      { k: "Cykl", v: "24 odcinki" },
    ],
  },
  {
    id: "skate-or-die",
    index: "03",
    title: "Skate or Die",
    client: "Concrete Club",
    category: "short",
    year: "2025",
    role: "Edit · Speed ramps",
    length: "0:28",
    views: "870K",
    retention: "78%",
    description:
      "Speed-rampy zsynchronizowane z uderzeniem kółek o beton. Montaż na klatkę, bez jednego zmarnowanego ruchu.",
    tags: ["Speed Ramps", "Beat Sync", "870K Views"],
    src: "https://videos.pexels.com/video-files/13062515/13062515-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/13062515/pexels-photo-13062515.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[4/5] lg:aspect-[2/3]",
    span: "lg:col-span-3",
    credits: [
      { k: "Klient", v: "Concrete Club" },
      { k: "Miejsce", v: "Warszawa, Wola" },
      { k: "Format", v: "2.39:1 crop" },
      { k: "Muzyka", v: "Licencja Artlist" },
    ],
  },
  {
    id: "wild-coast",
    index: "04",
    title: "Wild Coast",
    client: "Kanał: Długa Droga",
    category: "long",
    year: "2025",
    role: "Story edit · Color",
    length: "18:24",
    views: "8.7M",
    retention: "62%",
    description:
      "Dokument podróżniczy z 40 godzin materiału. Struktura trzech aktów, oddech w momentach ciszy i retention curve pilnowana co 90 sekund.",
    tags: ["DaVinci Resolve", "Storytelling", "Drone", "8.7M Views"],
    src: "https://videos.pexels.com/video-files/10234380/10234380-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/10234380/beach-cliff-drone-ocean-10234380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[16/10]",
    span: "lg:col-span-6",
    credits: [
      { k: "Klient", v: "Długa Droga (YT 1.1M sub)" },
      { k: "Materiał", v: "41h footage" },
      { k: "Format", v: "16:9 · 4K → 1080p" },
      { k: "Czas", v: "9 dni" },
    ],
  },
  {
    id: "citrus-drop",
    index: "05",
    title: "Citrus Drop",
    client: "Napa Soda",
    category: "commercial",
    year: "2025",
    role: "Product edit · VFX",
    length: "0:15",
    views: "2.1M",
    retention: "88%",
    description:
      "Makro product shot w 240fps, czyszczenie klatek, doklejone splash-e i mikro-zoom pod CTA. Spot do kampanii paid social.",
    tags: ["240fps", "Retouch", "Paid Social", "2.1M Views"],
    src: "https://videos.pexels.com/video-files/8212412/8212412-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8212412/pexels-photo-8212412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[4/5] lg:aspect-[2/3]",
    span: "lg:col-span-3",
    credits: [
      { k: "Klient", v: "Napa Soda" },
      { k: "Dom produkcyjny", v: "ArtHouse" },
      { k: "Format", v: "1:1 / 9:16 / 16:9" },
      { k: "Wersje", v: "6 cutów" },
    ],
  },
  {
    id: "nocna-zmiana",
    index: "06",
    title: "Nocna Zmiana",
    client: "KVIT",
    category: "music",
    year: "2025",
    role: "Edit · Grade · Motion",
    length: "3:12",
    views: "640K",
    retention: "71%",
    description:
      "Teledysk kręcony światłem rur LED. Montaż na off-beat, flash-cut transitions i graining pod analogową taśmę 16mm.",
    tags: ["After Effects", "Film Grain", "Light Sync"],
    src: "https://videos.pexels.com/video-files/7669226/7669226-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/7669226/pexels-photo-7669226.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[16/10]",
    span: "lg:col-span-4",
    credits: [
      { k: "Artysta", v: "KVIT" },
      { k: "Wytwórnia", v: "Niski Ton" },
      { k: "Look", v: "16mm emulation" },
      { k: "Czas", v: "12 dni" },
    ],
  },
  {
    id: "behind-the-cut",
    index: "07",
    title: "Behind the Cut",
    client: "Case study",
    category: "long",
    year: "2026",
    role: "Process breakdown",
    length: "12:06",
    views: "410K",
    retention: "69%",
    description:
      "Rozbicie całego workflow na ekranie: od ingestu i proxy, przez rough cut, po kolor i eksport. Film edukacyjny dla twórców.",
    tags: ["Workflow", "Proxy", "Frame.io", "Edukacja"],
    src: "https://videos.pexels.com/video-files/36036743/15283012_1920_1080_60fps.mp4",
    poster:
      "https://images.pexels.com/videos/36036743/pexels-photo-36036743.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[16/10]",
    span: "lg:col-span-4",
    credits: [
      { k: "Typ", v: "Case study" },
      { k: "NLE", v: "Resolve 19" },
      { k: "Format", v: "16:9 · 60fps" },
      { k: "Wersje", v: "PL / EN" },
    ],
  },
  {
    id: "park-sessions",
    index: "08",
    title: "Park Sessions",
    client: "Britannia Skate",
    category: "music",
    year: "2024",
    role: "Edit · Sound",
    length: "2:41",
    views: "980K",
    retention: "74%",
    description:
      "Kompilacja sesji skate zmontowana pod lo-fi breakbeat. Rytm cięć narasta z każdą zwrotką, finał na jednym długim ujęciu.",
    tags: ["Beat Sync", "Sound Design", "980K Views"],
    src: "https://videos.pexels.com/video-files/11331072/11331072-hd_1920_1080_24fps.mp4",
    poster:
      "https://images.pexels.com/videos/11331072/britannia-british-columbia-canada-commercial-drive-11331072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[16/10]",
    span: "lg:col-span-4",
    credits: [
      { k: "Klient", v: "Britannia Skate" },
      { k: "Muzyka", v: "Original score" },
      { k: "Format", v: "16:9 · 24fps" },
      { k: "Lokalizacja", v: "Kanada" },
    ],
  },
  {
    id: "shenzhen-24h",
    index: "09",
    title: "Shenzhen 24H",
    client: "LayG Travel",
    category: "long",
    year: "2026",
    role: "Edit · Color · Grade",
    length: "24:10",
    views: "5.3M",
    retention: "66%",
    description:
      "Cinematic travel film z nocnego Shenzhen: laser show, ruch uliczny i długie ekspozycje. Pełen grading w Resolve z node'ową strukturą pod HDR.",
    tags: ["Cinematic", "HDR Grade", "5.3M Views", "Featured"],
    src: "https://videos.pexels.com/video-files/35987652/15259594_3840_2160_60fps.mp4",
    poster:
      "https://images.pexels.com/videos/35987652/china-travel-shenzhen-shenzhen-china-travel-shenzhen-city-tour-shenzhen-city-vibes-35987652.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    media: "aspect-[16/9] lg:aspect-[21/9]",
    span: "lg:col-span-12",
    credits: [
      { k: "Klient", v: "LayG Travel" },
      { k: "Materiał", v: "18h · 6K" },
      { k: "Format", v: "2.39:1 · HDR10" },
      { k: "Czas", v: "3 tygodnie" },
    ],
  },
];

export const CATEGORIES = (
  [
    { id: "all", label: "Wszystko" },
    { id: "short", label: "Short-form / Reels" },
    { id: "long", label: "Long-form / YouTube" },
    { id: "commercial", label: "Commercials" },
    { id: "music", label: "Teledyski" },
  ] as const
).map((c) => ({
  ...c,
  count: c.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c.id).length,
}));

export const STATS = [
  { value: 50, prefix: "+", suffix: "M", label: "Łącznych wyświetleń", sub: "od 2019, wszystkie platformy" },
  { value: 100, prefix: "", suffix: "+", label: "Zmontowanych filmów", sub: "long-form, short-form, spots" },
  { value: 99.8, prefix: "", suffix: "%", label: "Zadowolonych klientów", sub: "retencja uwagi średnio 71%" },
  { value: 48, prefix: "", suffix: "h", label: "Średni czas dostawy", sub: "od uploadu materiału" },
];

export const TOOLS = [
  { name: "Premiere Pro", level: 98, note: "główny NLE · 7 lat", tint: "#9d8cff" },
  { name: "DaVinci Resolve", level: 94, note: "kolor · node grading", tint: "#ff4d3d" },
  { name: "After Effects", level: 88, note: "motion · tracking", tint: "#58d3c6" },
  { name: "CapCut Pro", level: 92, note: "vertical · captions", tint: "#c3e86b" },
  { name: "Sound Design", level: 90, note: "Foley · mix · LUFS", tint: "#ffb454" },
  { name: "Motion Graphics", level: 85, note: "titles · lower thirds", tint: "#9d8cff" },
  { name: "Color Grading", level: 96, note: "HDR · film emulation", tint: "#58d3c6" },
  { name: "Frame.io", level: 99, note: "review · komentarze", tint: "#ff4d3d" },
];

export const TICKER = [
  "JUMP CUTS",
  "BEAT SYNC",
  "COLOR GRADING",
  "SOUND DESIGN",
  "SPEED RAMPS",
  "MOTION TRACKING",
  "CAPTIONS",
  "PROXY WORKFLOW",
  "STORYTELLING",
  "HOOK DESIGN",
  "L-CUT / J-CUT",
  "FILM GRAIN",
];

export const PROCESS = [
  {
    n: "01",
    t: "Brief & ingest",
    d: "Krótki call, cel filmu i referencje. Materiał ląduje na dysku, robię proxy i transkrypcję — wiem, co masz w ujęciach, zanim zacznę ciąć.",
    meta: "24h",
  },
  {
    n: "02",
    t: "Rough cut",
    d: "Struktura i rytm. Wybieram najlepsze momenty, układam narrację, dostajesz pierwszy cut z placeholderową muzyką.",
    meta: "2–3 dni",
  },
  {
    n: "03",
    t: "Fine cut & motion",
    d: "Cięcia na klatkę, motion graphics, captions, przejścia, tempo. Rundki poprawek przez Frame.io z komentarzami w czasie.",
    meta: "2 rundy",
  },
  {
    n: "04",
    t: "Kolor, dźwięk, delivery",
    d: "Grading, miks do -14 LUFS, eksporty pod każdą platformę plus wersje vertical. Paczka projektowa zostaje u Ciebie.",
    meta: "48h",
  },
];

export const TESTIMONIALS = [
  {
    q: "Oddał film, który utrzymał 62% retencji przy 18 minutach. Nasz kanał nie miał takiego wyniku od dwóch lat.",
    n: "Ada Kamińska",
    r: "Producerka, Długa Droga",
    i: "AK",
    tint: "#ffb454",
  },
  {
    q: "Montaż na klatkę. Pierwsza wersja była praktycznie finalna — poprawki zamknęliśmy w jednej rundzie.",
    n: "Tomasz Rey",
    r: "Creative Director, Studio Północ",
    i: "TR",
    tint: "#58d3c6",
  },
  {
    q: "Nasze Reelsy weszły na 3.4M wyświetleń. Hooki, które zaproponował, działają lepiej niż nasze własne scenariusze.",
    n: "Lena Marzec",
    r: "Creator, 480K followers",
    i: "LM",
    tint: "#9d8cff",
  },
  {
    q: "Kolor, którego szukałem od lat. Spot wygląda jak wysokobudżetowa produkcja, a był kręcony z ręki w nocy.",
    n: "Marek Ostrowski",
    r: "Head of Brand, Aurora Motors",
    i: "MO",
    tint: "#ff4d3d",
  },
  {
    q: "Komunikacja na poziomie agencji, tempo na poziomie freelancera z głodem. Dostawa zawsze przed deadlinem.",
    n: "Julia Sato",
    r: "Marketing Lead, Napa Soda",
    i: "JS",
    tint: "#c3e86b",
  },
  {
    q: "Zrozumiał muzykę lepiej niż nasz reżyser. Teledysk ma 640K bez jednej złotówki w reklamy.",
    n: "KVIT",
    r: "Artysta, Niski Ton",
    i: "KV",
    tint: "#58d3c6",
  },
];

export const SOCIALS = [
  { id: "yt", label: "YouTube", handle: "@wronacuts", href: "https://youtube.com" },
  { id: "x", label: "X", handle: "@wronacuts", href: "https://x.com" },
  { id: "ig", label: "Instagram", handle: "@wrona.cuts", href: "https://instagram.com" },
  { id: "vm", label: "Vimeo", handle: "/mikołajwrona", href: "https://vimeo.com" },
  { id: "tg", label: "Telegram", handle: "@wronacuts", href: "https://telegram.org" },
];

export const CONTACT = {
  name: "Mikołaj Wrona",
  role: "Video Editor / Montażysta",
  email: "hello@wronacuts.com",
  city: "Warszawa, PL",
  tz: "Europe/Warsaw",
  availability: "2 sloty na marzec 2026",
};
