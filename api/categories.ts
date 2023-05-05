

import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function (request: VercelRequest, response: VercelResponse) {
  const userToken = request.body.userToken
  const userUrl = request.body.userUrl

  console.log(userToken)

  // call miniflux api to get all the categories with provided API token and then return categories in response

  const apiUrl = userUrl ? userUrl : 'https://reader.miniflux.app/v1/categories';
  const apiResponse = await fetch(apiUrl, {
    headers: {
      "X-Auth-Token": `${userToken}`
    }
  });
  const categories = await apiResponse.json();

  response.send(categories);
}