import Image from "next/image";

export function OurStoryContent() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Main Image */}
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/images/story/main.jpeg"
            alt="Brian and Megan with their dogs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="font-serif text-6xl text-white">AITOR & LUISA</h2>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-8">
          <p className="text-gray-700 leading-relaxed">
            Our journey began like any other day. Two paths converging at the
            crossroads of life. In a city filled with countless faces, it was a
            seemingly ordinary moment that sparked our extraordinary love story.
          </p>

          {/* Small Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/story/couple-1.jpeg"
                alt="Brian and Megan walking"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src="/images/story/couple-2.jpeg"
                alt="Brian and Megan with their dogs"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Our love story wouldn't be complete without mentioning our two loyal
            Dalmatian dogs, Max and Bella. They've been with us through thick
            and thin, bringing joy and laughter to our lives with their spots
            and wagging tails.
          </p>

          {/* Additional Images */}
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/images/story/couple-3.jpeg"
              alt="Black and white photo with dogs"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-gray-700 leading-relaxed">
            Together, we faced life's challenges head-on, learning from each
            obstacle and celebrating each triumph. Our love and bond only grew
            stronger with time.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Today, as we stand on the precipice of our new chapter, we are
            excited to write the rest of our story together. Our love has
            deepened, our adventures have multiplied, and our hearts are forever
            entwined.
          </p>
        </div>
      </div>
    </section>
  );
}
