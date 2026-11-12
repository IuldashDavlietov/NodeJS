import dotenv from "dotenv";

dotenv.config({ quiet: true });

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
};

export const env = {
  PORT: Number(process.env.PORT ?? 8000),
  MONGODB: requireEnv("MONGODB"),
  SECRET_KEY: requireEnv("SECRET_KEY"),
  PASS_ITERATION: Number(requireEnv("PASS_ITERATION")),
  PASS_KEYLEN: Number(requireEnv("PASS_KEYLEN")),
  PASS_DIGEST: requireEnv("PASS_DIGEST"),
  PAGE_SIZE: Number(process.env.PAGE_SIZE) || 20
};
