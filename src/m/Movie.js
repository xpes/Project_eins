
//Creating CLass Movie//
function Movie(slots) {
    this.movieid = slots.movieid
    this.title = slots.title
    this.releasedate = slots.releasedate
}

//Initialize Movie//
Movie.instances = {};

//class level method for creating a new movie instance//
Movie.add = function (slots) {
    const movie = new Movie(slots);
    Movie.instances[slots.movieid] = movie;
    console.log(`Movie ${slots.movieid} created!`)

};

//Converting each row of movies//
Movie.convertRecord2Object = function (movieRow){
    const movie = new Movie(movieRow);
    return movie
}

//Retrieve all Movies//
Movie.retrieveAll = function () {
    var moviestring = "";
    try {
        if (localStorage["movie"]){
            moviestring = localStorage["movie"]
        }
    } catch(e) {
        alert("Error when reading from local storage\n" + e);
    }
    if (moviestring) {
        const movie = JSON.parse( moviestring);
        const keys = Object.keys( movie);
        console.log(`${keys.length} books loaded`)
        for (const key of keys){
            Movie.instances[key] = Movie.convert2Object( books[key]);
        }
    }
};