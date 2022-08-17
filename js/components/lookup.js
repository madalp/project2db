import { movieObj, movieDataList } from './movie';
const apikey =
    import.meta.env.VITE_API_KEY;

let grabAPI = async(query) => {
    // movieData.splice(0, movieData.length);
    movieDataList.clear();
    const api = await fetch(`https://www.omdbapi.com/?${query}&apikey=${apikey}`);
    const plotty = await api.json();
    console.log(plotty);
    var _imdbID = plotty.imdbID.trim();
    movieDataList.set(_imdbID, plotty);
    movieObj.plotMovie();
    // plotMovie(plotty);
};

export default grabAPI;