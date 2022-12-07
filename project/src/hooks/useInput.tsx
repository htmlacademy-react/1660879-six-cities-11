import { useState, useEffect, FormEvent } from 'react';
import { emailRegExp, passRegExp } from '../const';


const useValidation = (value: string, validations: Record<string, boolean>) => {
  const [emailError, setEmailError] = useState<boolean | string>(false);
  const [passwordError, setPasswordError] = useState<boolean | string>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmail' :
          emailRegExp.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError('Invalid email');
          break;
        case 'isPassword' :
          passRegExp.test(value) ? setPasswordError(false) : setPasswordError('Password must contain at least one number and letter with no spaces');
          break;
      }
    }
  }, [value, validations]);

  return {
    emailError,
    passwordError
  };
};


export const useInput = (initialValue: string, validations: Record<string, boolean>) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (evt: FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  };
};
