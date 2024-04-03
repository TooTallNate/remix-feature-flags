import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { getFlags } from "~/flags.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const flags = await getFlags(request);
  return { flags };
}

export default function Index() {
  const { flags } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Remix + Vercel</h1>
      <h2>Vercel Toolbar and Feature Flags Example</h2>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://vercel.com/docs/workflow-collaboration/vercel-toolbar"
            rel="noreferrer"
          >
            Vercel Toolbar Documentation
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://vercel.com/docs/workflow-collaboration/feature-flags"
            rel="noreferrer"
          >
            Vercel Feature Flags Documentation
          </a>
        </li>
      </ul>
      <h2>Current Feature Flags</h2>
      <pre>{JSON.stringify(flags, null, 2)}</pre>
    </div>
  );
}
