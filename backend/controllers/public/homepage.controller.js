import homepageService, { getLastCreatedPictures } from "../../services/homepage.service.js";
import { getPicturesById } from "../../services/pictures.service.js";
import { mapPictureToDto } from "./pictures.controller.js";

const createHomepageDto = ({ picturesOfTheMoment, lastCreatedPictures }) => ({
    picturesOfTheMoment: picturesOfTheMoment.map(mapPictureToDto),
    lastCreatedPictures: lastCreatedPictures.map(mapPictureToDto),
});

export const getHomepage = async (req, res, next) => {
    try {
        const homepage = await homepageService.getHomepage();

        const picturesOfTheMoment = await getPicturesById(homepage?.picturesOfTheMoment || []);
        // const lastCreatedPictures = await getLastCreatedPictures();

        const homepageDto = createHomepageDto({ picturesOfTheMoment, lastCreatedPictures: [] });

        res.json(homepageDto);
    } catch (err) {
        next(err);
    }
};