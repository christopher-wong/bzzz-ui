const getConfig = () => {
    if (process.env.NODE_ENV === "production") {
        return ""
    } else {
        return "https://localhost:8080"
    }
}

export default getConfig;