import { RateLimitData } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';
import Log, { LogUtils } from '../utils/Log';

export default class implements DiscordEvent {
  name = 'rateLimit';
  once = false;
	
  async execute(rateLimitData: RateLimitData): Promise<any> {
    try {
      Log.warn(`rate limit reached timeout: ${rateLimitData.timeToReset}`, {
        indexMeta: true,
        meta: {
          timeout: rateLimitData.timeToReset,
          limit: rateLimitData.limit,
          method: rateLimitData.method,
          path: rateLimitData.url,
          route: rateLimitData.route,
          global: rateLimitData.global,
        },
      });
    } catch (e) {
      LogUtils.logError('failed to process event rateLimit', e);
    }
  }
}
