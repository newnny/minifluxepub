import type { VercelRequest, VercelResponse } from '@vercel/node';

const Epub = require('epub-gen');

export default async function (request: VercelRequest, response: VercelResponse) {
  const options = request.body.data

  try{
  const epub = new Epub(options, 'localhost:3000/download/my-ebook');
  const epubBuffer = await epub.promise;

  response.setHeader('Content-Type', 'application/epub+zip');
  response.setHeader('Content-Disposition', 'attachment; filename=my-ebook.epub');
  response.send(epubBuffer);
} catch (error) {
  console.error('Error generating ePub:', error);
  response.status(500).send('Error generating ePub');
}
}