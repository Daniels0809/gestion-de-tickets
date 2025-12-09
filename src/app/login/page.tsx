'use client'

import { getSession, signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified") === "true";

  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError(result.error);
    } else {
      const session = await getSession();
      if (session?.user.role === "agent") router.push("/agentDashboard");
      else router.push("/clientDashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleLogin} className="space-y-5 text-black">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {verified && (
            <p className="text-sm text-green-600 text-center">
              ¡Cuenta verificada! Ahora puedes iniciar sesión.
            </p>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            onClick={() => signIn("google", { redirect: false })}
            className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </div>
  );
}
