import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 border-b bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-950">
      <div className="container flex h-12 items-center justify-between px-4 sm:px-6">
        <h1 className="text-xl font-semibold">Dictionary App</h1>
        <Button variant="outline">Login</Button>
      </div>
    </header>
  );
}

export default Header;