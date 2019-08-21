`use-strict`;
const express = require('express')
var bodyParser = require("body-parser")
var fs = require('fs')
const app = express()
const port = 80
const restricted = [
	"index.js",
	"node_modules",
	"package.json",
	"logs"
]

const SECRET = "okepapa"

function log(message) {
	console.log(message)
	var date = new Date()
	if (typeof message != 'string')
		message = JSON.stringify(message);
	var logFile = fs.appendFile("logs/"+date.toLocaleDateString()+".log","["+date.toLocaleTimeString()+"] "+message+"\n", (error) => {})
}

app.get('/play/:key', function(req, res) {
    var key = req.params.key;

    var music = 'music/' + key;

    var stat = fs.statSync(music);
    range = req.headers.range;
    var readStream;

    if (range !== undefined) {
        var parts = range.replace(/bytes=/, "").split("-");

        var partial_start = parts[0];
        var partial_end = parts[1];

        if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
            return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
        }

        var start = parseInt(partial_start, 10);
        var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
        var content_length = (end - start) + 1;

        res.status(206).header({
            'Content-Type': 'audio/mpeg',
            'Content-Length': content_length,
            'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
        });

        readStream = fs.createReadStream(music, {start: start, end: end});
    } else {
        res.header({
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });
        readStream = fs.createReadStream(music);
    }
    readStream.pipe(res);
})

app.get('/*', (request, response) => {
	log(request.connection.remoteAddress+" -> "+request.url)
	var filename = request.url.substring(1,request.url.length)
	if (filename.endsWith("/") || filename == "") {
		filename += "index.html"
	}
	sendFile(filename, response)
})

function sendFile(filename , response) {
	var alloy = true
	for (var r in restricted) {
		if (filename.indexOf(restricted[r]) !== -1){
			alloy = false
		}
	}
	if (alloy) {
		remote = response.connection.remoteAddress;
		response.sendFile(filename, {root: __dirname}, function (err) {
		    if (err) {
				log(err)
		    	response.send("<h1> Error! Error code: "+err.status+"</h1>")
		    } else {
		    	log(remote+" <- "+filename)
		    }
		})
	} else {
		if (filename.indexOf(SECRET) !== -1) {
			var end = filename.substring(0,filename.length-SECRET.length)
			response.sendFile(end, {root: __dirname}, function (err) {
			    if (err) {
			    	log(err);
			    	response.send("<h1> Error! Error code: "+err.status+"</h1>")
			    } else {
			    	log('Sent to the boss:'+filename)
			    }
			})
		} else {
			log("Denying in loading restricted file: "+filename)
			response.send("<h1> Error! Error code: 404</h1>")
		}
	}
}

var urlencodedParser = bodyParser.urlencoded({extended: false})

app.post("/naeb/", urlencodedParser, function (request, response) {
	console.log("kek\n");
	if(!request.body) return response.sendStatus(400)
    log(request.body)
    sendFile("/naeb/answer.html", response)
})

app.listen(port, (err) => {
    if (err) {
    	return log('something bad happened', err)
    }

    log(`===============[Server is listening on ${port}]===============`)
})
