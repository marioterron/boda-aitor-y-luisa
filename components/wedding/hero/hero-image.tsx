import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function HeroImage({ src, alt, priority = false }: HeroImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={1200}
      priority={priority}
      className="w-full aspect-[3/4] object-cover grayscale"
    />
  );
}
