"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 relative">
      {/* Home Button - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          size="lg"
          variant="outline"
          className="rounded-lg text-base shadow-sm bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <h2 className="mb-6 text-5xl font-semibold">404</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Whoops!</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-2">
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg text-base shadow-sm bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative max-h-screen w-full p-2 max-lg:hidden">
        <div className="h-full w-full rounded-2xl bg-black"></div>
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
          alt="404 illustration"
          className="absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
