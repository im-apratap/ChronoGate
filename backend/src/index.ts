import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => ({ status: "OK", service: "ChronoGate" }))

  // Verify transaction on-chain and issue JWT
  .post(
    "/api/auth/verify-access",
    ({ body }) => {
      console.log("Verifying access for:", body);
      // In production, instantiate Connection and verify signature
      // Then verify if the user's subscription PDA is active.

      return {
        success: true,
        expiresAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour mock
      };
    },
    {
      body: t.Object({
        wallet: t.String(),
        txHash: t.String(),
        creatorId: t.String(),
      }),
    },
  )

  // Register a new creator
  .post(
    "/api/creator/register",
    ({ body }) => {
      console.log("Registering creator:", body);
      // In production, save to Supabase before triggering on-chain logic

      return {
        success: true,
        creatorId: "mock-id-1234",
        slug: (body.name as string).toLowerCase().replace(/\\s+/g, "-"),
      };
    },
    {
      body: t.Object({
        wallet: t.String(),
        name: t.String(),
        description: t.String(),
        category: t.String(),
        imageUrl: t.String(),
      }),
    },
  )

  .listen(3000);

console.log(
  `Backend API running at ${app.server?.hostname}:${app.server?.port}`,
);
