import { ReactNode } from "react";
import { useParams } from "react-router-dom";

interface HeroBannerProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  minHeight?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  overlayOpacity?: "light" | "medium" | "dark";
}

const HeroBanner = ({
  imageUrl,
  title,
  subtitle,
  children,
  minHeight = "md",
  align = "left",
  overlayOpacity = "medium",
}: HeroBannerProps) => {
  const { lang } = useParams<{ lang: string }>();
  const isRTL = lang === "he";

  const heightClasses = {
    sm: "min-h-[360px]",
    md: "min-h-[480px]",
    lg: "min-h-[520px]",
  };

  const alignClasses = {
    left: isRTL ? "items-end text-end" : "items-start text-start",
    center: "items-center text-center",
    right: isRTL ? "items-start text-start" : "items-end text-end",
  };

  const overlayClasses = {
    light: "from-foreground/60 to-foreground/30",
    medium: "from-foreground/80 to-foreground/40",
    dark: "from-foreground/90 to-foreground/50",
  };

  return (
    <section 
      className={`relative w-full ${heightClasses[minHeight]} flex flex-col justify-end overflow-hidden`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Top Overlay - Dark gradient on image */}
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayClasses[overlayOpacity]}`} />
        {/* Bottom Fade - Gradient into page background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--hero-fade)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className={`container mx-auto px-4 pb-12 md:pb-16 max-w-4xl flex flex-col ${alignClasses[align]} gap-6`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
