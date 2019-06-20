require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var cmd = process.argv[2];

var input = process.argv[3];

if (cmd === "do-what-it-says") {
    fs.readFile(input, "utf8", function (err, data) {
        if(err) throw err;
        var dataArr = data.split(",");
        cmd = dataArr[0];
        input = dataArr[1];
    });
}

switch (search) {
    case "concert-this":
        var URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
        break;
    case "spotify-this-song":
        break;
    case "movie-this":
        var URl = "http://www.omdbapi.com/?t=" + input + "&apikey=trilogy"
        break;
    default:
        console.log("Please enter a valid command.");
}





