export default function Hero() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-8 md:gap-16">
          <div className="hidden md:block w-full">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Wedding moment"
              className="w-full aspect-[3/4] object-cover grayscale"
            />
          </div>

          <div className="relative w-full">
            <h2 className="font-serif text-4xl md:text-8xl absolute w-full text-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              14 <span className="mx-2 md:mx-4">•</span> 07{" "}
              <span className="mx-2 md:mx-4">•</span> 2025
            </h2>
            <img
              src="/placeholder.svg?height=800&width=600"
              alt="Main wedding photo"
              className="w-full aspect-[3/4] object-cover grayscale"
            />
          </div>

          <div className="hidden md:block w-full">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Wedding moment"
              className="w-full aspect-[3/4] object-cover grayscale"
            />
          </div>
        </div>

        <p className="text-center uppercase tracking-widest text-sm mt-16">
          JOIN US AS WE EMBARK ON A JOURNEY OF LOVE,
          <br />
          JOY, AND ETERNAL HAPPINESS
        </p>
      </div>
    </section>
  );
}
