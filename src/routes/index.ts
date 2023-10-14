
import textRoute from "@routes/text.route";
import defaultRoute from "@routes/default.route";
import { Router } from "express";

interface Route {
    path: string;
    route: Router;
}

const router = Router();
const routes: Route[] = [
    {
        path: "/text",
        route: textRoute,
    },
    {
        path: "/default",
        route: defaultRoute,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
