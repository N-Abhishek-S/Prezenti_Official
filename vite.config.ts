import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
import type { IncomingMessage, ServerResponse } from 'http';
import inquiryNotificationHandler from './api/inquiry-notification';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

type RequestWithBody = IncomingMessage & {
  body?: unknown;
};

type LocalApiResponse = ServerResponse & {
  status: (statusCode: number) => LocalApiResponse;
  json: (payload: unknown) => LocalApiResponse;
};

async function readRequestBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');

  if (!rawBody) {
    return {};
  }

  const contentType = request.headers['content-type'] || '';

  if (String(contentType).includes('application/json')) {
    return JSON.parse(rawBody);
  }

  return rawBody;
}

function createLocalApiResponse(response: ServerResponse): LocalApiResponse {
  const localResponse = response as LocalApiResponse;

  localResponse.status = (statusCode: number) => {
    localResponse.statusCode = statusCode;
    return localResponse;
  };

  localResponse.json = (payload: unknown) => {
    if (!localResponse.headersSent) {
      localResponse.setHeader('Content-Type', 'application/json; charset=utf-8');
    }

    localResponse.end(JSON.stringify(payload));
    return localResponse;
  };

  return localResponse;
}

function localServerlessApiPlugin() {
  return {
    name: 'local-serverless-api',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/inquiry-notification', async (request, response) => {
        try {
          const requestWithBody = request as RequestWithBody;

          try {
            requestWithBody.body = await readRequestBody(request);
          } catch {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'application/json; charset=utf-8');
            response.end(
              JSON.stringify({
                success: false,
                message: 'Invalid JSON request body.',
              }),
            );
            return;
          }

          await inquiryNotificationHandler(
            requestWithBody as Parameters<typeof inquiryNotificationHandler>[0],
            createLocalApiResponse(response) as Parameters<typeof inquiryNotificationHandler>[1],
          );
        } catch (error) {
          console.error('Local inquiry API adapter error:', error);

          if (!response.headersSent) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json; charset=utf-8');
          }

          response.end(
            JSON.stringify({
              success: false,
              message: 'Unable to send inquiry. Please try again.',
            }),
          );
        }
      });
    },
  };
}

function normalizeBasePath(value?: string) {
  const fallbackBasePath = '/';
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return fallbackBasePath;
  }

  const baseWithLeadingSlash = trimmedValue.startsWith('/') ? trimmedValue : `/${trimmedValue}`;
  return baseWithLeadingSlash.endsWith('/') ? baseWithLeadingSlash : `${baseWithLeadingSlash}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');

  for (const [key, value] of Object.entries(env)) {
    process.env[key] ??= value;
  }

  const isVercel = Boolean(process.env.VERCEL);
  const configuredBasePath = env.VITE_BASE_PATH || process.env.VITE_BASE_PATH;
  const basePath = isVercel ? '/' : normalizeBasePath(configuredBasePath);

  return {
    base: basePath,

    plugins: [
      localServerlessApiPlugin(),
      react(),
      tailwindcss(),
    ],

    cacheDir: '.tmp/vite-cache',

    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
      },
    },

    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
      open: false,
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
  };
});
