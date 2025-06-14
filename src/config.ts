import type { MigrationConfig } from "drizzle-orm/migrator"

export type APIConfig = {
    defaults: {
        accessTokenExpiresInSeconds: number;
        refreshTokenExpiresInSeconds: number;
    };
    secret: string;
    platform: string;
    db: DBConfig;
    fileserverHits: number;
}

export type DBConfig = {
    url: string;
    migrations: MigrationConfig;
}

process.loadEnvFile()


const envOrFail = (key: string): string => {
    const value = process.env[key]

    if (!value) {
        throw new Error(`Environment variable "${key}" is not defined.`)
    }

    return value
}


export const config: APIConfig = {
    defaults: {
        accessTokenExpiresInSeconds: 3600,
        refreshTokenExpiresInSeconds: 60 * 3600,
    },
    secret: envOrFail("JWT_SECRET"),
    platform: envOrFail("PLATFORM"),
    db: {
        url: envOrFail("DB_URL"),
        migrations: { 
            migrationsFolder: "./src/db/migrations"
        }
    },
    fileserverHits: 0
}
