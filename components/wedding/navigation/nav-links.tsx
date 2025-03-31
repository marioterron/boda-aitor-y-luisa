import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "./constants";

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
}

export function NavLinks({ onClick, className = "" }: NavLinksProps) {
  const t = useTranslations("navigation");

  return (
    <div className={className}>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.key}
          href={item.href}
          onClick={onClick}
          className="uppercase"
        >
          {t(item.key)}
        </a>
      ))}
    </div>
  );
}
