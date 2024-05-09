import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export function hashPassword(plainPassword: string) {
  const salt = genSaltSync(12);
  const hashPassword = hashSync(plainPassword, salt);

  return hashPassword;
}

export function comparePassword(plainPassword: string, hashPassword: string) {
  const value = compareSync(plainPassword, hashPassword);
  return value;
}
