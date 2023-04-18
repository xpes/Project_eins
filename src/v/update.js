pl.v.update = {
 setupUserInterface: function () {
  const formEl = document.forms["Movie"],
   saveButton = formEl.commit,
   selectMovieEl = formEl.selectMovie;
  Movie.retrieveAll();  // load all movie objects
  // populate the selection list with books
  for (const key of Object.keys( Movie.instances)) {
   const movie = Movie.instances[key];
   const optionEl = document.createElement("option");
   optionEl.text = movie.title;
   optionEl.value = movie.movieid;
   selectMovieEl.add( optionEl, null);
 }
 // when a movie is selected, fill the form with its data
 selectMovieEl.addEventListener("change",
  pl.v.update.handleMovieSelectionEvent);
 // set an event handler for the submit/save button
 saveButton.addEventListener("click",
  pl.v.update.handleSaveButtonClickEvent);
 // handle the event when the browser window/tab is closed
 window.addEventListener("beforeunload", Movie.saveAll);
 },

 handleMovieSelectionEvent: function () {
  const formEl = document.forms["Movie"],
   selectMovieEl = formEl.selectMovie,
   key = selectMovieEl.value;
  if (key) {
   const movie = Movie.instances[key];
   formEl.movieid.value = movie.movieid;
   formEl.title.value = movie.title;
   formEl.releasedate.value = movie.releasedate;
  } else {
   formEl.reset();
  }
 },

 handleSaveButtonClickEvent: function () {
  const formEl = document.forms["Movie"],
   selectMovieEl = formEl.selectMovie;
  const slots = { movieid: formEl.movieid.value,
   title: formEl.title.value,
   releasedate: formEl.releasedate.value
  };
  Movie.update( slots);
  // update the selection list option element
  selectMovieEl.options[selectMovieEl.selectedIndex].text = slots.title;
  formEl.reset();
 }
};
    