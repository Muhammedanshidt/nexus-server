import type { Response } from 'express';

type IHeadersConfig = Record<string, { value: string; enabled: boolean }>;

export const headersConfig: IHeadersConfig = {
  'X-Frame-Options': { value: 'DENY', enabled: true },
  'Content-Type': { value: 'application/json;charset=UTF-8', enabled: true },
  'Strict-Transport-Security': {
    value: 'max-age=63072000;includeSubDomain;preload',
    enabled: true,
  },
  'X-Content-Type-Options': { value: 'nosniff', enabled: true },
  'Content-Security-Policy': { value: 'default', enabled: true },
  'Cache-Control': { value: 'max-age=604800', enabled: true },
  'Referrer-Policy': { value: 'no-referrer', enabled: true },
  'Expect-CT': {
    value: 'max-age=604800,report-uri="https://gewan.info/report"',
    enabled: true,
  },
  'X-XSS-Protection': { value: '1;model=block', enabled: true },
  'Access-Control-Allow-Origin': {
    value: process.env.CORS_ORIGIN ?? 'same-origin',
    enabled: true,
  },
  'Cross-origin-Opener-Policy': {
    value: process.env.CORS_ORIGIN ?? 'same-origin',
    enabled: true,
  },
  'Cross-Origin-Embedder-Policy': { value: 'require-cors', enabled: true },
  'Cross-Origin-Resource-Policy': {
    value: process.env.CORS_ORIGIN ?? 'same-origin',
    enabled: true,
  },
  'Permission-Policy': { value: 'interest-cohort=()', enabled: true },
  'X-DNS-Prefetch-Control': { value: 'off', enabled: true },
  Server: { value: '', enabled: false },
  'X-Powered-By': { value: '', enabled: false },
};

export const sentConfiguredHeaders = (
  res: Response,
  config: IHeadersConfig = headersConfig,
) => {
  for (const headerKey in config) {
    if (Object.hasOwn(config, headerKey)) {
      const { value, enabled } = headersConfig[headerKey];
      if (enabled) res.setHeader(headerKey, value);
      else res.removeHeader(headerKey);
    }
  }
};

export const sentHeaders = (
  res: Response,
  headers: Record<string, string> | null,
) => {
  for (const headerKey in headers) {
    if (Object.hasOwn(headers, headerKey)) {
      res.header(headerKey, headers[headerKey]);
    }
  }
};
