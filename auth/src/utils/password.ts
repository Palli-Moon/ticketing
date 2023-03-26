import bcrypt from 'bcryptjs';

export class Password {
  static async toHash(password: string) {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }

  static async compare(storedPass: string, suppliedPass: string) {
    return await bcrypt.compare(suppliedPass, storedPass);
  }
}
