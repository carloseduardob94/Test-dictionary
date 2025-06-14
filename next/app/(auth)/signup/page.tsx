"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

    try {
      const res = await fetch("http://localhost:3333/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erro ao criar conta");
      }

      router.push("/signin");
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 space-y-4 border border-1 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold">Criar Conta</h2>
      {error && <p className="text-red-500">{error}</p>}

      <Input
        placeholder="Nome"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <Button onClick={handleRegister} className="w-full">Cadastrar</Button>

      <span className="flex text-center items-center justify-center text-sm pt-4">
        Criado por
        <a href="https://www.linkedin.com/in/carloseduardob94-dev/" target="_blank" className="text-blue-500 hover:text-blue-700 flex items-center">
          &nbsp;Carlos Eduardo @Linkedin
        </a>
      </span>
    </div>
  )
}