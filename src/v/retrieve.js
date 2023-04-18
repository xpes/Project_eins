pl.v.retrieve = {
 setupUserInterface: function () {
  const tableBodyEl = document.querySelector("table#movies>tbody");
  // load all movie objects
  Movie.retrieveAll();
  // for each movie, create a table row with a cell for each attribute
  for (const key of Object.keys( Movie.instances)) {
   const moovie = Movie.instances[key];
   const row = tableBodyEl.insertRow();
   row.insertCell().textContent = moovie.movieid;
   row.insertCell().textContent = moovie.title;
   row.insertCell().textContent = moovie.releasedate;
  }
 }
};