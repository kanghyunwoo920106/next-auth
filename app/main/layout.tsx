import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import {UserNav} from "@/components/layout/user-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <Header>
        <UserNav />
    </Header>
    <Container>{children}</Container>
  </>
}
