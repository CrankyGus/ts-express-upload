import "dotenv/config";
import { z } from "zod";

export const env = z.object({
  SERVER_PORT: z.string().default("3000"),
  SERVER_HOST: z.string(),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
