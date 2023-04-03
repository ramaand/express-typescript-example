export const DEFAULT_PORT: number = parseInt(process.env.PORT!);
export const DEFAULT_PAGE_SIZE: number = parseInt(process.env.DEFAULT_PAGE_SIZE!);
export const DEFAULT_LOCALE: string = process.env.DEFAULT_LOCALE!;

export const IS_DEV_MODE: boolean = process.env.DEV === 'true';
export const JWT_KEY: string = process.env.JWT_KEY!;
export const TOKEN_NAME: string = process.env.TOKEN_NAME!;

export const ASC: string = 'asc';
export const DESC: string = 'desc';
export const DEFAULT_SORT: string = ASC;
