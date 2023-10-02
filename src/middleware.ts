import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

const publicRoutes = ["/", "/auth/signin", "/auth/signup"];

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      return !(publicRoutes.includes(req.nextUrl.pathname) && token === null);
    }
  }
});
