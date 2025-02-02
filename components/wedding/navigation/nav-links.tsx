import { NAV_ITEMS } from "./constants";

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
}

export function NavLinks({ onClick, className = "" }: NavLinksProps) {
  return (
    <div className={className}>
      {NAV_ITEMS.map((item) => (
        <a key={item.label} href={item.href} onClick={onClick}>
          {item.label}
        </a>
      ))}
    </div>
  );
}
