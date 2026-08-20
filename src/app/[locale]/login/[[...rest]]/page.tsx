import { SignIn } from "@clerk/nextjs";
import { isClerkConfigured } from "@/modules/auth/config";
import { AuthUnavailable } from "@/modules/auth/auth-unavailable";
import { AuthLayout } from "@/modules/auth/auth-layout";
import { clerkAppearance } from "@/modules/auth/clerk-appearance";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  if (!isClerkConfigured) {
    return (
      <AuthLayout>
        <AuthUnavailable />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <SignIn signUpUrl="/signup" appearance={clerkAppearance} />
    </AuthLayout>
  );
}
