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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const song_service_1 = __importDefault(require("../services/song.service"));
const songController = {
    createNewSong: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, artist, album, genre } = req.body;
            const songData = {
                title: title,
                artist: artist,
                album: album,
                genre: genre,
            };
            const newSong = song_service_1.default.createNewSong(songData);
            res.status(201).json(newSong);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getAllSongs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songs = yield song_service_1.default.getAllSong();
            res.status(200).json(songs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getSongById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songId = req.params.id;
            const song = yield song_service_1.default.getSongById(songId);
            if (!song) {
                res.status(404).json({ error: "Song not found" });
                return;
            }
            res.status(200).json(song);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    updateSong: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songId = req.params.id;
            const { title, artist, album, genre } = req.body;
            const songData = {
                title: title,
                artist: artist,
                album: album,
                genre: genre,
            };
            const updatedSong = yield song_service_1.default.updateSong(songId, songData);
            if (!updatedSong) {
                res.status(404).json({ error: "Song not found" });
                return;
            }
            res.status(200).json(updatedSong);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getSongsByGenre: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const genre = req.params.genre;
            const songs = yield song_service_1.default.getSongByGenre(genre);
            res.status(200).json(songs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getSongsByTitle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const title = req.params.title;
            const songs = yield song_service_1.default.getSongByTitle(title);
            res.status(200).json(songs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getSongsByArtist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const artist = req.params.artist;
            const songs = yield song_service_1.default.getSongByArtist(artist);
            res.status(200).json(songs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    deleteSong: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const songId = req.params.id;
            console.log(songId);
            if (!songId) {
                res.status(404).json({ error: "Id is Requerd !" });
            }
            const song = yield song_service_1.default.deleteSong(songId);
            if (song) {
                res.status(204).json({ message: "Deleted" });
            }
            else {
                res.status(404).json({ error: "Song not found!" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getNumberOfSongsByGenre: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const genreCountMap = yield song_service_1.default.getNumberOfSongsByGenre();
            res.status(200).json(Array.from(genreCountMap.entries()));
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getNumberOfSongsByAlbum: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const albumCountMap = yield song_service_1.default.getNumberOfSongsByAlbum();
            res.status(200).json(Array.from(albumCountMap.entries()));
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getNumberOfSongsAndAlbumsByArtist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const artistStatsMap = yield song_service_1.default.getNumberOfSongsAndAlbumsByArtist();
            const artistStatsArray = Array.from(artistStatsMap.entries()).map(([artist, { songs, albums }]) => ({
                artist,
                songs,
                albums: albums.length,
            }));
            res.status(200).json(artistStatsArray);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getStatistics: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const statistics = yield song_service_1.default.getStatistics();
            res.status(200).json(statistics);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getAllAlbumsWithSongsAndArtist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const albums = yield song_service_1.default.getAllAlbumsWithNumberOfSongsAndArtists();
            res.status(200).json(albums);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getAllArtistsWithAlbumsAndSongs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const artists = yield song_service_1.default.getAllArtistsWithNumberOfAlbumsAndSongs();
            res.status(200).json(artists);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    getAllGenresWithArtistAlbumsAndSongs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const artists = yield song_service_1.default.getAllGenresWithNumberOfSongsAlbumAndArtists();
            res.status(200).json(artists);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
};
exports.default = songController;
