import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";

export function loader() {
  return json({
    isDev: process.env.NODE_ENV === 'development'
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { isDev } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        {isDev ? (
          <script
            src="https://vercel.live/_next-live/feedback/feedback.js"
            data-explicit-opt-in="true"
            data-owner-id="__REPLACE_WITH_VERCEL_ORG_ID__"
            data-project-id="__REPLACE_WITH_VERCEL_PROJECT_ID__"
            data-branch="__REPLACE_WITH_GIT_BRANCH_NAME__"
          />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
