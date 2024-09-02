import LoginForm from "@/auth/forms/login.form";


export default function Home({}) {
  return (
    <div className="min-h-svh flex justify-center items-center sm:px-4 py-14">
      <LoginForm />
    </div>
  );
}