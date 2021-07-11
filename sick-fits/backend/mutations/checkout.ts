/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { named } from '../.keystone/admin/.next/static/chunks/pages/users/[id]';
import { CartItemCreateInput } from '../.keystone/schema-types';
import StripeConfig from '../lib/stripe';


const graphql = String.raw;

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
 const userId = context.session.itemId;
 
 if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!')
 }
 
 const user = await context.lists.User.findOne({
    where: {id: userId},
    resolveFields: graphql`
         id
         name
         email
         cart {
            id
            quantity
            product {
                name
                price
                description
                id
                photo {
                    image {
                        id
                        publicUrlTransformed
                    }
                }
            }
         }
     `
     });
     console.dir(user, {depth: null});
     
     const cartItems = user.cart.filter(cartItem => cartItem.product);
     
     const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput) {
        return tally + cartItem.quantity * cartItem.product.price
     }, 0);
     
     console.log(amount);
     
     const charge = await StripeConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token,
     }).catch(err => console.log(err.message));
     
     console.log(`charge`, charge);
}

export default checkout;
