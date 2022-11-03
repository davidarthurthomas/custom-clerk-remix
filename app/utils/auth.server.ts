export async function createSignUp(email: string, password: string) {
  return await fetch("https://api.clerk.dev/v1/users", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
    },
    body: JSON.stringify({
      email_address: [email],
      password: password,
    }),
  });
}
