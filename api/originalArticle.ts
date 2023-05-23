import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchOriginalArticle } from './miniflux';

export default async function (request: VercelRequest, response: VercelResponse) {
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl
  const entryId = request.body.entryId

  const orginalArticle = await fetchOriginalArticle(entryId, userToken, userUrl);

  response.send(orginalArticle);
}