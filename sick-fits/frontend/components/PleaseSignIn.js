import { useUser } from './User';
import SignIn from './Signin';

export default function PleaseSignIn({ children }) {
  const me = useUser();
  if (!me) {
    return <SignIn />;
  }
  return children;
}
