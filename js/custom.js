(function() {
"use strict";

var Actors = {
    init: function( config ) {
        this.config = config;

        $('button').remove();
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
        $.ajax({
            url: 'index.php',
            type: 'POST',
            data: Actors.config.form.serialize(),
            dataType: 'json',
            success: function (results) {
                Actors.config.actorsList.empty().append( Actors.config.actorListTemplate( results ) );
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