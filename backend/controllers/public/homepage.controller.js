import homepageService from "../../services/homepage.service.js";
import { getPicturesById } from "../../services/pictures.service.js";
import { mapPictureToDto } from "./pictures.controller.js";

const createHomepageDto = (pictures) => ({
    picturesOfTheMoment: pictures.map(mapPictureToDto)
});

export const getHomepage = async (req, res, next) => {
    try {
        const homepage = await homepageService.getHomepage();
        const pictures = await getPicturesById(homepage?.picturesOfTheMoment || []);

        res.json(createHomepageDto(pictures));
    } catch (err) {
        next(err);
    }
};