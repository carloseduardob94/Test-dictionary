import Header from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-6">{children}</main>
      {/* Opcional: <footer className="border-t py-4 text-center text-sm text-muted-foreground">Footer content</footer> */}
    </div>
  );
};

export default Layout;