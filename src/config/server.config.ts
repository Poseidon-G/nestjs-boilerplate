import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
    apiPrefix: process.env.SERVER_API_PREFIX || 'api/v1',
}));