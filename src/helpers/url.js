const API_ROOT = 'http://codeial.codingninjas.com:8000';

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: () => `${API_ROOT}/api/v2/posts?page=1&limit=5`,

  //   fetchPosts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};