import axios from 'axios';

const apiUrl = 'https://example.com/miniflux/api/v1/me';

export const fetchFeeds = async (token: string) => {
  try {
    const response = await axios.get (apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response, "res")
    
    if (response.data) {
      const userData = response.data
      console.log(response.data);
      return(userData)
    } else {
      console.error('Failed to retrieve user data');
    }
  } catch (error) {
    console.error(error);
  }
};
