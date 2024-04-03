import { parse } from "cookie";
import {
  decrypt,
  type FlagDefinitionsType,
  type FlagOverridesType,
} from "@vercel/flags";

export const FLAGS = {
  newFeature: {
    description: "Controls whether the new feature is visible",
    origin: "https://example.com/#new-feature",
    options: [
      { value: false, label: "Off" },
      { value: true, label: "On" },
    ],
  },
  exampleFlag: {
    options: [{ value: false }, { value: true }],
    origin: "https://example.com/flag/exampleFlag",
    description: "This is an example flag.",
  },
} as const satisfies FlagDefinitionsType;

export type Flags = {
  -readonly [Name in keyof typeof FLAGS]: (typeof FLAGS)[Name]["options"][number]["value"];
};

export async function getFlags(request: Request) {
  // Default values
  const flags: Flags = {
    exampleFlag: false,
    newFeature: false,
  };

  // Apply overrides
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const overrideCookie = cookies["vercel-flag-overrides"];
  if (overrideCookie) {
    const overrides = await decrypt<FlagOverridesType>(overrideCookie);
    if (typeof overrides?.exampleFlag === "boolean") {
      flags.exampleFlag = overrides.exampleFlag;
    }
    if (typeof overrides?.newFeature === "boolean") {
      flags.newFeature = overrides.newFeature;
    }
  }

  return flags;
}
