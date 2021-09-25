const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editProfile: () => `${API_ROOT}/users/edit`,
  fetchPosts: () => `${API_ROOT}/posts?page=1&limit=5`,

  //   fetchPosts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,

  userProfile: (userId) => `${API_ROOT}/user/${userId}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  // removeFriend: () =>
  //   `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
};
