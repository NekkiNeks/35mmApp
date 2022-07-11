interface User {
  _id: string;
  login: string;
  password: string;
  avatar_url: string;
  description: string;
  follows: string[];
  photos: string[];
}

export default User;
