import { list } from '@keystone-next/keystone/schema';
import {
  text,
  password,
  relationship,
  select,
  integer,
} from '@keystone-next/fields';
import {
  isSignedIn,
  rules,
} from '../../../finished-application/backend/access';

export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: rules.canOrder,
    delete: rules.canOrder,
  },
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    },
  },

  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});
