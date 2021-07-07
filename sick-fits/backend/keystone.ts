import 'dotenv/config';
import { createSchema, config } from '@keystone-next/keystone/schema';
import { User } from './schemas/Users';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: 'SICK FITSSSSS',
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  lists: createSchema({
    User,
  }),
  ui: {
    isAccessAllowed: () => true,
  },
});
