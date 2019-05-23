import { users } from '../models/users';
import jwtDecode from 'jwt-decode';

export function adminCheck(req, res, next) {
  // check if user is admin
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);
  const admin = users.find(u => u.email === decoded.email);
  if (!admin || admin.isAdmin === false) {
    res.status(403).send({ error: 403, message: 'Forbidden Only Admin has access' });
    return;
  }
  next();
}

// Mark a client as verified.
export function userVerify(req, res) {
  // // check if use exists
  const user = users.find(u => u.email === req.params.email);
  if (!user) {
    res.status(404).send({ error: 404, message: `user with ${req.params.email} not Found` });
    return;
  }
  user.status = 'verified';
  res.send(user);
}

export function getUserFromToken(req, res){
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);
  return decoded.email
}
