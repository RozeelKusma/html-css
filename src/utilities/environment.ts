import { CONFIG } from '~/config';

import { LogLevel } from './logger';

/** The App environment */
export type Environment = 'development' | 'production';
export const APP_ENV: Environment = CONFIG.APP_ENV === 'production' ? 'production' : 'development';

export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : 'log';
