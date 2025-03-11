import Image from "next/image";

export function OurStoryContent() {
  return (
    <section className="container mx-auto px-4 pb-16 max-w-7xl">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/story/main.jpeg"
              alt="Aitor and Luisa with their dogs"
              fill
              className="object-cover grayscale"
              priority
            />
          </div>
          <div className="space-y-12 flex flex-col justify-center h-full">
            <p className="text-gray-700 leading-relaxed text-md md:text-lg">
              Our journey began like any other day. Two paths converging at the
              crossroads of life. In a city filled with countless faces, it was
              a seemingly ordinary moment that sparked our extraordinary love
              story.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story/couple-1.jpeg"
                  alt="Aitor and Luisa walking"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/story/couple-2.jpeg"
                  alt="Aitor and Luisa with their dogs"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
        <h2 className="font-serif text-[40px] sm:text-[60px] md:text-[100px] lg:text-[120px] text-gray-200 tracking-wider text-center leading-none md:absolute w-full z-20 md:-bottom-14">
          AITOR & LUISA
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-32">
        <div className="max-w-5xl mx-auto mb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-gray-700 leading-relaxed text-md md:text-lg text-center">
              Our love story wouldn't be complete without mentioning our two
              loyal Dalmatian dogs, Max and Bella. They've been with us through
              thick and thin, bringing joy and laughter to our lives with their
              spots and wagging tails.
            </p>
          </div>
          <div className="relative aspect-[16/9] w-full mt-24">
            <Image
              src="/images/story/couple-3.jpeg"
              alt="Black and white photo with dogs"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        <p className="text-gray-700 leading-relaxed text-md md:text-lg text-center">
          Together, we faced life's challenges head-on, learning from each
          obstacle and celebrating each triumph. Our love and bond only grew
          stronger with time.
        </p>

        <p className="text-gray-700 leading-relaxed text-md md:text-lg text-center">
          Today, as we stand on the precipice of our new chapter, we are excited
          to write the rest of our story together. Our love has deepened, our
          adventures have multiplied, and our hearts are forever entwined.
        </p>
      </div>
      <div className="max-w-xl mx-auto mt-16 md:mt-24">
        <div className="relative aspect-square w-full">
          <Image
            src="/images/story/couple-4.jpeg"
            alt="Intimate moment"
            fill
            className="object-cover grayscale rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
