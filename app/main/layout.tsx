import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import {UserNav} from "@/components/layout/user-nav";
import RemainSessionTime from "./components/remain-session";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <Header>
        <RemainSessionTime />
        <UserNav />
    </Header>
    <Container>{children}</Container>
  </>
}
