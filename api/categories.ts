import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchCategories } from './miniflux';

export default async function (request: VercelRequest, response: VercelResponse) {
  const categories = await fetchCategories(request.body.userToken, request.body.userUrl)
  response.send(categories);
}