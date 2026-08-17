import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/modules/auth/config";
import { AuthUnavailable } from "@/modules/auth/auth-unavailable";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  if (!isClerkConfigured) {
    return <AuthUnavailable />;
  }

  return (
    <div className="flex justify-center px-4 py-16">
      <SignUp signInUrl="/login" />
    </div>
  );
}
