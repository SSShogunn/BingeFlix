const key = import.meta.env.VITE_APP_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3"

const endPoints = {
    popular:`${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=1`,
    topRated:`${baseUrl}/movie/top_rated?api_key=${key}`,
    trending:`${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
    comedy:`${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
    upComing:`${baseUrl}/movie/upcoming?api_key=${key}`,
}

export const createImagesURL = (filePath, size) => {
    return `https://image.tmdb.org/t/p/${size}/${filePath}`
}

export default endPoints;