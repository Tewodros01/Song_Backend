import { Router } from "express";
import songController from "../../controllers/song.controllers";

const song_router: Router = Router();

song_router.get("/statistics/genre", songController.getNumberOfSongsByGenre);
song_router.get("/statistics/album", songController.getNumberOfSongsByAlbum);
song_router.get(
  "/statistics/artist",
  songController.getNumberOfSongsAndAlbumsByArtist
);
song_router.get("/statistics", songController.getStatistics);

song_router.get("/title/:title", songController.getSongsByTitle);
song_router.get("/artist/:artist", songController.getSongsByArtist);
song_router.post("/", songController.createNewSong);
song_router.get("/allArtist", songController.getAllArtistsWithAlbumsAndSongs);
song_router.get("/allAlbum", songController.getAllAlbumsWithSongsAndArtist);
song_router.get("/:id", songController.getSongById);
song_router.get("/", songController.getAllSongs);
song_router.put("/:id", songController.updateSong);

export default song_router;
