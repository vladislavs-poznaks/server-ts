import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
}

export const checkHashedPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}