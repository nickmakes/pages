import React from 'react';

interface Props {
  label: string;
  name: string;

  onChange: (e: any) => void;
}

const TextInput = ({ label, name, onChange }: Props) => {

  return (
    <div className="Form-Group">
      <label htmlFor={name}>{label}:</label>
      <input type="text" name={name} onChange={onChange} />
    </div>
  );
};

export default TextInput;
