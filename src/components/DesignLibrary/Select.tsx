type SelectProps = {
  label: string;
  options: string[];
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, options, value, onChange, name }: SelectProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <select
        className="w-full border rounded-lg px-3 py-2"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
