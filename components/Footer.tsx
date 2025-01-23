export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white/60 py-8">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="mb-2">Made with love for Aitor & Luisa</p>
        <p>© {currentYear} • All rights reserved</p>
      </div>
    </footer>
  );
}
