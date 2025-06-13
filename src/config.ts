export type APIConfig = {
    dbUrl: string;
    fileserverHits: number;
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
    dbUrl: envOrFail("DB_URL"),
    fileserverHits: 0
}
