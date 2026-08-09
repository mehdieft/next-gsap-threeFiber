import { jwtVerify, SignJWT } from "jose";

export async function createJWT(user){
    const token=await new SignJWT({...user})
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    return token
}
export async function verifyJWT(token){
  try{
    const {payload}=await jwtVerify(token,new TextEncoder().encode(process.env.JWT_SECRET))
    return payload

  } catch(error){ 
    return false

  } 
}