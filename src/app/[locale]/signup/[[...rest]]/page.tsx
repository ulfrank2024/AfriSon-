import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/modules/auth/config";
import { AuthUnavailable } from "@/modules/auth/auth-unavailable";
import { AuthLayout } from "@/modules/auth/auth-layout";
import { clerkAppearance } from "@/modules/auth/clerk-appearance";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  if (!isClerkConfigured) {
    return (
      <AuthLayout>
        <AuthUnavailable />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <SignUp signInUrl="/login" appearance={clerkAppearance} />
    </AuthLayout>
  );
}
