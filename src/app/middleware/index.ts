import { MetaReducer } from '@ngrx/store';

import checker from './checker';
import logger from './logger';

const metaReducers: MetaReducer<any>[] = [logger, checker];
export default metaReducers;
