export default function Location() {
  return (
    <section className="py-32">
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
          LOCATION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-8 md:gap-16">
          <div className="text-center md:col-span-1 order-2 md:order-1">
            <h3 className="uppercase text-sm font-medium tracking-wider">
              DUNHAVEN CASTLE
            </h3>
            <p className="uppercase text-xs tracking-wider">
              HOTEL & RESTAURANT
            </p>
          </div>

          <div className="w-[80%] mx-auto md:col-span-3 order-1 md:order-2">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Dunhaven Castle"
              className="w-full aspect-[3/4] object-cover grayscale"
            />
          </div>

          <div className="text-center md:col-span-1 order-3">
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
