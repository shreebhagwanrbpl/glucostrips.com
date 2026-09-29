"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Video as VideoIcon,
  ImageIcon,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button1Link: "",
    button2Text: "",
    button2Link: "",
  });
  const [mediaList, setMediaList] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next (slide left), -1 = prev (slide right)
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Parse Firestore Data into standard media items matching the admin panel
  const parseMediaFromData = (d) => {
    const list = [];
    if (Array.isArray(d?.media) && d.media.length > 0) {
      d.media.forEach((item, idx) => {
        const url = typeof item === "string" ? item : item?.url;
        const type =
          item?.type ||
          (url?.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ? "video" : "image");
        if (url) {
          list.push({
            id: `media-${idx}-${url.slice(-8)}`,
            type,
            url,
            storagePath: item?.storagePath || "",
            name: item?.name || "",
          });
        }
      });
    } else {
      // Fallback for older format: images array
      if (Array.isArray(d?.images) && d.images.length > 0) {
        d.images.forEach((url, idx) => {
          if (url) {
            list.push({
              id: `img-${idx}`,
              type: "image",
              url,
            });
          }
        });
      } else if (d?.imageUrl || d?.image) {
        const img = d.imageUrl || d.image;
        if (img) {
          list.push({
            id: "img-0",
            type: "image",
            url: img,
          });
        }
      }

      // Fallback for older format: videos array
      if (Array.isArray(d?.videos) && d.videos.length > 0) {
        d.videos.forEach((vUrl, idx) => {
          if (vUrl) {
            list.push({
              id: `vid-${idx}`,
              type: "video",
              url: vUrl,
            });
          }
        });
      } else if (d?.videoUrl) {
        list.push({
          id: "vid-0",
          type: "video",
          url: d.videoUrl,
        });
      }
    }

    // Default fallback if no media found in Firestore
    if (list.length === 0) {
      list.push({
        id: "default-fallback-img",
        type: "image",
        url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1900&auto=format&fit=crop",
      });
    }

    return list;
  };

  useEffect(() => { fetch("/api/site-data?page=home", {cache:"no-store"}).then(r=>r.json()).then(d=>{ if(d && Object.keys(d).length) setHeroData(d); }).catch(console.error).finally(()=>setLoading(false)); }, []);

  // Preload all carousel images immediately so there is ZERO black screen or loading delay on first slide
  useEffect(() => {
    if (mediaList.length > 0 && typeof window !== "undefined") {
      mediaList.forEach((item) => {
        if (item.type === "image" && item.url) {
          const img = new window.Image();
          img.src = item.url;
        }
      });
    }
  }, [mediaList]);

  const nextSlide = useCallback(() => {
    if (mediaList.length <= 1) return;
    setPrevSlideIndex(activeSlideIndex);
    setDirection(1);
    setActiveSlideIndex((prev) => (prev + 1) % mediaList.length);
  }, [mediaList.length, activeSlideIndex]);

  const prevSlide = useCallback(() => {
    if (mediaList.length <= 1) return;
    setPrevSlideIndex(activeSlideIndex);
    setDirection(-1);
    setActiveSlideIndex(
      (prev) => (prev - 1 + mediaList.length) % mediaList.length
    );
  }, [mediaList.length, activeSlideIndex]);

  const goToSlide = (index) => {
    if (index === activeSlideIndex) return;
    setPrevSlideIndex(activeSlideIndex);
    setDirection(index > activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(index);
  };

  // Fast & snappy Auto-play Carousel Timer (3.5 seconds)
  useEffect(() => {
    if (isPaused || mediaList.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, mediaList.length, nextSlide]);

  // Derived active index to avoid synchronous setState inside effect
  const effectiveIndex =
    activeSlideIndex < mediaList.length ? activeSlideIndex : 0;
  const currentMedia = mediaList[effectiveIndex] || mediaList[0];
  const safePrevIndex = prevSlideIndex < mediaList.length ? prevSlideIndex : 0;
  const lastMedia = mediaList[safePrevIndex] || currentMedia;

  // Cinematic Smooth Crossfade & Scale Zoom Effect
  const fadeScaleVariants = {
    initial: {
      opacity: 0,
      scale: 1.06,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.98,
    },
  };

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // District Routing
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  const makeLink = (path) => {
    if (!path) return "/";
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return districtSlug ? `/${districtSlug}${cleanPath}` : cleanPath;
  };

  const isExternalLink = (url) => {
    return url?.startsWith("http://") || url?.startsWith("https://");
  };

  return (
    <section
      className="relative overflow-hidden min-h-[466px] sm:min-h-[506px] lg:min-h-[526px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero Carousel"
    >
      {/* HIDDEN PRELOAD CONTAINER: Ensures all slide images are 100% pre-decoded in browser cache */}
      <div
        className="absolute opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden"
        aria-hidden="true"
      >
        {mediaList.map((item, i) =>
          item.type === "image" ? (
            <Image
              key={`preload-${item.url || i}`}
              src={item.url}
              alt=""
              width={1920}
              height={800}
              priority
              unoptimized
            />
          ) : null
        )}
      </div>

      {/* BACKGROUND MEDIA SLIDES WITH SMOOTH CINEMATIC CROSSFADE */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#0e1117]">
        {/* Underlay layer: Keeps the previous slide image visible behind crossfade transitions so there is NEVER a black gap */}
        {lastMedia && (
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {lastMedia.type === "video" ? (
              <video
                src={lastMedia.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <Image
                src={lastMedia.url}
                alt=""
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
            )}
          </div>
        )}

        {/* Cinematic Crossfade & Scale Zoom Active Media Layer */}
        <AnimatePresence mode="wait">
          {currentMedia && (
            <motion.div
              key={`${currentMedia.url}-${effectiveIndex}`}
              variants={fadeScaleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.75,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="absolute inset-0 w-full h-full z-[1]"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              {currentMedia.type === "video" ? (
                <div className="relative w-full h-full overflow-hidden">
                  {/* Blurred Background Video */}
                  <video
                    src={currentMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-45"
                  />

                  {/* Main Video - Fully Visible */}
                  <video
                    src={currentMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative z-[1] w-full h-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  {/* Blurred Background Image */}
                  <Image
                    src={currentMedia.url}
                    alt=""
                    fill
                    unoptimized
                    priority
                    aria-hidden="true"
                    sizes="100vw"
                    className="object-cover scale-110 blur-3xl opacity-30 pointer-events-none"
                  />

                  {/* Main Image - Fully Visible */}
                  <Image
                    src={currentMedia.url}
                    alt={
                      heroData.title ||
                      `Glucostrips Slide ${effectiveIndex + 1}`
                    }
                    fill
                    priority
                    unoptimized
                    sizes="100vw"
                    className="relative z-[1] object-cover object-center"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEFT TEXT GRADIENT */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.58) 35%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0) 80%)",
          }}
        />

        {/* BOTTOM GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 z-[2] pointer-events-none" />
      </div>

      {/* FOREGROUND HERO CONTENT */}
      <div className="container-custom py-10 sm:py-12 lg:py-14 relative z-10 w-full">
        <div className="max-w-3xl lg:max-w-[55%]">
          {/* Badge & Media Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-2.5 mb-3.5 sm:mb-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#FFF6D6] shadow-lg backdrop-blur-md">
              <ShieldCheck size={15} className="text-[#F5BE32]" />
              <span>Multi-Category Biomedical Procurement</span>
            </div>

            {mediaList.length > 1 && currentMedia && (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {currentMedia.type === "video" ? (
                  <>
                    <VideoIcon size={12} className="text-red-400" />
                    <span>
                      Video {effectiveIndex + 1}/{mediaList.length}
                    </span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={12} className="text-amber-300" />
                    <span>
                      Slide {effectiveIndex + 1}/{mediaList.length}
                    </span>
                  </>
                )}
              </span>
            )}
          </motion.div>

          {/* Hero Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4.5xl lg:text-5xl font-extrabold leading-[1.14] text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-10 bg-white/20 rounded-lg w-[85%]"></div>
                <div className="h-10 bg-white/20 rounded-lg w-[65%]"></div>
              </div>
            ) : (
              <>
                {heroData.title ||
                  "Biomedical Products for Diagnostics, Laboratories & Clinical Care"}
                {city && (
                  <>
                    <span className="block mt-1 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#FFF6D6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </motion.h1>

          {/* Hero Subtitle / Description */}
          {loading ? (
            <div className="animate-pulse mt-4 space-y-2">
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-[85%]"></div>
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-base sm:text-lg lg:text-[18px] leading-relaxed text-white font-medium max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              {heroData.description ||
                "Source diagnostic kits, analyzers, laboratory instruments, patient-care equipment, reagents, strips, accessories and medical consumables through one biomedical procurement catalogue."}
              {city && (
                <>
                  {" "}across{" "}
                  <strong className="text-[#FFF6D6] font-bold">{city}</strong>
                </>
              )}
            </motion.p>
          )}

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            {loading ? (
              <>
                <div className="animate-pulse h-11 w-40 rounded-xl bg-white/20"></div>
                <div className="animate-pulse h-11 w-32 rounded-xl bg-white/20"></div>
              </>
            ) : (
              <>
                {/* Button 1 */}
                {heroData.button1Text &&
                  (isExternalLink(heroData.button1Link) ? (
                    <a
                      href={heroData.button1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-fuchsia-600 border-2 border-indigo-500 px-7 py-3 sm:px-8 sm:py-3.5 font-bold !text-white shadow-[0_6px_25px_rgba(79,70,229,0.45)] transition-all duration-300 hover:from-indigo-700 hover:to-fuchsia-700 hover:shadow-[0_8px_30px_rgba(79,70,229,0.55)] hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                    >
                      <span className="!text-white">
                        {heroData.button1Text}
                      </span>
                      <ArrowRight
                        size={17}
                        className="!text-white transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  ) : (
                    <Link
                      href={makeLink(heroData.button1Link || "/items")}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-fuchsia-600 border-2 border-indigo-500 px-7 py-3 sm:px-8 sm:py-3.5 font-bold !text-white shadow-[0_6px_25px_rgba(79,70,229,0.45)] transition-all duration-300 hover:from-indigo-700 hover:to-fuchsia-700 hover:shadow-[0_8px_30px_rgba(79,70,229,0.55)] hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                    >
                      <span className="!text-white">
                        {heroData.button1Text}
                      </span>
                      <ArrowRight
                        size={17}
                        className="!text-white transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  ))}

                {/* Button 2 */}
                {heroData.button2Text &&
                  (isExternalLink(heroData.button2Link) ? (
                    <a
                      href={heroData.button2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-white px-7 py-3 sm:px-8 sm:py-3.5 font-bold text-indigo-700 shadow-[0_6px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-[#FFF6D6] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                    >
                      {heroData.button2Text}
                    </a>
                  ) : (
                    <Link
                      href={makeLink(heroData.button2Link || "/contact")}
                      className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-white px-7 py-3 sm:px-8 sm:py-3.5 font-bold text-indigo-700 shadow-[0_6px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-[#FFF6D6] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                    >
                      {heroData.button2Text}
                    </Link>
                  ))}
              </>
            )}
          </motion.div>

          {/* Key Metrics / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 grid grid-cols-3 max-w-lg gap-4 sm:gap-6 border-t border-white/20 pt-4 backdrop-blur-[1px]"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                10+
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Categories
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                500+
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Products Supplied
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                100%
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm text-white/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Quality Certified
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CAROUSEL NAVIGATION CONTROLS (Only visible when > 1 slide) */}
      {mediaList.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-black/45 hover:bg-white text-white hover:text-indigo-700 border border-white/30 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-black/45 hover:bg-white text-white hover:text-indigo-700 border border-white/30 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>

          {/* Bottom Controls Bar: Dots + Auto-play toggle */}
          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/50 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xl">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {mediaList.map((slide, idx) => (
                <button
                  key={slide.id || idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    effectiveIndex === idx
                      ? "w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                      : "w-2 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Separator */}
            <div className="w-[1px] h-3 bg-white/25" />

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play Carousel" : "Pause Carousel"}
              className="text-white/80 hover:text-white transition-colors"
              title={isPaused ? "Resume auto-play" : "Pause auto-play"}
            >
              {isPaused ? <Play size={11} /> : <Pause size={11} />}
            </button>

            {/* Counter */}
            <span className="text-[10px] font-medium text-white/90 tracking-wider">
              {effectiveIndex + 1}/{mediaList.length}
            </span>
          </div>
        </>
      )}
    </section>
  );
}