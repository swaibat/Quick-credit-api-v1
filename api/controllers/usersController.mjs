import { users } from '../models/dummyUsers';
import jwtDecode from 'jwt-decode';
// Mark a client as verified.
export function adminCheck(req, res, next) {
  // check if user is admin
  let token = req.headers.authorization;
  const decoded = jwtDecode(token);
  let admin = users.find(u => u.email === decoded.email);
  if (!admin || admin.isAdmin === false) {
 res.status(403).send({ error: 403, message: 'Forbidden' });
    return;
  }
  next();
}

