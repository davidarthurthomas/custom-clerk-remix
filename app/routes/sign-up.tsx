import { useSignUp } from "@clerk/clerk-react";
import { ActionFunction, redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { FormEvent } from "react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const signUpStatus = formData.get("signUpStatus");
  if (signUpStatus === "complete") {
    return redirect("/");
  } else {
    return {
      signUpStatus: signUpStatus,
    };
  }
};

export default function SignUpForm() {
  const { isLoaded, signUp } = useSignUp();
  const fetcher = useFetcher();

  const handleSignUp = async (event: any) => {
    const formData = new FormData(event.target);
    const emailAddress = formData.get("email");
    const password = formData.get("password");

    event.preventDefault();

    if (
      isLoaded &&
      typeof emailAddress === "string" &&
      typeof password === "string"
    ) {
      const { status } = await signUp.create({
        emailAddress,
        password,
      });

      fetcher.submit({ signUpStatus: status! }, { method: "post" });
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button>Sign up</button>
    </form>
  );
}
