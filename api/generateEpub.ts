import type { VercelRequest, VercelResponse } from '@vercel/node';

import { EPub } from 'epub-gen-memory';
import { fetchEntriesFromDate, updateReadStatus } from './miniflux';


export default async function (request: VercelRequest, response: VercelResponse) {
  //request.body = {contents, userToken, userUrl, selectedDate, ids}
  let options = request.body.contents
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl
  const days = request.body.selectedDate
  const categoryIds = request.body.ids

  const contentResults = await Promise.all(
    categoryIds.flatMap(async (id) => {
      const result = await fetchEntriesFromDate(id, days, userToken, userUrl)
      const entries = result.entries.map(entry => ({
        title: `[${entry.feed.category.title}] ${entry.title}`,
        author: entry.author,
        content: entry.content
      }))
      return (entries)
    })
  )

  const flattenResult = contentResults.flatMap(c => c)

  options = {
    ...options,
    content: flattenResult,
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