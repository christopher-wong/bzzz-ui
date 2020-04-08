const getConfig = () => {
    if (process.env.NODE_ENV === "production") {
        return {
            "api": {
                "host": "api.shipit.live",
                "port": 80,
            }
        }
    } else {
        return {
            "api": {
                "host": "localhost",
                "port": 8080,
            }
        }
    }
}

export default getConfig;