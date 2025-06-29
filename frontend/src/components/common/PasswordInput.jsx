import { useState } from "react";
import TextInput from "./TextInput";

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <TextInput
        value={value}
        onChange={onChange}
        placeHolder={"Passwort"}
        name={"password"}
        type={showPassword ? "text" : "password"}
        autoComplete={"current-password"}
      />
      <button
        type="button"
        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
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
  );
}

export default PasswordInput;
