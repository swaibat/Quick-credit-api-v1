import { users } from '../models/dummyUsers';
const appSecreteKey = 'hksuua7as77hjvb348b3j2hbrbsc9923k';
import jwtDecode from 'jwt-decode';
import verifier from 'express-jwt';

// Mark a client as verified.
export function adminCheck(req, res, next) {
  // check if user is admin
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);
  const admin = users.find(u => u.email === decoded.email);
  if (!admin || admin.isAdmin === false) {
    res.status(403).send({ error: 403, message: 'Forbidden' });
    return;
  }
  next();
}