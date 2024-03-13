import { getSession } from "next-auth/react";

export async function middleware(req, ev) {
  const session = await getSession({ req });

  if (!session && !req.url.startsWith("/api/auth/")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    continue: true,
  };
}
