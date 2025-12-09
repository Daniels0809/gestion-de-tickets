'use client'
import React, { useState } from "react";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string; type: 'success' | 'error'} | null> (null);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await register(name, email, pass);

      setMessage({
        text: "Registro exitoso, ya puedes iniciar sesión",
        type: 'success'
      });
      
      setName("");
      setEmail("");
      setPass("");

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al registrar"
      setMessage({
        text: errorMessage,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }



  }
    const getMessageClasses = () => {
      if (!message) return "";
      return message.type === 'success'
      ? "bg-green-100 border-green-400 text-green-700":
      "bg-red-100 border-red-400 text-red-700";
    }
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electronico
            </label>
            <input
              type="email"
              placeholder="email@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
          type="submit"
          disabled={loading} //se deshabilita mientra esta cargando
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
            loading? 'bg-blue-400 cursor-not-allowed': 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default RegisterPage;
