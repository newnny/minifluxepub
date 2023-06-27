import type { VercelRequest, VercelResponse } from '@vercel/node';

import { EPub } from 'epub-gen-memory';
import { fetchEntriesFromDate } from './miniflux';


export default async function (request: VercelRequest, response: VercelResponse) {
  //request.body = {contents, userToken, userUrl, selectedDate, ids}
  let options = request.body.contents
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl
  const days = request.body.selectedDate
  const categoryIds = request.body.ids
  const filter = request.body.filter

  const contentResults = await Promise.all(
    categoryIds.flatMap(async (id) => {
      const result = await fetchEntriesFromDate(id, days, userToken, userUrl)
      if (filter) {
        const entries = result.entries.map(entry => ({
          title: `[${entry.feed.category.title}] ${entry.title}`,
          author: entry.author,
          content: entry.content && entry.content.split(" ").length > 150 ? 
          `<a href="${entry.url}" target="_blank" rel="noreferrer">See original article</a><br /><br />  ${entry.content}` : false
        }))
        return (entries)
      } else {
        const entries = result.entries.map(entry => ({
          title: `[${entry.feed.category.title}] ${entry.title}`,
          author: entry.author,
          content: `Original url: ${entry.url}<br /> + ${entry.content}`
        }))
        return (entries)
      }
    })
  )

  const flattenResult = contentResults.flatMap(c => c)
  const filteredResult = flattenResult.filter(c => c.content !== false)

  options = {
    ...options,
    content: filteredResult,
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