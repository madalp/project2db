import {
    addData,
    getDataById,
    deleteDataById,
    getData,
    addCommentData,
} from './database';
export let movieDataList = new Map();
export class Movie {
    plotMovie = () => {
        if (movieDataList.size == 0) {
            document.getElementById('app').innerHTML = '';
        }

        const mainDiv = document.getElementById('app');
        // for (let i = 0; i < movieData.size; i++) {
        for (const [key, data] of movieDataList) {
            console.log(`${key} = ${data}`);

            // let data = movieData[i];
            let imdbID = data.imdbID.trim();
            const movieRow = document.createElement('div');
            const movieButton = document.createElement('div');
            const movieComment = document.createElement('div');
            const poster = document.createElement('img');
            const movieTitle = document.createElement('h2');
            const movieYear = document.createElement('h2');
            const movieActors = document.createElement('h2');
            const movieBox = document.createElement('h2');
            const movieRated = document.createElement('h2');
            const moviePlot = document.createElement('h2');

            movieButton.innerHTML = `<button type="button" class="toggleFavoriteClass" id="${imdbID}">Favorite</button><button type="button" data_id="${imdbID}" id="view_comment_${imdbID}">View Comment</button>`;
            movieComment.innerHTML = `<p class="hideComment" id="comment_div_${imdbID}"><input type="text" id="comment_${imdbID}"  value="${data.comment}"/><button type="button" data_id="${imdbID}" id="add_comment_${imdbID}">Add /Update Comment</button></p>`;

            poster.src = `${data.Poster}`;
            movieTitle.textContent = `Title: ${data.Title}`;
            movieYear.textContent = `Year: ${data.Year}`;
            movieActors.textContent = `Actors: ${data.Actors}`;
            movieBox.textContent = `Box Office: ${data.BoxOffice}`;
            movieRated.textContent = `Rated: ${data.Rated}`;
            moviePlot.textContent = `Plot: ${data.Plot}`;
            movieRow.className = 'movieRowClass';
            mainDiv.append(movieRow);
            mainDiv.append(movieButton);
            mainDiv.append(movieComment);
            mainDiv.append(poster);
            mainDiv.append(movieTitle);
            mainDiv.append(movieYear);
            mainDiv.append(movieActors);
            mainDiv.append(movieBox);
            mainDiv.append(movieRated);
            mainDiv.append(moviePlot);

            const elementToggleFavoriteClass = document.getElementById(`${imdbID}`);
            elementToggleFavoriteClass.addEventListener('click', (e) => {
                let elementId = e.target.id;
                console.log('clicked element:' + elementId);
                makeFavorite(elementId);
            });

            const elementAddComment = document.getElementById(
                `add_comment_${imdbID}`
            );
            elementAddComment.addEventListener('click', (e) => {
                let elementId = elementAddComment.getAttribute('data_id');
                addMovieComment(elementId);
            });

            const elementViewComment = document.getElementById(
                `view_comment_${imdbID}`
            );
            elementViewComment.addEventListener('click', (e) => {
                let elementId = elementViewComment.getAttribute('data_id');
                viewMovieComment(elementId);
            });
        }
    };
}

function showMyFavorite() {
    movieDataList.clear();
    getData();
}

async function makeFavorite(id) {
    let isFavData = await getDataById(id);
    if (isFavData === true) {
        await deleteDataById(id);
        showMyFavorite();

        console.log('delete Fav movieData: ' + JSON.stringify(movieDataList));
    } else if (isFavData === false) {
        let movieData = movieDataList.get(id);
        addData(movieData);
        console.log('Add Fav movieData: ' + JSON.stringify(movieDataList));
    }
}

async function viewMovieComment(id) {
    let isFavData = await getDataById(id);
    if (isFavData === true) {
        let comment = document.getElementById('comment_' + id);
        let comment_data = comment.value;
        let comment_div = document.getElementById('comment_div_' + id);
        comment_div.className = 'showComment';
        console.log(
            'view movie comment for movie : ' + id + ', comment_data:' + comment_data
        );
    } else {
        console.log('view movie is not in Fav movieData: ' + id);
    }
}

async function addMovieComment(id) {
    let isFavData = await getDataById(id);
    if (isFavData === true) {
        let comment = document.getElementById('comment_' + id);
        let comment_data = comment.value;
        let comment_div = document.getElementById('comment_div_' + id);
        comment_div.className = 'hideComment';
        let movieData = movieDataList.get(id);
        movieData.comment = comment_data;
        addCommentData(id, movieData);
        console.log(
            'add movie comment for movie : ' + id + ', comment_data:' + comment_data
        );
    } else {
        console.log('Add movie is not in Fav movieData: ' + id);
    }
}

export const movieObj = new Movie();