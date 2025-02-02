import { NAV_ITEMS } from "./constants";

interface NavLinksProps {
  onClick?: () => void;
  className?: string;
}

export function NavLinks({ onClick, className }: NavLinksProps) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={onClick}
          className="nav-link"
        >
          {item.label}
        </a>
      ))}
    </>
  );
}
