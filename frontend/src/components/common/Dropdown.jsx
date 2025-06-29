function Dropdown({ value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 p-3 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
