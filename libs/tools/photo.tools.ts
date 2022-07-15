import Photo from "../../models/Photo";
import User from "../../models/User";

export async function getAllPhotos() {
  const photos = await Photo.find().populate("owner");
  return photos;
}

export async function addPhoto(
  userId: string,
  options: { name: string; film: string; camera: string }
) {
  const photo = await Photo.create({
    owner: userId,
    camera: options.camera,
    film: options.film,
    name: options.name,
  });
  const user = await User.updateOne(
    { _id: userId },
    { $push: { photos: photo._id } }
  );
  return user;
}

export async function deletePhoto(photoId: string) {
  await Photo.findOneAndDelete({ _id: photoId });
  const res = await User.updateMany({ $pull: { photos: photoId } });
  return res;
}
