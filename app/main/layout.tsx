import Container from "@/components/layout/container";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
