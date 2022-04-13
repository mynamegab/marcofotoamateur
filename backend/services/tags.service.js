import Tag from "../mongodb/models/Tag.js";

export const createTag = async ({ name, type }) => {
    return await Tag.create({ name, type });
};
