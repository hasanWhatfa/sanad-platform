import React, { forwardRef } from 'react';

// 1. Define allowed field types to avoid typos
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select';

type Option = { value: string; label: string };

export interface EditPatientDataFieldProps {
  label: string;
  type: FieldType;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: string;
  serverError?: string;
  options?: Option[]; // only used when type === 'select'
}

const EditPatientDataField = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  EditPatientDataFieldProps
>(
  (
    { label, type, name, defaultValue, placeholder, errorMessage, serverError, options },
    ref
  ) => {
    return (
      <div className="field">
        {/* Label linked to input/select */}
        <label htmlFor={name}>{label}</label>
        <div className="input_container">
        {/* Render select or input based on type */}
        {type === 'select' ? (
          <select
            id={name}
            name={name}
            defaultValue={defaultValue}
            ref={ref as React.Ref<HTMLSelectElement>}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
        {/* Display front-end validation error first */}
        {errorMessage && <p className="error_input">{errorMessage}</p>}
        {/* Display server-side error if present */}
        {serverError && <p className="error_input">{serverError}</p>}
        </div>

      </div>
    );
  }
);

EditPatientDataField.displayName = 'EditPatientDataField';

export default EditPatientDataField;
