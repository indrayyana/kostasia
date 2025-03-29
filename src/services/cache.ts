import redis from '@/lib/redis';

export const set = async (key: string, value: unknown, expirationInSecond = 1800): Promise<void> => {
  const data = JSON.stringify(value);
  await redis.set(key, data, { EX: expirationInSecond });
};

export const get = async <T>(key: string): Promise<T | null> => {
  const result = await redis.get(key);

  return result ? (JSON.parse(result) as T) : null;
};

export const del = async (key: string): Promise<void> => {
  await redis.del(key);
};

