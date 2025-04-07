import { useTranslations } from "next-intl";
import { OptimizedImage } from "@/components/ui/optimized-image";

export default function Location() {
  const t = useTranslations("location");

  return (
    <section className="py-32">
      <div className="relative mx-auto max-w-7xl px-4">
        <h2 className="absolute -top-8 z-20 w-full text-center font-serif text-[2.5rem] uppercase">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5 md:gap-16">
          <div className="order-2 text-center md:order-1 md:col-span-1">
            <h3 className="text-sm font-medium uppercase tracking-wider">
              {t("venue.name")}
            </h3>
            <p className="text-xs uppercase tracking-wider">
              {t("venue.type")}
            </p>
          </div>
          <div className="order-1 mx-auto w-[80%] md:order-2 md:col-span-3">
            <OptimizedImage
              src="/images/location.jpg"
              alt={t("venue.name")}
              className="aspect-[3/4] w-full object-cover grayscale"
              width={800}
              height={1200}
              sizes="(max-width: 768px) 80vw, 60vw"
            />
          </div>
          <div className="order-3 text-center md:col-span-1">
            <h3 className="text-sm font-medium uppercase tracking-wider">
              {t("address.city")}
            </h3>
            <p className="text-xs uppercase tracking-wider">
              {t("address.region")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
