import Header from "../components/layout/Header";
import { login } from "../services/Employees";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header PageName={"Anmeldung"} />

      <div className="flex flex-grow items-center justify-center h-200">
        <div className="flex flex-col shadow-lg rounded-lg w-full max-w-md p-10 mx-4">
          <h2 className="text-center font-semibold text-2xl mb-3">Anmeldung</h2>
          <div className="text-center mb-8">
            Bitte geben sie ihre Anmeldedaten ein, die Sie von ihrem
            Vorgesetzten erhalten habe.
          </div>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all mb-5"
            type="text"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all mb-5"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-orange-300 text-white hover:bg-orange-400 rounded-lg py-3 font-medium transition-all ease-in-out duration-300"
            onClick={handleLogin}
          >
            Anmelden
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
