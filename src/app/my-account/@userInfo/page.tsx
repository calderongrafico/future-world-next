import { validateAccessToken } from "app/utils/auth/validateAccessToken";

export const dynamic = "force-dynamic"; // To resolve Dynamic Server Error

export default async function MyAccountPage() {
  const customer = await validateAccessToken();

  return (
    <div>
      <section>
        <h2>Your info</h2>
        <h1>Bienvenido {customer.firstName}</h1>
        <p>email: {customer.email}</p>
      </section>
    </div>
  );
}
