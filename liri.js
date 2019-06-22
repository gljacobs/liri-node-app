require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

var cmd = process.argv[2];
var input = process.argv.splice(3).join(" ");

fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) throw err;
    dataArr = data.split(",");
    if (cmd === "do-what-it-says") {
        cmd = dataArr[0];
        input = dataArr[1];
    }

    switch (cmd) {
        case "concert-this":
            var URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
            axios.get(URL).then(
                function (response) {
                        console.log(`\n~~~~~~~~~~~~~~~~~~~~ Finding gigs for ${input} ~~~~~~~~~~~~~~~~~~~~`);                        
                        for (var i = 0; i < response.data.length; i++) {
                            console.log(`\nVenue: ${response.data[i].venue.name}`);
                            console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
                            console.log(`Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);
                        }
                })
                .catch(function (err) {
                    console.log("\nThis band does not exist or isn't currently touring, sorry.");
                });
            break;
        case "spotify-this-song":
            spotify.search({ type: 'track', query: input, limit: 1 })
                .then(function (response) {
                    if (response.tracks.total === 0) {
                        console.log("\nNo results found.... maybe try out this song?");
                        console.log("Artist: Ace of Base");
                        console.log("Song: The Sign")
                        console.log("Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE")
                        console.log("Album: The Sign (US Album) [Remastered]");
                    }
                    else {                        
                        console.log(`\n~~~~~~~~~~~~~~~~~~~~ Finding Song Info for ${input} ~~~~~~~~~~~~~~~~~~~~`);
                        console.log(`Artist: ${response.tracks.items[0].album.artists[0]["name"]}`);
                        console.log(`Song: ${response.tracks.items[0].name}`);
                        console.log(`Link: ${response.tracks.items[0].external_urls.spotify}`);
                        console.log(`Album: ${response.tracks.items[0].album.name}`);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
            break;
        case "movie-this":
            var URL = "http://www.omdbapi.com/?t=" + input + "&apikey=trilogy";
            axios.get(URL).then(
                function (response) {                    
                    if (!response.data.Title) {
                        console.log("\nNo results found...... Maybe try this movie out!");
                        console.log("Title: Mr. Nobody");
                        console.log("Released: 2009");
                        console.log("IMDB Rating: 7.8");
                        console.log("Rotten Tomatoes Rating: 67%");
                        console.log("Produced In: Belgium, Germany, Canada, France, USA, U");
                        console.log("Language: English, Mohawk");
                        console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
                        console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
                    }
                    else {
                        console.log(`\n~~~~~~~~~~~~~~~~~~~~ Finding Movie Info for ${input} ~~~~~~~~~~~~~~~~~~~~`);
                        console.log(`Title: ${response.data.Title}`);
                        console.log(`Released: ${response.data.Year}`);
                        console.log(`IMDB Rating: ${response.data.imdbRating}`);
                        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                        console.log(`Produced In: ${response.data.Country}`);
                        console.log(`Language: ${response.data.Language}`);
                        console.log(`Plot: ${response.data.Plot}`);
                        console.log(`Actors: ${response.data.Actors}`);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
            break;
        default:
            console.log("\nPlease enter a valid command.");
    }
});





