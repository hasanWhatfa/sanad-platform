import { forwardRef } from "react";
import type { Filed } from "../../data/AuthData";
import './InputField.css';

interface InputFieldProps {
  fieldData: Filed | undefined;
  errorMessage:string | undefined;
}

const InputField = forwardRef<HTMLInputElement | HTMLSelectElement, InputFieldProps>(
  ({ fieldData,errorMessage }, ref) => {
    return (
      <div className="input_field">
        <label>{fieldData?.title}</label>
        {fieldData?.type === "select" ? (
          <select name="gender" ref={ref as React.Ref<HTMLSelectElement>}>
            <option value={fieldData.placeholder}>{fieldData.placeholder}</option>
            {fieldData.options?.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={fieldData?.type}
            placeholder={fieldData?.placeholder}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
        <p className="errorMessage">{errorMessage}</p>
      </div>
    );
  }
);

export default InputField;
