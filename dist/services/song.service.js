"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const song_model_1 = require("../models/song.model");
const songService = {
    createNewSong: (song) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newSong = new song_model_1.SongModel(song);
            yield newSong.save();
            return newSong;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getAllSong: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({});
            return songs;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getSongById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const song = yield song_model_1.SongModel.findById(id);
            return song;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getSongByGenre: (genre) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({ genre });
            return songs;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getSongByTitle: (title) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({ title });
            return songs;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getSongByArtist: (artist) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({ artist });
            return songs;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    updateSong: (id, updatedSongData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedSong = yield song_model_1.SongModel.findByIdAndUpdate(id, updatedSongData, { new: true });
            return updatedSong;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    deleteSong: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const song = yield song_model_1.SongModel.findByIdAndDelete(id);
            return song;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getNumberOfSongsByGenre: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({});
            const genreCountMap = new Map();
            songs.forEach((song) => {
                const genre = song.genre;
                if (genreCountMap.has(genre)) {
                    genreCountMap.set(genre, genreCountMap.get(genre) + 1);
                }
                else {
                    genreCountMap.set(genre, 1);
                }
            });
            return genreCountMap;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getNumberOfSongsByAlbum: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({});
            const albumCountMap = new Map();
            songs.forEach((song) => {
                const album = song.album;
                if (albumCountMap.has(album)) {
                    albumCountMap.set(album, albumCountMap.get(album) + 1);
                }
                else {
                    albumCountMap.set(album, 1);
                }
            });
            return albumCountMap;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getNumberOfSongsAndAlbumsByArtist: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_model_1.SongModel.find({});
            const artistStatsMap = new Map();
            songs.forEach((song) => {
                const artist = song.artist;
                if (artistStatsMap.has(artist)) {
                    artistStatsMap.get(artist).songs++;
                    if (!artistStatsMap.get(artist).albums.includes(song.album)) {
                        artistStatsMap.get(artist).albums.push(song.album);
                    }
                }
                else {
                    artistStatsMap.set(artist, { songs: 1, albums: [song.album] });
                }
            });
            return artistStatsMap;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getStatistics: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalSongs = yield song_model_1.SongModel.countDocuments();
            const distinctAlbums = yield song_model_1.SongModel.distinct("album");
            const totalAlbums = distinctAlbums.length;
            const distinctArtists = yield song_model_1.SongModel.distinct("artist");
            const totalArtists = distinctArtists.length;
            const distinctGenres = yield song_model_1.SongModel.distinct("genre");
            const totalGenres = distinctGenres.length;
            return {
                totalSongs,
                totalAlbums,
                totalArtists,
                totalGenres,
            };
        }
        catch (error) {
            throw new Error("Error fetching counts: " + error);
        }
    }),
    getAllAlbumsWithNumberOfSongsAndArtists: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield song_model_1.SongModel.aggregate([
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
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getAllArtistsWithNumberOfAlbumsAndSongs: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield song_model_1.SongModel.aggregate([
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
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
    getAllGenresWithNumberOfSongsAlbumAndArtists: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield song_model_1.SongModel.aggregate([
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
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
};
exports.default = songService;
