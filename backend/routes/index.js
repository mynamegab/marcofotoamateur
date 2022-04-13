import albumsRouter from "./albums.route.js";
import tagsRouter from "./tags.route.js";

export const initRoutes = (app) => {
    app.use('/api/public/albums', albumsRouter.publicRouter);

    app.use('/api/admin/albums', albumsRouter.adminRouter);
    app.use('/api/admin/tags', tagsRouter.adminRouter);

    console.log('Initialized routes');
};