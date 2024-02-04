import { Router } from "express";
import song_router from "./api/song.routes";

const routes: Router = Router();

routes.use("/songs", song_router);

export default routes;
