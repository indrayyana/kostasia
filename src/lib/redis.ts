import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.error('Redis Client Error:', err));

const connectRedis = async () => {
  if (!redis.isOpen) {
    try {
      await redis.connect();
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Redis Connection Failed:', err);
    }
  }
};

connectRedis();

export default redis;

