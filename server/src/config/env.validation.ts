type Env = Record<string, string | undefined>;

export function validateEnv(config: Env) {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    ...config,
    PORT: Number(config.PORT ?? 3001),
    THROTTLE_TTL: Number(config.THROTTLE_TTL ?? 60000),
    THROTTLE_LIMIT: Number(config.THROTTLE_LIMIT ?? 100),
    SMTP_PORT: Number(config.SMTP_PORT ?? 587),
    SMTP_SECURE: config.SMTP_SECURE ?? 'false',
    PRISMA_CONNECT_ON_BOOT: config.PRISMA_CONNECT_ON_BOOT ?? 'true',
  };
}
