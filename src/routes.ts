import { routesVersion1 } from './routes/v1';

const routes = [...routesVersion1];

export const defineRoutes = (callback: (routes: IRoute[]) => void): void => callback(routes);
