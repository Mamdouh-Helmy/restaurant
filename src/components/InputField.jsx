const InputField = ({
  label,
  type,
  valueRef,
  disabled,
  onChange,
  showPasswordToggle,
  defaultValue,
}) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <input
      type={type}
      id={label}
      ref={valueRef}
      disabled={disabled}
      onChange={onChange}
      autoComplete={type == "" ? "new-password" : ""}
      defaultValue={defaultValue}
    />
    {showPasswordToggle && (
      <label>
        <input type="checkbox" onChange={showPasswordToggle} /> إظهار كلمة
        المرور
      </label>
    )}
  </div>
);

export default InputField;
