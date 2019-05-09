import { users } from '../models/dummyUsers';
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

