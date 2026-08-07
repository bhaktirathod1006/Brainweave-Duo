import { useEffect, useRef } from "react";
import mittiLogo from "@/assets/mitti_logo2-2.png.asset.json";

const BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85";
const FRONT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4";
const OVERLAY_IMAGE =
  "https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png";

export default function MeasuredHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const grid = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      grid.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      grid.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    };

    const tick = () => {
      grid.x += (grid.tx - grid.x) * 0.06;
      grid.y += (grid.ty - grid.y) * 0.06;

      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${grid.x}px, ${grid.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    section.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="bg-white">
      <section
        ref={sectionRef}
        className="font-helvetica-neue relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
      >
        <div ref={gridRef} className="absolute inset-0 z-0 opacity-10">
          <svg className="h-full w-full">
            <defs>
              <pattern id="measured-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#measured-grid)" />
          </svg>
        </div>

        <div
          className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        <img
          src={mittiLogo.url}
          alt="Mitti logo"
          className="absolute left-5 top-5 z-40 h-12 w-12 rounded-2xl object-contain sm:h-14 sm:w-14"
        />

        <h1 className="absolute inset-x-0 top-20 z-20 flex items-center justify-between px-6 text-center leading-[0.95] text-white sm:top-24 sm:px-10 md:top-24 md:px-14 lg:px-20">
          <span className="font-teko shrink-0 text-[3.5rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[11.5rem]">
            मिट्टी
          </span>
          <span className="shrink-0 text-[2.5rem] opacity-70 sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            -
          </span>
          <span className="font-instrument shrink-0 text-[2.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">
            MITTI
          </span>
        </h1>

        <img
          src={OVERLAY_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] h-full w-full object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{ clipPath: "inset(40% 0 0 0)" }}
        >
          <video
            src={FRONT_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-x-0 bottom-10 z-40 flex flex-wrap items-center justify-center gap-3 px-6 sm:bottom-14 sm:gap-4">
          <button className="liquid-glass rounded-full bg-emerald-400/15 px-6 py-3 text-sm font-medium text-emerald-50 transition-colors hover:bg-emerald-400/25 sm:text-base">
            Plant a Forest
          </button>
          <button className="liquid-glass rounded-full bg-amber-900/25 px-6 py-3 text-sm font-medium text-amber-50 transition-colors hover:bg-amber-800/35 sm:text-base">
            I already have one
          </button>
        </div>
      </section>
    </div>
  );
}
