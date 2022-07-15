interface iPhoto {
  _id: string;
  owner: string;
  name: string;
  camera?: string;
  film?: string;
}

interface User {
  _id: string;
  login: string;
  password: string;
  avatar_url: string;
  description: string;
  follows: User[];
  photos: iPhoto[];
}

export default User;
