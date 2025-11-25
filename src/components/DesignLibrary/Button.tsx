type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  variant?: "income" | "expense";
  onClick?: () => void;
};

const Button = ({ text, type, variant, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-medium cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg${
          variant === "income" ? "bg-green-500" : ""
        } ${variant === "expense" ? "bg-red-500" : ""}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
