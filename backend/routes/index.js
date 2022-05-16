import albumsRouter from "./albums.route.js";
import tagsRouter from "./tags.route.js";

export const initPublicRoutes = (app) => {
    app.use('/api/public/albums', albumsRouter.publicRouter);

    console.log('Initialized public routes');
};

export const initAdminRoutes = (app) => {
    app.use('/api/admin/albums', albumsRouter.adminRouter);
    app.use('/api/admin/tags', tagsRouter.adminRouter);

    console.log('Initialized admin routes');
};