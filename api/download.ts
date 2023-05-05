
/*
import type { VercelRequest, VercelResponse } from '@vercel/node';
 
module.exports = (request: VercelRequest, response: VercelResponse) => {
   response.setHeader('content-type','text/plain');
    console.error("there has been an error, this is just a test")
    response.send('hello world, this is download endpoint')
}*/

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (request: VercelRequest, response: VercelResponse) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  response.setHeader('Access-Control-Allow-Credentials', 'true');

  const { name = 'World' } = request.query;
  response.send(`Hello ${name}!`);

}

/*

module.exports = (request, response) => {
    response.setHeader('content-type','text/plain');
    console.error("there has been an error, this is just a test")
    response.send('hello world, this is download endpoint')
}*/