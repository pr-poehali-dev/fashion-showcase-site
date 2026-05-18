import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/60d4cafb-e09d-4d1e-9464-405540b9c86d.jpg";
const CONCEPT_IMG = "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/07fb782e-ef2a-4ec3-a3a4-20428116ddec.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "OVERSIZED VOID JACKET",
    price: "18 900 ₽",
    category: "верхняя одежда",
    tag: "new",
    img: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/0fda7e10-dafe-4c7a-80ac-853dd232e7ba.jpg",
    img2: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/60d4cafb-e09d-4d1e-9464-405540b9c86d.jpg",
  },
  {
    id: 2,
    name: "BRUTAL CARGO PANTS",
    price: "12 400 ₽",
    category: "брюки",
    tag: "bestseller",
    img: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/60d4cafb-e09d-4d1e-9464-405540b9c86d.jpg",
    img2: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/0fda7e10-dafe-4c7a-80ac-853dd232e7ba.jpg",
  },
  {
    id: 3,
    name: "NEON STRAP DRESS",
    price: "9 800 ₽",
    category: "платья",
    tag: "new",
    img: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/07fb782e-ef2a-4ec3-a3a4-20428116ddec.jpg",
    img2: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/60d4cafb-e09d-4d1e-9464-405540b9c86d.jpg",
  },
  {
    id: 4,
    name: "VOID GRAPHIC TEE",
    price: "4 200 ₽",
    category: "футболки",
    tag: "",
    img: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/0fda7e10-dafe-4c7a-80ac-853dd232e7ba.jpg",
    img2: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/07fb782e-ef2a-4ec3-a3a4-20428116ddec.jpg",
  },
  {
    id: 5,
    name: "LAYERED LINEN COAT",
    price: "24 500 ₽",
    category: "верхняя одежда",
    tag: "limited",
    img: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/60d4cafb-e09d-4d1e-9464-405540b9c86d.jpg",
    img2: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/0fda7e10-dafe-4c7a-80ac-853dd232e7ba.jpg",
  },
  {
    id: 6,
    name: "ASYMMETRIC SKIRT",
    price: "7 600 ₽",
    category: "юбки",
    tag: "",
    img: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/07fb782e-ef2a-4ec3-a3a4-20428116ddec.jpg",
    img2: "https://cdn.poehali.dev/projects/29d8e41e-d72d-46b2-a137-2800799cac85/files/60d4cafb-e09d-4d1e-9464-405540b9c86d.jpg",
  },
];

const CATEGORIES = ["все", "верхняя одежда", "брюки", "платья", "футболки", "юбки"];

function useParallax(ref: React.RefObject<HTMLElement>, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const img = el.querySelector(".parallax-img") as HTMLElement;
      if (img) img.style.transform = `scale(1.12) translateY(${center * speed}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useParallax(ref as React.RefObject<HTMLElement>, 0.1);

  useEffect(() => {
    setLoaded(true);
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Animated background image with parallax + mouse tilt */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="parallax-img absolute inset-0 scale-110 transition-transform duration-75"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(1.12) translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            filter: "brightness(0.35) contrast(1.2) saturate(0.6)",
            transition: "transform 0.12s ease-out",
          }}
        />
        {/* Animated noise grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />
        {/* Neon gradient wash */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(232,255,0,0.06) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <div
          className={`font-oswald text-2xl tracking-[0.3em] text-neon font-bold transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          style={{ textShadow: "0 0 30px rgba(232,255,0,0.5)" }}
        >
          VOID
        </div>
        <div className={`flex gap-8 font-mono-custom text-xs tracking-widest text-white/50 transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <a href="#concept" className="hover:text-neon transition-colors duration-300">КОНЦЕПЦИЯ</a>
          <a href="#catalog" className="hover:text-neon transition-colors duration-300">КАТАЛОГ</a>
          <a href="#" className="hover:text-neon transition-colors duration-300">КОНТАКТ</a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-8 pb-16 max-w-6xl">
        <div className={`transition-all duration-1000 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-mono-custom text-xs tracking-[0.4em] text-neon mb-4 uppercase">
            SS 2026 — Коллекция
          </p>
        </div>
        <div
          className={`transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{
            transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
            transition: "transform 0.2s ease-out, opacity 1s ease, translateY 1s ease",
          }}
        >
          <h1 className="font-oswald text-[clamp(5rem,15vw,14rem)] leading-none tracking-tight text-white font-bold">
            В О И Д
          </h1>
        </div>
        <div className={`transition-all duration-1000 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="font-cormorant text-xl italic text-white/60 mt-4 max-w-md leading-relaxed">
            Пустота как форма. Отсутствие как высказывание.<br />
            Одежда для тех, кто не нуждается в объяснениях.
          </p>
        </div>
        <div className={`flex items-center gap-6 mt-10 transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <a
            href="#catalog"
            className="font-oswald tracking-widest text-sm bg-neon text-black px-8 py-3 hover:bg-white transition-colors duration-300 uppercase"
          >
            Смотреть коллекцию
          </a>
          <a href="#concept" className="font-mono-custom text-xs tracking-widest text-white/40 hover:text-neon transition-colors duration-300 border-b border-white/20 hover:border-neon pb-0.5">
            Узнать больше →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-neon animate-pulse" />
        <span className="font-mono-custom text-[10px] tracking-widest text-white/30 rotate-90 origin-center mt-2">SCROLL</span>
      </div>
    </section>
  );
}

function ConceptSection() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  useParallax(imgRef as React.RefObject<HTMLElement>, 0.12);

  return (
    <section id="concept" ref={ref} className="relative bg-black py-32 px-8 overflow-hidden">
      {/* Large bg text */}
      <div
        className="absolute top-0 left-0 font-oswald text-[20vw] leading-none text-white/[0.02] pointer-events-none select-none"
        style={{ top: "-2vw" }}
      >
        CONCEPT
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image with living effects */}
        <div ref={imgRef} className="relative group overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={CONCEPT_IMG}
            alt="Концепция коллекции"
            className="parallax-img w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
            style={{ filter: "contrast(1.1) saturate(0.8)" }}
          />
          {/* Color-shift overlay on hover */}
          <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/10 transition-all duration-700 mix-blend-color-dodge" />
          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
            }}
          />
          {/* Glitch border on hover */}
          <div className="absolute inset-0 border border-neon/0 group-hover:border-neon/60 transition-all duration-500" />
          <div className="absolute -bottom-px -right-px w-12 h-12 border-b-2 border-r-2 border-neon" />
          <div className="absolute -top-px -left-px w-12 h-12 border-t-2 border-l-2 border-neon" />
        </div>

        {/* Text */}
        <div className="space-y-8">
          <div>
            <p className="font-mono-custom text-xs tracking-[0.4em] text-neon mb-4">01 / ВДОХНОВЕНИЕ</p>
            <h2 className="font-oswald text-6xl font-bold text-white leading-none mb-6">
              ИЗ<br />ПУСТОТЫ<br />ФОРМА
            </h2>
          </div>
          <div className="space-y-4 border-l-2 border-neon/30 pl-6">
            <p className="font-cormorant text-lg italic text-white/70 leading-relaxed">
              Вдохновлённая японской эстетикой ма — искусством паузы и промежутка — коллекция VOID исследует пространство между движением и покоем.
            </p>
            <p className="font-mono-custom text-sm text-white/50 leading-relaxed">
              Каждая вещь — это высказывание через отсутствие. Оверсайз-силуэты, монохромные объёмы, детали появляются там, где их не ждёшь.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[["12", "СИЛУЭТОВ"], ["3", "ЦВЕТА"], ["SS26", "СЕЗОН"]].map(([num, label]) => (
              <div key={label} className="border border-white/10 p-4 hover:border-neon/50 transition-colors duration-300">
                <div className="font-oswald text-3xl text-neon font-bold">{num}</div>
                <div className="font-mono-custom text-[10px] tracking-widest text-white/40 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 14,
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-crosshair"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "3/4",
          transform: hovered ? `perspective(800px) rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)` : "perspective(800px) rotateX(0) rotateY(0)",
          transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
      >
        {/* Primary image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
          style={{ filter: "contrast(1.05) saturate(0.85)" }}
        />
        {/* Secondary image fade */}
        <img
          src={product.img2}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
          style={{ filter: "contrast(1.1)" }}
        />
        {/* Neon glare on hover following mouse */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${50 + mousePos.x * 3}% ${50 + mousePos.y * 3}%, rgba(232,255,0,0.15) 0%, transparent 60%)`,
          }}
        />
        {/* Scan lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(232,255,0,0.08) 3px, rgba(232,255,0,0.08) 4px)",
          }}
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag */}
        {product.tag && (
          <div className={`absolute top-3 left-3 font-mono-custom text-[9px] tracking-widest px-2 py-1 uppercase ${product.tag === "limited" ? "bg-white text-black" : "bg-neon text-black"}`}>
            {product.tag}
          </div>
        )}

        {/* Quick add on hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button className="w-full font-oswald text-xs tracking-widest bg-neon text-black py-2 hover:bg-white transition-colors duration-200 uppercase">
            В корзину
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 space-y-1">
        <p className="font-mono-custom text-[10px] tracking-widest text-white/30 uppercase">{product.category}</p>
        <h3 className="font-oswald text-base tracking-wide text-white group-hover:text-neon transition-colors duration-300 leading-tight">
          {product.name}
        </h3>
        <p className="font-mono-custom text-sm text-white/60">{product.price}</p>
      </div>
    </div>
  );
}

function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState("все");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "все" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="catalog" className="bg-black py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="font-mono-custom text-xs tracking-[0.4em] text-neon mb-3">02 / КАТАЛОГ</p>
            <h2 className="font-oswald text-6xl font-bold text-white leading-none">
              КОЛЛЕКЦИЯ<br /><span className="text-neon neon-glow">SS 2026</span>
            </h2>
          </div>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="ПОИСК..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-mono-custom text-xs tracking-widest bg-transparent border border-white/20 focus:border-neon text-white placeholder-white/30 px-4 py-3 w-56 outline-none transition-colors duration-300"
            />
            <Icon name="Search" size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono-custom text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-neon text-black border-neon"
                  : "bg-transparent text-white/50 border-white/20 hover:border-neon/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "both" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-oswald text-4xl text-white/20">НИЧЕГО НЕ НАЙДЕНО</p>
          </div>
        )}
      </div>
    </section>
  );
}

function MarqueeBar() {
  const items = ["SS 2026", "VOID COLLECTION", "НОВАЯ ВОЛНА", "12 СИЛУЭТОВ", "ОГРАНИЧЕННЫЙ ТИРАЖ", "АВАНГАРД"];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-neon/30 py-3 bg-black">
      <div className="marquee-track flex gap-12 w-max">
        {repeated.map((item, i) => (
          <span key={i} className="font-oswald text-sm tracking-[0.3em] text-neon/70 flex items-center gap-12 whitespace-nowrap">
            {item}
            <span className="text-neon/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-8 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-oswald text-3xl tracking-[0.3em] text-neon font-bold mb-2" style={{ textShadow: "0 0 20px rgba(232,255,0,0.4)" }}>
            VOID
          </div>
          <p className="font-mono-custom text-xs text-white/30 tracking-widest">SS 2026 COLLECTION</p>
        </div>
        <div className="flex gap-12">
          {[["Коллекция", ["Все вещи", "Новинки", "Лимитед"]], ["Бренд", ["Концепция", "Контакт", "Instagram"]]].map(([title, links]) => (
            <div key={title as string}>
              <p className="font-mono-custom text-[10px] tracking-widest text-neon/60 uppercase mb-3">{title as string}</p>
              <div className="space-y-2">
                {(links as string[]).map((l) => (
                  <a key={l} href="#" className="block font-mono-custom text-xs text-white/40 hover:text-white transition-colors duration-300">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5">
        <p className="font-mono-custom text-[10px] text-white/20 tracking-widest">© 2026 VOID. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="grain-overlay" style={{ background: "#0a0a0a" }}>
      <HeroSection />
      <MarqueeBar />
      <ConceptSection />
      <MarqueeBar />
      <CatalogSection />
      <Footer />
    </div>
  );
}
