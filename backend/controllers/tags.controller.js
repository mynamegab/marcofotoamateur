export const createTag = async (req, res, next) => {
    try {
        console.log("Get Tag")
        res.json({});
    } catch (err) {
        next(err);
    }
};

export const updateTag = async (req, res, next) => {
    try {
        console.log("Update Tag")
        res.json({});
    } catch (err) {
        next(err);
    }
};