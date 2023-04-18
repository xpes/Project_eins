
pl.v.delete = {
 setupUserInterface: function () {
  const formEl = document.forms["Movie"],
   deleteButton = formEl.commit,
   selectMovieEl = formEl.selectMovie;
  Movie.retrieveAll();  // load all movie objects
  // populate the selection list with books
  for (const key of Object.keys(Movie.instances)) {
   const movie = Movie.instances[key];
   const optionEl = document.createElement("option");
   optionEl.text = movie.title;
   optionEl.value = movie.movieid;
   selectMovieEl.add(optionEl, null);
  }        // set an event handler for the submit/save button
  deleteButton.addEventListener("click",
   pl.v.delete.handleDeleteButtonClickEvent);
  // handle the event when the browser window/tab is closed
  window.addEventListener("beforeunload", Movie.saveAll);
 },


 handleDeleteButtonClickEvent: function () {
  const selectEl = document.forms["Movie"].selectMovie,
   movieid = selectEl.value;
  if (movieid) {
   Movie.destroy(movieid);
   // remove deleted movie from select options
   selectEl.remove(selectEl.selectedIndex);
  }
 }
}