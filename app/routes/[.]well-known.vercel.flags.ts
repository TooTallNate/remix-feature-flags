import { verifyAccess, type ApiData } from "@vercel/flags";
import { json, type LoaderFunctionArgs } from "@remix-run/server-runtime";
import { FLAGS } from "~/flags.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return json(null, { status: 401 });

  const apiData: ApiData = {
    definitions: FLAGS,
  };

  return json(apiData);
}
