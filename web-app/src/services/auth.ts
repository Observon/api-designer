const baseApiUrl = (import.meta as any).env.VITE_API_URL;

interface SignUpUserProps {
  email: string;
  password: string;
}
export const signUpUser = async ({ email, password }: SignUpUserProps) => {
  const result = await fetch(`${baseApiUrl}auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail: email, userPassword: password })
  });
  const data = await result.json();
  return { success: result.status === 201, data };
};

interface VerifyUserCode {
  email: string;
  verificationCode: string;
}
export const verifyUserCode = async ({ email, verificationCode }: VerifyUserCode) => {
  const result = await fetch(`${baseApiUrl}auth/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail: email, verificationCode })
  });
  return { success: result.status === 204 };
};

interface SignInUserProps {
  email: string;
  password: string;
}

export const signInUser = async ({ email, password }: SignInUserProps) => {
  try {
    const result = await fetch(`${baseApiUrl}auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: email, userPassword: password })
    });

    if (!result.ok) {
      const errorMessage = await result.text();
      throw new Error(`Failed to sign in: ${errorMessage}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, message: 'Failed to sign in. Please try again later.' };
  }
};