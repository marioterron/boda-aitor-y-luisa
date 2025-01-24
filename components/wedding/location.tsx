export default function Location() {
  return (
    <section className="py-32">
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
          LOCATION
        </h2>
        <div className="grid grid-cols-3 items-center gap-16">
          <div className="text-center">
            <h3 className="uppercase text-sm font-medium tracking-wider">
              DUNHAVEN CASTLE
            </h3>
            <p className="uppercase text-xs tracking-wider">
              HOTEL & RESTAURANT
            </p>
          </div>

          <div className="w-full">
            <img
              src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821118-MSR4DTJVTSWL03GT16HX/alejandro-luengo-Fm_TvVmuHq4-unsplash+%281%29.jpg"
              alt="Dunhaven Castle"
              className="w-full aspect-[4/5] object-cover grayscale"
            />
          </div>

          <div className="text-center">
            <h3 className="uppercase text-sm font-medium tracking-wider">
              GLENCAIRN ROAD COUNTY
            </h3>
            <p className="uppercase text-xs tracking-wider">KERRY, IRELAND</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors">
            Travel & Stay
          </button>
        </div>
      </div>
    </section>
  );
}
