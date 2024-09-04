import { protectRouteWithRole } from "@/auth/session";


export default async function AdminPage({}) {

  const session = await protectRouteWithRole();

  return (
    <div>
      Admin Page - Only Admins can visiit <br />

      {JSON.stringify(session)}
    </div>
  );
}