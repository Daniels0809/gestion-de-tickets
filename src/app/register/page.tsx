"use client";
import { registerService } from "@/src/services/register";
import React, { useState } from "react";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await registerService({
        name,
        email,
        cedula,
        password,
        role: "client",
      });

      setMessage({ text: "Registro exitoso, ya puedes iniciar sesión", type: "success" });

      setName("");
      setEmail("");
      setCedula("");
      setPassword("");
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.error || "Error desconocido al registrar",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMessageClasses = () => {
    if (!message) return "";
    return message.type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Registro</h1>

        {message && (
          <div className={`p-3 mb-4 border rounded-lg ${getMessageClasses()}`} role="alert">
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5 text-black">
          
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              placeholder="Tu nombre"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              placeholder="email@correo.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>

          {/* Cédula */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
            <input
              type="text"
              value={cedula}
              placeholder="123456789"
              onChange={(e) => setCedula(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            >
              <option value="client">Cliente</option>
              <option value="agent">Agente</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-md transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
