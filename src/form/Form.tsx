import React from 'react';

interface Props {
  label?: string;
  legend?: string;
  children: any;

  onSubmit: (e: React.FormEvent) => void;
}

const Form = ({ label = 'submit', legend, children, onSubmit }: Props) => {
  return (
    <form className="Form" onSubmit={e => {
      e.preventDefault();
      onSubmit(e);
    }}>
      <fieldset>
        {legend ? <legend>{legend}</legend> : null}
        {children}
        <input type="submit" value={label} />
      </fieldset>
    </form>
  );
};

export default Form;
