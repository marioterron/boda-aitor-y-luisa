import homeMetadata from "./metadata";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export const metadata = homeMetadata;
