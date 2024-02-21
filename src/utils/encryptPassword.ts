import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

export const encryptPassword = async (password: string) => {
  // Hash the user's password
  // Generate a salt
  const salt = randomBytes(8).toString('hex');

  // Hash the salt and the password together
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  // Join the hashed result and the salt together
  const result = salt + '.' + hash.toString('hex');

  return result;
};
