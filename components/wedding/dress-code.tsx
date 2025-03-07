import { useRouter } from "next/navigation";

export default function DressCode() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
        DRESS CODE
      </h2>
      <div className="w-[80%]">
        <img
          src="/placeholder.svg?height=600&width=500"
          alt="Formal attire inspiration"
          className="w-full aspect-[3/4] object-cover grayscale"
        />
      </div>
      <p className="text-center text-sm mt-8 max-w-[80%]">
        For this grand celebration of love, we kindly request that you embrace
        the elegance of the occasion by wearing formal attire.
      </p>
      <div className="mt-8">
        <button
          className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors"
          onClick={() => router.push("/faqs")}
        >
          Details
        </button>
      </div>
    </div>
  );
}
