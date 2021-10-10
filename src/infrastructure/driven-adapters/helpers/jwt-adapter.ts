import jwt from 'jsonwebtoken'
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IDecrypt} from "@/domain/use-cases/helpers/decrypt";

export class JwtAdapter implements IEncrypt, IDecrypt {
    constructor(
        private readonly secret: string
    ) {
    }

    async decrypt(ciphertext: string): Promise<IDecrypt.Result> {
        const plaintext: any = jwt.verify(ciphertext, this.secret)
        if (plaintext) return plaintext
    }

    async encrypt(data: any): Promise<IEncrypt.Result> {
        const ciphertext = jwt.sign(
            data,
            this.secret,
            {
                expiresIn: '1d',
                subject: data.id.toString()
            });
        if (ciphertext) return ciphertext
    }
}
