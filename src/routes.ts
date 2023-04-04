import { routesVersion1 } from './routes/v1';
import { ICustomRoute } from './types/Route';

const routes: ICustomRoute[] = [...routesVersion1];

export const defineRoutes = (callback: (args: ICustomRoute[]) => void) => callback(routes);
