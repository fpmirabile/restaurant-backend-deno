import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { IJwtUnsigned } from '../../interfaces/jwt/IJwtUnsigned'
import { JWTSecretError } from '../../error/auth/JWTSecretError'
import { JWTCreateError } from '../../error/auth/JWTCreateError'
import { JwtSignedDTO } from '../../dto/user/JwtSignedDTO'


export const jwtSecret: string | undefined = process.env.JWT_SECRET || 'Una API KEY de ejemplo'
const tokenExpirationInSeconds = 86400 // 24 HOURS

class JwtService {
  createJWT(signObject: IJwtUnsigned): JwtSignedDTO {
    if (!jwtSecret) {
      throw new JWTSecretError();
    }

    try {
      const refreshId = signObject.userId + jwtSecret
      const salt = crypto.createSecretKey(crypto.randomBytes(16))
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64')

      const token = jwt.sign(signObject, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      })

      return {
        token,
        refreshToken: hash,
      }
    } catch (err) {
      console.log(err)
      throw new JWTCreateError();
    }
  }

  async refreshJWT(refreshToken:string, token:string){

    if(!refreshToken){
      throw new JWTCreateError();
    }

    let newJwtUnsigned: IJwtUnsigned;
    
    await jwt.verify(token, jwtSecret, async (err) => {
      if (err) {
        throw new JWTCreateError();
      }

        const userToken = await jwt.decode(token) as IJwtUnsigned
        
        newJwtUnsigned = {
          userId: userToken.userId,
          name: userToken.name,
          status: userToken.status,
          identifier: userToken.identifier,
          photo: userToken.photo,
          role: userToken.role,
        };
        
    })
    return await this.createJWT(newJwtUnsigned)
  }
}

export const jwtService = new JwtService();
