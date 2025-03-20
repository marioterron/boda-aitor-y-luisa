import { useTranslations } from "next-intl";

export default function Location() {
  const t = useTranslations("location");

  return (
    <section className="py-32">
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="uppercase font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-8 md:gap-16">
          <div className="text-center md:col-span-1 order-2 md:order-1">
            <h3 className="uppercase text-sm font-medium tracking-wider">
              {t("venue.name")}
            </h3>
            <p className="uppercase text-xs tracking-wider">
              {t("venue.type")}
            </p>
          </div>

          <div className="w-[80%] mx-auto md:col-span-3 order-1 md:order-2">
            <img
              src="/images/location.jpg"
              alt={t("venue.name")}
              className="w-full aspect-[3/4] object-cover grayscale"
            />
          </div>

          <div className="text-center md:col-span-1 order-3">
            <h3 className="uppercase text-sm font-medium tracking-wider">
              {t("address.city")}
            </h3>
            <p className="uppercase text-xs tracking-wider">
              {t("address.region")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
