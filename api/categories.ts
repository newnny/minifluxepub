
import type { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = (request: VercelRequest, response: VercelResponse)=> {
  // get API token from the request object

  const token = request.body.token;

  console.log(token);

  // make an http call to miniflux API server with API token and fetch categories
  const { name = 'World' } = request.query;
  response.send(`Hello ${name}!`);

}