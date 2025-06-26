import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { login } from "../services/Employees";
import { navigateToPage } from "../services/Navigation";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongSignIn, setWrongSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login(email, password);
    if (result) {
      navigateToPage(navigate);
    } else {
      setWrongSignIn(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        Views={["Anmeldung"]}
        StartView={"Anmeldung"}
        onActiveViewChange={() => {}}
      />

      <div className="flex flex-grow items-center justify-center h-200">
        <div className="flex flex-col shadow-lg rounded-lg w-full max-w-md p-10 mx-4">
          <h2 className="text-center font-semibold text-2xl mb-3">Anmeldung</h2>
          <div className="text-center mb-8">
            Bitte geben sie ihre Anmeldedaten ein, die Sie von ihrem
            Vorgesetzten erhalten habe.
          </div>
          {wrongSignIn && (
            <div className="bg-red-400 rounded-lg mb-5 px-4 py-3">
              Das Passwort oder die E-Mail ist falsch!
            </div>
          )}
          <form className="flex flex-col" onSubmit={handleLogin}>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all mb-5"
              type="email"
              name="email"
              id="email"
              placeholder="E-Mail"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative mb-5">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Passwort"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <img className="h-6" src="hide.png" />
                ) : (
                  <img className="h-6" src="show.png" />
                )}
              </button>
            </div>
            <button
              className="bg-orange-300 text-white hover:bg-orange-400 rounded-lg py-3 font-medium transition-all ease-in-out duration-300"
              type="submit"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
