
import jwt, { Secret, JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {JWT_SECRET} = process.env

if(!JWT_SECRET){
    throw new Error('JWT_SECRET is not defined in .env file');
}

const secret: Secret = process.env.JWT_SECRET || "minha_chave_secreta";

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, secret, { expiresIn: "1h"});
}

export function verifyToken(token: string) {
    return jwt.verify(token, secret);
}