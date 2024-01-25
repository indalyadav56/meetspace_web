const secretKey: string | undefined = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

interface TokenPayload {
  user_id: string;
}
