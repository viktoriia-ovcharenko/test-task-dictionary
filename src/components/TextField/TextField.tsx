import React, { useState } from 'react';
import classNames from 'classnames';
import './TextField.scss';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  isWordValid: boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  isWordValid = true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value.trim();
  const textIsNotValid = touched && !isWordValid;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>
      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {textIsNotValid && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
