export default function Registry() {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
        REGISTRY
      </h2>
      <div className="w-[80%]">
        <img
          src="/placeholder.svg?height=600&width=500"
          alt="Registry gift inspiration"
          className="w-full aspect-[3/4] object-cover grayscale"
        />
      </div>
      <p className="text-center text-sm mt-8 max-w-[80%]">
        While your presence at our wedding is the greatest gift, if you wish to
        share in our joy through a gift, please visit our registry.
      </p>
      <div className="mt-8">
        <button className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors">
          Registry
        </button>
      </div>
    </div>
  );
}
