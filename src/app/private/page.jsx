import { protectRoute } from "@/auth/session";


export default async function PrivatePage({}) {

  const session = await protectRoute("/private");

  return (
    <div>
      PrivatePage <br />

      {JSON.stringify(session)}
    </div>
  );
}