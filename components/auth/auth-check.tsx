"use client";

import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Sign in Required</h3>
        <p className="text-muted-foreground mb-6">
          Please sign in to access this feature.
        </p>
        <SignInButton mode="modal">
          <Button size="lg">Sign In</Button>
        </SignInButton>
      </div>
    );
  }

  return <>{children}</>;
}
