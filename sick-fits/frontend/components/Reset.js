import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

export default function Reset({ token }) {
  const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
      $email: String!
      $password: String!
      $token: String!
    ) {
      redeemUserPasswordResetToken(
        email: $email
        token: $token
        password: $password
      ) {
        code
        message
      }
    }
  `;

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
