import { Router } from "express";
import { getAlbumByID, getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumID", getAlbumByID);


export default router;