(function() {
"use strict";

var Actors = {
    init: function( config ) {
        this.config = config;

        $('#actor-selection').find('button').remove();
        this.setupTemplates();
        this.bindEvents();
    },
    bindEvents: function() {
        this.config.letterSelection.on('change', this.fetchActors );
    },
    setupTemplates: function() {
        this.config.actorListTemplate = Handlebars.compile( this.config.actorListTemplate );

        Handlebars.registerHelper( 'fullName', function( actor ) {
            return actor.first_name + ' ' + actor.last_name;
        });
    },
    fetchActors: function() {
        var alist = Actors.config.actorsList;
        $.ajax({
            url: 'index.php',
            type: 'POST',
            data: Actors.config.form.serialize(),
            dataType: 'json',
            success: function (results) {
                Actors.config.actorsList.empty();
                $('.no-results').remove();
                if ( results[0] ) {
                    alist.show().append(Actors.config.actorListTemplate(results));
                } else {
                    alist.hide().parent().append('<p class="no-results">Nothing found.</p>');
                }
            },
            error: function () {
                alert('Could not connect');
            }
        });
    }
};

Actors.init({
    letterSelection: $('#q'),
    form: $('#actor-selection'),
    actorListTemplate: $('#actor_list_template').html(),
    actorsList: $('ul.actors_list')
});

})();