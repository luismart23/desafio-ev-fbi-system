import bcrypt from 'bcrypt';

export const agents = [
  {
    email: 'who@fbi.com',
    password: bcrypt.hashSync('me', 10),
  },
  {
    email: 'where@fbi.com',
    password: bcrypt.hashSync('there', 10),
  },
  {
    email: 'how@fbi.com',
    password: bcrypt.hashSync('exactly', 10),
  },
];

