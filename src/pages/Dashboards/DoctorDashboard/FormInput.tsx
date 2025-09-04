// components/FormInput/FormInput.tsx

import React from 'react';
import './ModalAdvancedStyling.css'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ label, icon, id, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input id={id} {...props} />
      </div>
    </div>
  );
};

export default FormInput;