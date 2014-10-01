<?php

require 'functions.php';
connect();

// for AJAX
if ( isXHR() ) {
    if ( isset($_POST['q']) ) {
        echo json_encode( get_actors_by_last_name( $_POST['q'] ) );
    }
    if ( isset( $_POST['actor_id'] ) ) {
        echo json_encode( get_actor_info( $_POST['actor_id'] ) );
    }
//    if ( isset( $_POST['actor_id'] ) ) {
//        $info = get_actor_info( $_POST['actor_id'] );
//        $arr = array(
//            "film_info" => $info->film_info,
//            "first_name" => $info->first_name,
//            "last_name" => $info->last_name
//         );
//        echo json_encode( $arr );
//    }
    return;
}

if ( isset($_POST['q']) ) {
    $actors = get_actors_by_last_name( $_POST['q'] );
}

include 'views/index.tmpl.php';