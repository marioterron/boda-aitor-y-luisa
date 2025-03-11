import { useRouter } from "next/navigation";

export default function HomeFAQs() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
        FAQs
      </h2>
      <div className="w-[80%]">
        <img
          src="/images/home-faqs.jpg"
          alt="FAQs"
          className="w-full aspect-[3/4] object-cover grayscale"
        />
      </div>
      <p className="text-center text-sm mt-8 max-w-[80%]">
        Got questions? We’ve got answers! Check out our FAQs for everything you
        need to know about our special day.
      </p>
      <div className="mt-8">
        <button
          className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors"
          onClick={() => router.push("/faqs")}
        >
          FAQs
        </button>
      </div>
    </div>
  );
}
