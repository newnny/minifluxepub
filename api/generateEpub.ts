import type { VercelRequest, VercelResponse } from '@vercel/node';

import { EPub } from 'epub-gen-memory';

export default async function (request: VercelRequest, response: VercelResponse) {
  let options = request.body
  options = {
    ...options,
    retryTimes: 1,
    fetchTimeout: 10,
    ignoreFailedDownloads: true,
    verbose: true
  }

  try {
    const epub = new EPub(options, options.content);
    const epubBuffer = await epub.genEpub()
    response.send(epubBuffer);
  } catch (error) {
    console.error('Error generating ePub:', error);
    response.status(500).send('Error generating ePub');
  }
}