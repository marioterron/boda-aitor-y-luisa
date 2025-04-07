import { OptimizedImage } from "@/components/ui/optimized-image";

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function HeroImage({ src, alt, priority = false }: HeroImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={1200}
      priority={priority}
      quality={90}
      className="aspect-[3/4] w-full grayscale"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
