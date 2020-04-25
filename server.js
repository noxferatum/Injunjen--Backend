"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dbConfig = __importStar(require("./app/config/db.config"));
var app = express_1.default();
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors_1.default(corsOptions));
// parse requests of content-type - application/json
app.use(body_parser_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
var db = __importStar(require("./app/models"));
//const db = require("./app/models");
var Role = db.role;
var err;
db.mongoose
    .connect("mongodb://" + dbConfig.config.HOST + ":" + dbConfig.config.PORT + "/" + dbConfig.config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("Successfully connect to MocngoDB.");
    initial();
})
    .catch(function (err) {
    console.error("Connection error", err);
    process.exit();
});
// simple route
app.get("/", function (req, res) {
    res.json({ message: "api funcionando" });
});
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/data.router")(app);
// set port, listen for requests
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server is running on port " + PORT + ".");
});
function initial() {
    Role.estimatedDocumentCount(function (err, count) {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}
