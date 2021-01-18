import * as yup from 'yup';
import { isValid as isCPFValid } from 'cpf';
import { ObjectID } from 'mongodb';

import statusEnum from '@models/utils/statusEnum';

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

export const difficulty = yup
  .number()
  .min(1)
  .max(5)
  .required();

export const schedule = yup
  .array().of(yup.object().shape({
    startHourInMinutes: yup
      .number()
      .min(0)
      .max(24 * 60 - 1)
      .required(),
    endHourInMinutes: yup
      .number()
      .min(0)
      .max(24 * 60 - 1)
      .required(),
    day: yup
      .number()
      .min(0)
      .max(6)
      .required(),
  }));

export const objectId = yup
  .string()
  .test('test object id', 'Invalid object id', (objectIdString: string = ''): boolean => (
    ObjectID.isValid(objectIdString)
  ));

export const status = yup
  .string()
  .oneOf(statusEnum)
  .required();

export const finalScore = yup
  .number()
  .min(0)
  .max(10)
  .nullable();
