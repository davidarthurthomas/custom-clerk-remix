import { useSignIn } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const signInStatus = formData.get("signInStatus");
  if (signInStatus === "complete") {
    throw redirect("/");
  } else {
    return {
      signInStatus: signInStatus,
    };
  }
};

export default function SignIn() {
  const { isLoaded, signIn } = useSignIn();
  const fetcher = useFetcher();

  const handleSignIn = async (event: any) => {
    const formData = new FormData(event.target);
    const emailAddress = formData.get("email");
    const password = formData.get("password");

    event.preventDefault();

    if (
      isLoaded &&
      typeof emailAddress === "string" &&
      typeof password === "string"
    ) {
      const { status } = await signIn.create({
        identifier: emailAddress,
        password,
      });

      fetcher.submit({ signInStatus: status! }, { method: "post" });
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button>Sign in</button>
    </form>
  );
}
