import { openDB } from 'idb';
import { movieObj, movieDataList } from './movie';

let db;
if ('indexedDB' in window) {
    db = await openDB('my-movie-database', 1, {
        upgrade(db) {
            db.createObjectStore('movies');
        },
    });
}

export async function addData(data) {
    try {
        let _imdbID = data.imdbID;
        await db.put('movies', data, _imdbID);
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
}

export async function addCommentData(imdbID, data) {
    try {
        let _imdbID = imdbID;
        await db.put('movies', data, _imdbID);
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
}

export async function getDataById(id) {
    let _imdbID = '';
    try {
        let plotty = await db.get('movies', id);
        _imdbID = plotty.imdbID;
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }

    if (id == _imdbID) {
        return true;
    } else {
        return false;
    }
}

export async function getData() {
    document.getElementById('app').innerHTML = '';
    try {
        let favoriteDataList = await db.getAll('movies');
        console.log('favoriteDataList:' + JSON.stringify(favoriteDataList));
        for (let i = 0; i < favoriteDataList.length; i++) {
            const favorite = favoriteDataList[i];
            var _imdbID = favorite.imdbID.trim();
            movieDataList.set(_imdbID, favorite);
        }
        movieObj.plotMovie();
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
}

export async function deleteDataById(id) {
    //'tt0072890'
    try {
        await db.delete('movies', id);
        var _imdbID = id;
        movieDataList.delete(_imdbID);
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
    if (movieDataList.get(_imdbID)) {
        return false;
    } else {
        return true;
    }
}