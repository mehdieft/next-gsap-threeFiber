import Toast from "@/app/components/eccomerce/toast.jsx";
import SignupPage from "./signup.jsx";

export default async function Signup({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      {params.error && <Toast message={params.error} type="error" />}
      <SignupPage />
    </>
  );
}
