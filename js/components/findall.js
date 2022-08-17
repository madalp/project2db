import { movieObj, movieDataList } from './movie';
const apikey =
    import.meta.env.VITE_API_KEY;
var maxShow = 100;

let allAPI = async(query, plot) => {
    // movieData.splice(0, movieData.length);
    movieDataList.clear();
    const api = await fetch(
        `https://www.omdbapi.com/?s=${query}&plot=${plot}&apikey=${apikey}`
    );

    const data = await api.json();
    console.log('data:' + JSON.stringify(data));
    const search = data.Search;
    if (Boolean(data.Response)) {
        if (search.length < maxShow) {
            maxShow = search.length;
        }

        for (let i = 0; i < maxShow; i++) {
            console.log('I:' + JSON.stringify(search[i]));
            const plotUrl = `https://www.omdbapi.com/?t=${search[i].Title}&plot=short&apikey=${apikey}`;

            const plot = await fetch(plotUrl);
            const plotty = await plot.json();
            console.log('plotty data: ' + plotty);
            var _imdbID = plotty.imdbID.trim();
            movieDataList.set(_imdbID, plotty);
            // movieData.push(movieRowData);
        }
        movieObj.plotMovie();
    }
};

export default allAPI;