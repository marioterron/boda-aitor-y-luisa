import { useTranslations } from "next-intl";
import { WEDDING_DETAILS } from "@/constants/wedding";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function OurStoryContent() {
  const t = useTranslations("ourStory.content");
  const commonT = useTranslations("common.images");

  return (
    <section className="container mx-auto max-w-7xl px-4 pb-16">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full">
            <OptimizedImage
              src="/images/story/main.jpeg"
              alt={commonT("couple.mainImage")}
              width={800}
              height={1000}
              className="h-full w-full object-cover grayscale"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              isBackground
            />
          </div>
          <div className="flex h-full flex-col justify-center space-y-12">
            <p className="text-md leading-relaxed text-gray-700 md:text-lg">
              {t("text1")}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative aspect-square w-full">
                <OptimizedImage
                  src="/images/story/couple-1.jpeg"
                  alt={commonT("couple.firstImage")}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover grayscale"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  isBackground
                />
              </div>
              <div className="relative aspect-square w-full">
                <OptimizedImage
                  src="/images/story/couple-2.jpeg"
                  alt={commonT("couple.secondImage")}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover grayscale"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  isBackground
                />
              </div>
            </div>
          </div>
        </div>
        <h2 className="z-20 w-full text-center font-serif text-[40px] uppercase leading-none tracking-wider text-gray-200 sm:text-[60px] md:absolute md:-bottom-14 md:text-[100px] lg:text-[120px]">
          {t("coupleNames", {
            couple: `${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
          })}
        </h2>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-4 md:mt-32">
        <div className="mx-auto mb-24 max-w-5xl">
          <div className="mx-auto max-w-3xl space-y-8">
            <p className="text-md text-center leading-relaxed text-gray-700 md:text-lg">
              {t("text2")}
            </p>
          </div>
          <div className="relative mt-24 aspect-[16/9] w-full">
            <OptimizedImage
              src="/images/story/couple-3.jpeg"
              alt={commonT("couple.thirdImage")}
              width={1200}
              height={675}
              className="h-full w-full object-cover grayscale"
              sizes="100vw"
              isBackground
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-8">
        <p className="text-md text-center leading-relaxed text-gray-700 md:text-lg">
          {t("text3")}
        </p>

        <p className="text-md text-center leading-relaxed text-gray-700 md:text-lg">
          {t("text4")}
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-xl md:mt-24">
        <div className="relative aspect-square w-full">
          <OptimizedImage
            src="/images/story/couple-4.jpeg"
            alt={commonT("couple.fourthImage")}
            width={800}
            height={800}
            className="h-full w-full object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 50vw"
            isBackground
          />
        </div>
      </div>
    </section>
  );
}
