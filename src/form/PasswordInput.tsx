import React from 'react';

interface Props {
  label?: string;
  name: string;

  onChange: (e: any) => void;
}

const PasswordInput = ({ label = 'password', name, onChange }: Props) => {
  return (
    <div className="Form-Group">
      <label htmlFor={name}>{label}:</label>
      <input type="password" name={name} onChange={onChange} />
    </div>
  );
};

export default PasswordInput;
