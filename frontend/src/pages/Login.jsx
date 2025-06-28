import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { login } from "../services/Employees";
import { navigateToPage } from "../services/Navigation";
import { useState } from "react";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import Warning from "../components/common/Warning";
import PasswordInput from "../components/common/PasswordInput";

function Login() {
  const navigate = useNavigate();
  const [wrongSignIn, setWrongSignIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(field, value) {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();

    const result = await login(loginData.email, loginData.password);
    if (result) {
      navigateToPage(navigate);
    } else {
      setWrongSignIn(true);
    }
  }

  return (
    <>
      <Header
        Views={["Anmeldung"]}
        StartView={"Anmeldung"}
        onActiveViewChange={() => {}}
      />

      <div className="flex h-200 flex-grow items-center justify-center">
        <div className="mx-4 flex w-full max-w-md flex-col rounded-lg p-10 shadow-lg">
          <h2 className="mb-3 text-center text-2xl font-semibold">Anmeldung</h2>
          <div className="mb-8 text-center">
            Bitte geben sie ihre Anmeldedaten ein, die Sie von ihrem
            Vorgesetzten erhalten habe.
          </div>
          {wrongSignIn && (
            <Warning text={"Das Passwort oder die E-Mail ist falsch!"} />
          )}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <TextInput
              type={"email"}
              name={"email"}
              placeHolder={"E-Mail"}
              autoComplete={"username"}
              value={loginData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <PasswordInput
              value={loginData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <Button style={"primary-large"} text={"Anmelden"} type={"submit"} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
