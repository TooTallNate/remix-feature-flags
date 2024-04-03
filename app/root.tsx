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
            data-owner-id={"team_MtLD9hKuWAvoDd3KmiHs9zUg"}
            data-project-id="prj_sgUa9M8ZTgUBNpOLjAalKeILdsec"
            data-branch="main"
          />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
