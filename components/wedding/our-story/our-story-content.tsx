import Image from "next/image";
import { useTranslations } from "next-intl";
import { WEDDING_DETAILS } from "@/constants/wedding";

export function OurStoryContent() {
  const t = useTranslations("ourStory.content");
  const commonT = useTranslations("common.images");

  return (
    <section className="container mx-auto px-4 pb-16 max-w-7xl">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/story/main.jpeg"
              alt={commonT("couple.mainImage")}
              fill
              className="object-cover grayscale"
              priority
            />
          </div>
          <div className="space-y-12 flex flex-col justify-center h-full">
            <p className="text-gray-700 leading-relaxed text-md md:text-lg">
              {t("text1")}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story/couple-1.jpeg"
                  alt={commonT("couple.firstImage")}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story/couple-2.jpeg"
                  alt={commonT("couple.secondImage")}
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
        <h2 className="uppercase font-serif text-[40px] sm:text-[60px] md:text-[100px] lg:text-[120px] text-gray-200 tracking-wider text-center leading-none md:absolute w-full z-20 md:-bottom-14">
          {t("coupleNames", {
            couple: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}`,
          })}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-32">
        <div className="max-w-5xl mx-auto mb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-gray-700 leading-relaxed text-md md:text-lg text-center">
              {t("text2")}
            </p>
          </div>
          <div className="relative aspect-[16/9] w-full mt-24">
            <Image
              src="/images/story/couple-3.jpeg"
              alt={commonT("couple.thirdImage")}
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        <p className="text-gray-700 leading-relaxed text-md md:text-lg text-center">
          {t("text3")}
        </p>

        <p className="text-gray-700 leading-relaxed text-md md:text-lg text-center">
          {t("text4")}
        </p>
      </div>
      <div className="max-w-xl mx-auto mt-16 md:mt-24">
        <div className="relative aspect-square w-full">
          <Image
            src="/images/story/couple-4.jpeg"
            alt={commonT("couple.fourthImage")}
            fill
            className="object-cover grayscale rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
