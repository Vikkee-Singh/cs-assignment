import { compareSync } from "bcryptjs";

export const comparePassword = (password: string, userPassword: string) =>
  compareSync(password, userPassword);
