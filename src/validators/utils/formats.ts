import * as yup from 'yup';

import cpfRegex from './cpfRegex';

export const name = yup
  .string()
  .required('Name field is required');

export const email = yup
  .string()
  .email('Invalid email')
  .required('Email field is required');

export const password = yup
  .string()
  .min(6, 'Password is too short')
  .required('Password field is required');

export const role = yup
  .string()
  .oneOf(['admin', 'student'], 'Invalid role')
  .required('Role field is required');

export const cpf = yup
  .string()
  .matches(cpfRegex);

export const semester = yup
  .object({
    year: yup
      .number()
      .min(1900)
      .max(2999),
    unity: yup
      .number()
      .min(1)
      .max(2),
  });

export const registration = yup
  .string()
  .required();
