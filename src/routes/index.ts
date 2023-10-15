
import textRoute from "@routes/text.route";
import defaultRoute from "@routes/default.route";
import tokenRoute from "@routes/token.route";
import { Router } from "express";

interface Route {
    path: string;
    route: Router;
}

const tokens = new Set();
const router = Router();
const routes: Route[] = [
    {
        path: "/text",
        route: textRoute,
    },
    {
        path: "/default",
        route: defaultRoute,
    },
    {
        path: "/token",
        route: tokenRoute,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export { tokens };
export default router;
