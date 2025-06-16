"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const { setToken, setUser } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    try {
      const res = await fetch("http://localhost:3333/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      console.log("Data USER =>", data)
      if (!res.ok) throw new Error(data.message || "Erro ao autenticar")

      const userLogged = {
        name: data.name,
        email
      }
      const expiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `token=${data.token}; path=/; expires=${expiration};`;

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(userLogged));
      setToken(data.token)
      setUser(userLogged);

      router.push("/")
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 space-y-4 border border-1 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold">Entrar</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} className="w-full" >Entrar</Button>

      <p className="text-sm text-center">Não possui conta? <Link href="/signup" className="underline text-blue-500 hover:text-blue-700" >Crie agora!</Link></p>

      <span className="flex text-center items-center justify-center text-sm pt-4">
        Criado por
        <a href="https://www.linkedin.com/in/carloseduardob94-dev/" target="_blank" className="text-blue-500 hover:text-blue-700 flex items-center">
          &nbsp;Carlos Eduardo @Linkedin
        </a>
      </span>

    </div>
  )
}