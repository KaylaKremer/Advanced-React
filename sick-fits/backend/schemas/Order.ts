import { list } from '@keystone-next/keystone/schema';
import {
  text,
  password,
  relationship,
  select,
  integer,
  virtual,
} from '@keystone-next/fields';
import formatMoney from '../lib/formatMoney';
import { isSignedIn } from '../../../finished-application/backend/access';

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return `Order - ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
