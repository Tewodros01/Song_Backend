import { ObjectId } from "mongoose";
import { ISong, ISongDocument, SongModel } from "../models/song.model";

const songService = {
  createNewSong: async (song: ISong): Promise<ISongDocument> => {
    try {
      const newSong: ISongDocument = new SongModel(song);
      await newSong.save();
      return newSong;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  getAllSong: async (): Promise<ISongDocument[]> => {
    try {
      const songs: ISongDocument[] = await SongModel.find({});
      return songs;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  getSongById: async (id: string): Promise<ISongDocument | null> => {
    try {
      const song: ISongDocument | null = await SongModel.findById(id);
      return song;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  getSongByGenre: async (genre: string): Promise<ISongDocument[]> => {
    try {
      const songs: ISongDocument[] = await SongModel.find({ genre });
      return songs;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  getSongByTitle: async (title: string): Promise<ISongDocument[]> => {
    try {
      const songs: ISongDocument[] = await SongModel.find({ title });
      return songs;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  getSongByArtist: async (artist: string): Promise<ISongDocument[]> => {
    try {
      const songs: ISongDocument[] = await SongModel.find({ artist });
      return songs;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  updateSong: async (
    id: string,
    updatedSongData: ISong
  ): Promise<ISongDocument | null> => {
    try {
      const updatedSong: ISongDocument | null =
        await SongModel.findByIdAndUpdate(id, updatedSongData, { new: true });
      return updatedSong;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  deleteSong: async (id: string): Promise<ISongDocument | null> => {
    try {
      const song = await SongModel.findByIdAndDelete(id);
      return song;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getNumberOfSongsByGenre: async (genre: string): Promise<number> => {
    try {
      const numberOfSongs: number = await SongModel.countDocuments({ genre });
      return numberOfSongs;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getNumberOfSongsByAlbum: async (album: string): Promise<number> => {
    try {
      const numberOfSongs: number = await SongModel.countDocuments({ album });
      return numberOfSongs;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getNumberOfSongsAndAlbumsByArtist: async (
    artist: string
  ): Promise<{ songs: number; albums: number }> => {
    try {
      const artistData = await SongModel.aggregate([
        {
          $match: { artist },
        },
        {
          $group: {
            _id: "$album",
            songs: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            albums: { $sum: 1 },
            songs: { $sum: "$songs" },
          },
        },
      ]);

      if (artistData.length === 0) {
        return { songs: 0, albums: 0 };
      }

      return {
        songs: artistData[0].songs,
        albums: artistData[0].albums,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getStatistics: async (): Promise<any> => {
    try {
      const totalSongs: number = await SongModel.countDocuments();
      const distinctAlbums: string[] = await SongModel.distinct("album");
      const totalAlbums: number = distinctAlbums.length;

      const distinctArtists: string[] = await SongModel.distinct("artist");
      const totalArtists: number = distinctArtists.length;

      const distinctGenres: string[] = await SongModel.distinct("genre");
      const totalGenres: number = distinctGenres.length;

      return {
        totalSongs,
        totalAlbums,
        totalArtists,
        totalGenres,
      };
    } catch (error) {
      throw new Error("Error fetching counts: " + error);
    }
  },

  getAllAlbumsWithNumberOfSongsAndArtists: async (): Promise<any[]> => {
    try {
      return await SongModel.aggregate([
        {
          $group: {
            _id: "$album",
            artist: { $first: "$artist" },
            songs: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            album: "$_id",
            artist: 1,
            songs: 1,
          },
        },
      ]);
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getAllArtistsWithNumberOfAlbumsAndSongs: async (): Promise<any[]> => {
    try {
      return await SongModel.aggregate([
        {
          $group: {
            _id: "$artist",
            artist: { $first: "$artist" },
            albums: { $addToSet: "$album" },
            songs: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            artist: 1,
            albums: { $size: "$albums" },
            songs: 1,
          },
        },
      ]);
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getAllGenresWithNumberOfSongsAlbumAndArtists: async (): Promise<any[]> => {
    try {
      return await SongModel.aggregate([
        {
          $group: {
            _id: "$genre",
            songs: { $sum: 1 },
            albums: { $addToSet: "$album" },
            artists: { $addToSet: "$artist" },
          },
        },
        {
          $project: {
            _id: 0,
            genre: "$_id",
            songs: 1,
            numberOfAlbums: { $size: "$albums" },
            numberOfArtists: { $size: "$artists" },
          },
        },
      ]);
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
};

export default songService;
