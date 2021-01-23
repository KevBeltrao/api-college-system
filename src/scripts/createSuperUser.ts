/* eslint-disable no-console */
import 'dotenv/config';

import readlineSync from 'readline-sync';
import bcrypt from 'bcryptjs';

import generateRegistration from '@utils/generateRegistration';
import userValidator from '@validators/userValidator';
import database from '@config/database';
import User from '@models/User';

const createSuperUser = async (): Promise<void> => {
  try {
    database();

    const getPassword = (): string => {
      const password = readlineSync.question('Password: ', {
        hideEchoBack: true,
      });

      const password2 = readlineSync.question('Repeat password: ', {
        hideEchoBack: true,
      });

      if (password !== password2) {
        console.log('Passwords don\'t match');

        return getPassword();
      }

      return password;
    };

    const name = readlineSync.question('Name: ');
    const email = readlineSync.question('Email: ');
    const password = getPassword();
    const role = 'admin';
    const cpf = readlineSync.question('CPF: ');
    const registration = generateRegistration();
    const course = 'none';

    const hashedPassword = await bcrypt.hash(password, 10);

    const superUserInfo = {
      name,
      email,
      password: hashedPassword,
      role,
      cpf,
      registration,
      course,
    };

    userValidator.checkSuperCreate(superUserInfo);

    const createdUser = await User.create(superUserInfo);

    const {
      password: returnedPass,
      ...responseUser
    } = createdUser;

    return console.log(responseUser);
  } catch (error) {
    console.log(`Error: ${error}`);

    return createSuperUser();
  }
};

createSuperUser();
