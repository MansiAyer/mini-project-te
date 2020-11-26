const http = require('http')
const { Client } = require('pg')
var url = require('url');


const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'restaurant',
	password: 'postgres',
	port: 5432,
})

let fsm = require('fs')
let fsd = require('fs')

const portm = 3600
const portd = 3400



const serverm = http.createServer(function(req, res) {
  res.statusCode = 220
  
  var q = url.parse(req.url, true)
  
  	var filename = "." + q.pathname;
  
  res.setHeader('Content-Type', 'text/html')
  fsm.readFile(filename, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File m not found!');
        } else {
            res.write(data);
        }
        res.end();
    })
  
})

const serverd = http.createServer(function(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  fsd.readFile('gal.html', function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File d not found!');
        } else {
            res.write(data);
        }
        res.end();
    })
  
})

serverm.listen(portm, function(error) {
	if (error) {
	  console.log(`we have found`, error)
	}
	else {
		console.log('server listens to meep' + portm)
	}
})

serverd.listen(portd, function(error) {
	if (error) {
	  console.log(`we have found`, error)
	}
	else {
		console.log('server listens to dia ' + portd)
	}
})

client.connect()
.then(() => console.log("connected"))
.then(() => client.query("select * from food"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())