export default function Schedule() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821114-P83HW8YAAWROPH7G1KBQ/andres-molina-wIfDI58tCuU-unsplash.jpg"
          alt="Wedding fabric background"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative z-10 text-white py-32 px-4 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-sm uppercase tracking-[0.2em] mb-8">
            HERE'S A SNEAK PEEK OF
          </h3>

          <h2 className="font-serif text-5xl md:text-6xl mb-24 leading-tight">
            OUR SPECIAL DAY'S
            <br />
            SCHEDULE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div>
              <h4 className="font-serif text-4xl mb-4">4:00 PM</h4>
              <p className="uppercase text-sm tracking-[0.2em]">CEREMONY</p>
            </div>
            <div>
              <h4 className="font-serif text-4xl mb-4">5:00 PM</h4>
              <p className="uppercase text-sm tracking-[0.2em]">COCKTAIL</p>
            </div>
            <div>
              <h4 className="font-serif text-4xl mb-4">6:30 PM</h4>
              <p className="uppercase text-sm tracking-[0.2em]">DINNER</p>
            </div>
            <div>
              <h4 className="font-serif text-4xl mb-4">10:00 PM</h4>
              <p className="uppercase text-sm tracking-[0.2em]">
                DANCING & FIREWORKS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
