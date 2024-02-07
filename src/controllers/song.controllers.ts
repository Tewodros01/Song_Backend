import { Request, Response } from "express";
import songService from "../services/song.service";
import { ISong } from "../models/song.model";

const songController = {
  createNewSong: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, artist, album, genre } = req.body;
      const songData: ISong = {
        title: title,
        artist: artist,
        album: album,
        genre: genre,
      };

      // Await the result of createNewSong
      const newSong = await songService.createNewSong(songData);

      // Now, newSong contains the newly created song document
      res.status(201).json(newSong);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllSongs: async (req: Request, res: Response): Promise<void> => {
    try {
      const songs = await songService.getAllSong();
      res.status(200).json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getSongById: async (req: Request, res: Response): Promise<void> => {
    try {
      const songId: string = req.params.id;
      const song = await songService.getSongById(songId);
      if (!song) {
        res.status(404).json({ error: "Song not found" });
        return;
      }
      res.status(200).json(song);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateSong: async (req: Request, res: Response): Promise<void> => {
    try {
      const songId: string = req.params.id;

      const { title, artist, album, genre } = req.body;
      const songData: ISong = {
        title: title,
        artist: artist,
        album: album,
        genre: genre,
      };

      const updatedSong = await songService.updateSong(songId, songData);
      if (!updatedSong) {
        res.status(404).json({ error: "Song not found" });
        return;
      }
      res.status(200).json(updatedSong);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getSongsByGenre: async (req: Request, res: Response): Promise<void> => {
    try {
      const genre: string = req.params.genre;
      const songs = await songService.getSongByGenre(genre);
      res.status(200).json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getSongsByTitle: async (req: Request, res: Response): Promise<void> => {
    try {
      const title: string = req.params.title;
      const songs = await songService.getSongByTitle(title);
      res.status(200).json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getSongsByArtist: async (req: Request, res: Response): Promise<void> => {
    try {
      const artist: string = req.params.artist;
      const songs = await songService.getSongByArtist(artist);
      res.status(200).json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteSong: async (req: Request, res: Response): Promise<void> => {
    try {
      const songId = req.params.id;
      console.log(songId);
      if (!songId) {
        res.status(404).json({ error: "Id is Requerd !" });
      }
      const song = await songService.deleteSong(songId);

      if (song) {
        res.status(204).json({ message: "Deleted" });
      } else {
        res.status(404).json({ error: "Song not found!" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getNumberOfSongsByGenre: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const genre: string = req.params.genre;
      const numberOfSongs = await songService.getNumberOfSongsByGenre(genre);
      res.status(200).json({ numberOfSongs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getNumberOfSongsByAlbum: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const album: string = req.params.album;
      const numberOfSongs = await songService.getNumberOfSongsByAlbum(album);
      res.status(200).json({ numberOfSongs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getNumberOfSongsAndAlbumsByArtist: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const artist: string = req.params.artist;
      const { songs, albums } =
        await songService.getNumberOfSongsAndAlbumsByArtist(artist);
      res.status(200).json({ songs, albums });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getStatistics: async (req: Request, res: Response): Promise<void> => {
    try {
      const statistics = await songService.getStatistics();
      res.status(200).json(statistics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllAlbumsWithSongsAndArtist: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const albums =
        await songService.getAllAlbumsWithNumberOfSongsAndArtists();
      res.status(200).json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllArtistsWithAlbumsAndSongs: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const artists =
        await songService.getAllArtistsWithNumberOfAlbumsAndSongs();
      res.status(200).json(artists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllGenresWithArtistAlbumsAndSongs: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const artists =
        await songService.getAllGenresWithNumberOfSongsAlbumAndArtists();
      res.status(200).json(artists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default songController;
