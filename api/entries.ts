import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchEntries } from './miniflux';

export default async function (request: VercelRequest, response: VercelResponse) {
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl
  const categoryId = request.body.categoryId

  // call miniflux api to get all the entries with provided API token and then return entries in response
  const entries = await fetchEntries(categoryId, userToken, userUrl)
  response.send(entries);
}