"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const song_routes_1 = __importDefault(require("./api/song.routes"));
const routes = (0, express_1.Router)();
routes.use("/songs", song_routes_1.default);
exports.default = routes;
