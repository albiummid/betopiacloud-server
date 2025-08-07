import User from "../db/models/user.model";

export const findUserByUsername = async (username: string) => {
    return User.findOne({ username });
};

export const createUser = async (username: string, password: string) => {
    const user = new User({ username, password });
    return user.save();
};
