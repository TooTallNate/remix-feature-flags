import { parse } from 'cookie';
import { decrypt, type FlagOverridesType } from "@vercel/flags";

export async function getFlags(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const overrideCookie = cookies["vercel-flag-overrides"];

  const overrides = overrideCookie
    ? await decrypt<FlagOverridesType>(overrideCookie)
    : {};

  const flags = {
    exampleFlag: overrides?.exampleFlag ?? false,
  };

  return flags;
}