import { GitHub } from './providers/github';
import { createDispatchProxy } from './proxies';

export const client = createDispatchProxy(GitHub);
