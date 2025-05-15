type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  errorMessage?: string;
  placeholder?: string;
  isRequired?: boolean;
};

export default function Input({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  errorMessage,
  placeholder,
  isRequired,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name, {
          required: `${name} is Required`,
        })}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        defaultValue={defaultValue}
        required={isRequired}
        placeholder={placeholder}
      />
      {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
    </div>
  );
}
