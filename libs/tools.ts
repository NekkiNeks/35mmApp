//models
import User from "../models/User";
import Photo from "../models/Photo";

export async function checkUserExist(login: string): Promise<boolean> {
  const res = await User.findOne({ login });
  return !!res;
}

export async function createUser(login: string, password: string) {
  try {
    const user = await User.create({ login, password });
    return { id: user._id };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    throw new Error("Error: cant create user");
  }
}

export async function getUser(
  login: string,
  options?: { noPassword: boolean }
) {
  try {
    if (options && options.noPassword) {
      const user = await User.findOne({ login }).select("-password");
      return user;
    }
    const user = await User.findOne({ login });
    return user;
  } catch (error) {
    throw new Error("Error: cant find user");
  }
}

export async function getUserById(id: string) {
  try {
    const user = User.findById(id);
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`cant find user ${id}`);
    }
  }
}

export async function addPhoto(
  id: string,
  options: { name: string; film: string; camera: string }
) {
  const photo = await Photo.create({
    owner: id,
    camera: options.camera,
    film: options.film,
    name: options.name,
  });
  const user = await User.updateOne(
    { _id: id },
    { $push: { photos: photo._id } }
  );
  return user;
}
