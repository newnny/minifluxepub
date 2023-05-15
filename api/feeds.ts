import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function (request: VercelRequest, response: VercelResponse) {
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl
  const categoryId = request.body.categoryId

  // call miniflux api to get all the categories with provided API token and then return categories in response

  const apiUrl = userUrl ? `${userUrl}/v1/categories/${categoryId}/feeds` : `https://reader.miniflux.app/v1/categories/${categoryId}/feeds`;
  const apiResponse = await fetch(apiUrl, {
    headers: {
      "X-Auth-Token": `${userToken}`
    }
  });
  const feeds = await apiResponse.json();

  response.send(feeds);
}