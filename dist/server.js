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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const db_conn_1 = __importDefault(require("./config/db.conn"));
const credentials_1 = __importDefault(require("./middlewares/credentials"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const cors_1 = __importDefault(require("cors"));
// Initializations
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Handle options credentials check - before CORS!
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
// built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: false }));
// Settings
app.set("port", process.env.PORT || 3500);
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// serve static files
app.use("/", express_1.default.static(path_1.default.join(__dirname, "/public")));
// Routes
app.use("/api", index_route_1.default);
// Public
app.use("/uploads", express_1.default.static(path_1.default.resolve("uploads")));
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        const filePath = path_1.default.join(__dirname, "..", "views", "404.html");
        res.sendFile(filePath);
    }
    else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_conn_1.default)();
        server.listen(app.get("port"));
        console.log(`Server on port ${app.get("port")}`);
    }
    catch (e) {
        console.log(e);
    }
}))();
