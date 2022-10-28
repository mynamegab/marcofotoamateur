import adminRouter from "./admin.route.js";
import publicRouter from "./public.route.js";

export const initPublicRoutes = (app) => {
    app.use('/api/public', publicRouter);

    console.log('Initialized public routes');
};

export const initAdminRoutes = (app) => {
    app.use('/api/admin', adminRouter);

    console.log('Initialized admin routes');
};