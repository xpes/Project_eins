pl.v.create = {
    setupUserInterface: function () {
        const saveButton = document.forms["Movie1"].commit;
        // load all movie objects
        Movie.retrieveAll();
        // set an event handler for the save/submit button
        saveButton.addEventListener("click",
            pl.v.create.handleSaveButtonClickEvent);
        // handle the event when the browser window/tab is closed
        window.addEventListener("beforeunload", function () {
           Movie.saveAll();
        });
    },
    handleSaveButtonClickEvent: function () {
        const formEl = document.forms["Movie1"];
        console.log(formEl.releasedate.value)
        const slots = { movieid: formEl.movieid.value,
            title: formEl.title.value,
            releasedate: formEl.releasedate.value
        };

        Movie.add( slots);
        formEl.reset();
    }
};
