function TextInput({ value, onChange, placeHolder, type, name, autoComplete }) {
  return (
    <input
      type={type || "Text"}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 p-3 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 focus:outline-none"
      placeholder={placeHolder}
      name={name}
      id={name}
      autoComplete={autoComplete}
    />
  );
}

export default TextInput;
