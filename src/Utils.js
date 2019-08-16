import jwt from 'jsonwebtoken';

const getUserToken = localStorage.getItem('userToken');
export const decodeToken = token => jwt.decode(token);
const isTokenValid = token => {
    const dateFromToken = new Date(decodeToken(token).exp * 1000);
    return dateFromToken.getTime() > new Date().getTime();
};
export const userFromToken = () => {
    const userToken = getUserToken;
    if (userToken && isTokenValid(userToken)) {
        const decodedToken = decodeToken(userToken);
        return {name: decodedToken.data, exp: decodedToken.exp};
    }
    return null;
};

export const logout = () => localStorage.removeItem('userToken');
