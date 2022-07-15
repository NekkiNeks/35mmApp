//models
import User from "../../models/User";

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
      const user = await User.findOne({ login })
        .select("-password")
        .populate("photos");
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
    const user = User.findById(id).populate("photos");
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`cant find user ${id}`);
    }
  }
}
