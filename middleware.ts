import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // Protect all routes except public ones
  }
});

export const config = {
  matcher: [
    // Only run middleware on these paths
    "/((?!_next|.*\\.(?:css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|map)).*)",
    "/(api|trpc)(.*)", // Also protect API and tRPC routes
  ],
};
