import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchFeeds } from './miniflux';

export default async function (request: VercelRequest, response: VercelResponse) {
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl
  const categoryId = request.body.categoryId

  const feeds = await fetchFeeds(categoryId, userToken, userUrl);

  response.send(feeds);
}