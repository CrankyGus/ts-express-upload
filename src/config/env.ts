import "dotenv/config";
import { z } from "zod";

export const env = z.object({
  SERVER_PORT: z.string().default("3000"),
});

env.parse(process.env);
