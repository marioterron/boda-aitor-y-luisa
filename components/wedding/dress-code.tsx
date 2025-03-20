import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function DressCode() {
  const router = useRouter();
  const t = useTranslations("dressCode.home");

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="uppercase font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
        {t("title")}
      </h2>
      <div className="w-[80%]">
        <img
          src="/images/dress-code.jpg"
          alt="Formal attire inspiration"
          className="w-full aspect-[3/4] object-cover grayscale"
        />
      </div>
      <p className="text-center text-sm mt-8 max-w-[80%]">{t("description")}</p>
      <div className="mt-8">
        <button
          className="bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors"
          onClick={() => router.push("/faqs")}
        >
          {t("button")}
        </button>
      </div>
    </div>
  );
}
