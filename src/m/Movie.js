
//Creating CLass Movie//
/**
 * Constructor function for the class Book
 * @constructor
 * @param {{movieid: string, title: string, releasedate: string}} slots - Object creation slots.
 */
function Movie(slots ) {
 this.movieid = slots.movieid
 this.title = slots.title
 this.releasedate = slots.releasedate
}


//Initialize Movie//
Movie.instances = {};

//Converting each row of movies//
Movie.convertRecord2Object = function (movieRow){
 const movie = new Movie(movieRow);
 return movie;
}

//Retrieve all Movies//
Movie.retrieveAll = function () {
 var movieString = "";
 try {
  if (localStorage.getItem("movies")) {
   movieString = localStorage.getItem("movies");
  }
 } catch(e) {
  alert("Error when reading from local storage\n" + e);
 }
 if (movieString) {
  const movies = JSON.parse( movieString);
  const keys = Object.keys( movies);
  console.log(`${keys.length} movies loaded`)
  for (let i=0; i < keys.length; i++) {
   let key = keys[i];
   Movie.instances[key] = Movie.convertRecord2Object( movies[key]);
  }
 }
};

Movie.saveAll = function () {
 let error = false;
 try {
  const movieString = JSON.stringify( Movie.instances);
  localStorage.setItem("movies" , movieString);
 } catch (e) {
  alert("Error when writing to Local Storage\n" + e);
  error = true;
 }
 if (!error) {
  const noOfMovie = Object.keys( Movie.instances).length;
  console.log(`${noOfMovie} movies saved.`);
 }
};

//class level method for creating a new movie instance//
Movie.add = function (slots) {
 const movie = new Movie(slots);
 Movie.instances[slots.movieid] = movie;
 console.log(`Movie ${slots.movieid} created!`)
};

//Updating Movie instance
Movie.update = function (slots) {
 const movie = Movie.instances[slots.movieid],
  releasedate = slots.releasedate.toString()
 if (movie.title !== slots.title) movie.title = slots.title;
 if (movie.releasedate !== releasedate) movie.releasedate = releasedate;
 console.log(`Movie ${slots.movieid} modified!`);
};

//Deleting movie instance
Movie.destroy = function (movieid) {
 if (Movie.instances[movieid]) {
  console.log(`Movie ${movieid} deleted`);
  delete Movie.instances[movieid];
 } else {
  console.log(`There is no movie with ID ${movieid} in the database!`);
 }
};


//TEst data
Movie.createTestData = function () {
 Movie.instances["1"] = new Movie(
  {movieid:"1", title:"Pulp Fiction", releasedate:'1994-05-12'});
 Movie.instances["2"] = new Movie(
  {movieid:"2", title:"Star Wars", releasedate:   '1977-05-25'});
 Movie.instances["3"] = new Movie(
  {movieid:"3", title:"Casablanca", releasedate:'1943-01-23'});
 Movie.instances["4"] = new Movie(
  {movieid:"4", title:"The Godfather", releasedate:'1972-03-15'});
 Movie.saveAll();
};

Movie.clearData = function () {
 if (confirm("Do you really want to delete all book data?")) {
  Movie.instances = {}
  localStorage.setItem("movie", "{}");
 }
};

