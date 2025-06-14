"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const { token, setToken } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null)

    router.push("/signin");
  }
  return (
    <header className="w-full py-4 border-b bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-950">
      <div className="container flex h-12 items-center justify-between px-4 sm:px-6">
        <h1 className="text-xl font-semibold">Dictionary App</h1>
        {token ? (
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        ) : (
          <Button variant="outline" onClick={() => router.push("/signin")}>Entrar</Button>
        )}
      </div>
    </header>
  );
}

export default Header;