import axios from 'axios';

const getCategory = '/api/categories';
const getFeeds = '/api/feeds'
const getEntries = '/api/entries'


export const FetchCategory = async (token: string, url: string | undefined) => {
  try {
    const response = await axios.post(getCategory, {
      userToken: token,
      userUrl: url
    });
    if (response.data) {
      const userData = response.data
      return (userData)
    } else {
      console.error('Failed to retrieve user data');
    }
  } catch (error) {
    console.error(error);
  }
};

export const FetchFeeds = async (token: string, url: string|undefined, categoryid: number, ) => {
  try {
    const response = await axios.post(getFeeds, {
      userToken: token,
      userUrl: url,
      categoryId: categoryid
    })
    if (response.data) {
      const userData = response.data
      return (userData)
    } else {
      console.error('Failed to retrieve user data');
    }
  } catch (error) {
    console.error(error);
  }
}

export const FetchEntries = async (token: string, url: string|undefined, categoryid: number, ) => {
  try {
    const response = await axios.post(getEntries, {
      userToken: token,
      userUrl: url,
      categoryId: categoryid
    })
    if (response.data) {
      const userData = response.data
      return (userData)
    } else {
      console.error('Failed to retrieve user data');
    }
  } catch (error) {
    console.error(error);
  }
}
