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

  getNumberOfSongsByGenre: async (): Promise<Map<string, number>> => {
    try {
      const songs: ISongDocument[] = await SongModel.find({});
      const genreCountMap: Map<string, number> = new Map();
      songs.forEach((song) => {
        const genre = song.genre;
        if (genreCountMap.has(genre)) {
          genreCountMap.set(genre, genreCountMap.get(genre)! + 1);
        } else {
          genreCountMap.set(genre, 1);
        }
      });
      return genreCountMap;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getNumberOfSongsByAlbum: async (): Promise<Map<string, number>> => {
    try {
      const songs: ISongDocument[] = await SongModel.find({});
      const albumCountMap: Map<string, number> = new Map();
      songs.forEach((song) => {
        const album = song.album;
        if (albumCountMap.has(album)) {
          albumCountMap.set(album, albumCountMap.get(album)! + 1);
        } else {
          albumCountMap.set(album, 1);
        }
      });
      return albumCountMap;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },

  getNumberOfSongsAndAlbumsByArtist: async (): Promise<
    Map<string, { songs: number; albums: string[] }>
  > => {
    try {
      const songs: ISongDocument[] = await SongModel.find({});
      const artistStatsMap: Map<string, { songs: number; albums: string[] }> =
        new Map();
      songs.forEach((song) => {
        const artist = song.artist;
        if (artistStatsMap.has(artist)) {
          artistStatsMap.get(artist)!.songs++;
          if (!artistStatsMap.get(artist)!.albums.includes(song.album)) {
            artistStatsMap.get(artist)!.albums.push(song.album);
          }
        } else {
          artistStatsMap.set(artist, { songs: 1, albums: [song.album] });
        }
      });
      return artistStatsMap;
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
};

export default songService;
