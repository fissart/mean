/*
import app from './app';
import { startConnection } from './database'
import * as https from 'https';
import * as fs from 'fs';
import * as util from 'util'

const readFile = util.promisify(fs.readFile);

async function startServer() {
  startConnection();
  https.createServer({
     cert: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/fullchain.pem'),
     key: fs.readFileSync('/etc/letsencrypt/live/www.esfapa.edu.pe/privkey.pem')
   },app).listen(app.get('port'), function(){
  	console.log('Servidor https correindo en el puerto 443');
  });
}

*/
startServer();
import app from './app';
import { startConnection } from './database'

async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();
