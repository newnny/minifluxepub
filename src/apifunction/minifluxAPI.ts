import axios from 'axios';

const apiUrl = '/api/categories';

export const fetchFeeds = async (token: string) => {
  try {
    const response = await axios.post (apiUrl, {
        token: token
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
