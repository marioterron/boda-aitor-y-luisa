import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function DressCode() {
  const router = useRouter();
  const t = useTranslations("dressCode.home");

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="absolute -top-8 z-20 w-full text-center font-serif text-[2.5rem] uppercase">
        {t("title")}
      </h2>
      <div className="w-[80%]">
        <img
          src="/images/dress-code.jpg"
          alt="Formal attire inspiration"
          className="aspect-[3/4] w-full object-cover grayscale"
        />
      </div>
      <p className="mt-8 max-w-[80%] text-center text-sm">{t("description")}</p>
      <div className="mt-8">
        <button
          className="bg-black px-8 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-gray-900"
          onClick={() => router.push("/faqs")}
        >
          {t("button")}
        </button>
      </div>
    </div>
  );
}
