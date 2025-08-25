import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  console.log("req.body:", req.body);

  try {
    const { id, firstName, lastName, imageURL } = req.body;

    // check if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // sign up
      console.log("new user!")
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageURL,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
