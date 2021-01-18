import * as yup from 'yup';
import { isValid as isCPFValid } from 'cpf';

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

export const cpf = yup
  .string()
  .test('test cpf', 'Invalid cpf', (CPFValue: string = ''): boolean => (
    isCPFValid(CPFValue)
  ));

export const firstSemester = yup
  .object({
    year: yup
      .number()
      .min(1900)
      .max(2999)
      .required(),
    unity: yup
      .number()
      .min(1)
      .max(2)
      .required(),
  }).required();

export const registration = yup
  .string()
  .required();

export const course = yup
  .string();
