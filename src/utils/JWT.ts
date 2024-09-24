import jwt from 'jsonwebtoken';

interface User{
    email: string;
    password: string;
}

// Função para restaurar quebras de linha
const formatKey = (key: string) => {
  return key.replace(/\\n/g, '\n');
};

// Carregar as chaves do arquivo .env
const privateKey = formatKey(process.env.PRIVATE_KEY || '');
const publicKey = formatKey(process.env.PUBLIC_KEY || '');

// Função para gerar o token usando a chave privada
export async function generateJwToken(user: User) {
    const token = jwt.sign(JSON.stringify(user), privateKey, { algorithm: 'RS256' });
    return token;
}

// Função para verificar o token usando a chave pública
export async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err);
        return null;
    }
}