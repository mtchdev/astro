export const DBConfig = {
    mysql: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: '1',
        database: process.env.DB_DATABASE
    }
}
