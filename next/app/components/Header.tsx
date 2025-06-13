const Header = () => {
  return (
    <header className="w-full py-4 border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <h1 className="text-xl font-bold">Dictionary App</h1>
        {/* Você pode adicionar botão de login/logout aqui futuramente */}
      </div>
    </header>
  );
}

export default Header;