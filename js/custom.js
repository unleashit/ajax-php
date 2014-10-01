(function() {

"use strict";

var Actors = {

    init: function( config ) {
        this.config = config;
        $.ajaxSetup({
            url: 'index.php',
            type: 'POST',
            dataType: 'json'
        });

        this.config.form.find('button').remove();
        this.setupTemplates();
        this.bindEvents();
    },

    bindEvents: function() {
        this.config.letterSelection.on('change', this.fetchActors );
        this.config.actorsList.on('click', 'li', this.displayAuthorInfo );
        this.config.actorInfo.on('click', this.closeOverlay);
    },

    setupTemplates: function() {
        this.config.actorListTemplate = Handlebars.compile( this.config.actorListTemplate );
        this.config.actorInfoTemplate = Handlebars.compile( this.config.actorInfoTemplate );

        Handlebars.registerHelper( 'fullName', function( actor ) {
            return actor.first_name + ' ' + actor.last_name;
        });
    },

    fetchActors: function() {
        var alist = Actors.config.actorsList;
        $.ajax({
            data: Actors.config.form.serialize(),
            success: function ( results ) {
                alist.empty();
                $('.no-results').remove();
                if ( results[0] ) {
                    alist.show().append( Actors.config.actorListTemplate( results ) );
                } else {
                    alist.hide().parent().append('<p class="no-results">Nothing found.</p>');
                }
            },
            error: function () {
                alert('Could not connect');
            }
        });
    },

    displayAuthorInfo: function( e ) {
       // Actors.config.actorInfo.fadeOut(200);
        $.ajax({
            data: { actor_id: $(this).data('actor_id') }
        }).done(function( results ) {
            Actors.config.actorInfo.html( Actors.config.actorInfoTemplate( results ) ).slideDown(300);
            // Actors.config.actorInfo.html( Actors.config.actorInfoTemplate({ info: results }) ).slideDown(300);
        });
        e.preventDefault();
    },

    closeOverlay: function() {
        Actors.config.actorInfo.fadeOut(300);
    }

};

Actors.init({
    letterSelection: $('#q'),
    form: $('#actor-selection'),
    actorListTemplate: $('#actor_list_template').html(),
    actorInfoTemplate: $('#actor_info_template').html(),
    actorsList: $('ul.actors_list'),
    actorInfo: $('.actor_info')
});

})();