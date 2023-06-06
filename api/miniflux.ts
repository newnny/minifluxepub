interface Category {
  id: number;
  title: String;
}
interface Entries {
  id: number;
  feed_id: number;
  title: string;
  author: string;
  content: string;
  url: string;
  published_at: string;
}
interface EntriesResponse {
  total: number;
  entries: Entries[]; // Use `Entries[]` to indicate an array of `Entries`
}
interface contentRes {
  content: string;
}

// general function to call miniflux api
async function callAPI(endpoint: String, userToken: String, userUrl: String | undefined) {
  const apiUrl = userUrl && userUrl !== "" ? `${userUrl}/v1/${endpoint}` : `https://reader.miniflux.app/v1/${endpoint}`;
  const apiResponse = await fetch(apiUrl, {
    headers: {
      "X-Auth-Token": `${userToken}`
    }
  });
  return (await apiResponse.json())
}

export async function fetchCategories(userToken: String, userUrl: String | undefined): Promise<Category[]> {
  return (await callAPI("categories", userToken, userUrl))
}

//fetch all entries(no periods)
export async function fetchEntries(categoryId: number, userToken: String, userUrl: String | undefined): Promise<EntriesResponse> {
  return (await callAPI(`categories/${categoryId}/entries?order=id&direction=asc`, userToken, userUrl))
}

export async function fetchFeeds(categoryId: number, userToken: String, userUrl: String | undefined): Promise<EntriesResponse> {
  return (await callAPI(`categories/${categoryId}/feeds`, userToken, userUrl))
}

export async function fetchEntriesFromDate(categoryId: number, days: number, userToken: String, userUrl: String | undefined): Promise<EntriesResponse> {
  const getDate: Date = new Date(new Date().setDate(new Date().getDate() - days))
  const unixTimestamp = Math.floor(getDate.getTime() / 1000);
  return (await callAPI(`categories/${categoryId}/entries?order=id&direction=asc&after=${unixTimestamp}`, userToken, userUrl))
}

export async function fetchOriginalArticle(entryId: number, userToken: String, userUrl: String | undefined): Promise<contentRes> {
  return (await callAPI(`entries/${entryId}/fetch-content`, userToken, userUrl))
}
