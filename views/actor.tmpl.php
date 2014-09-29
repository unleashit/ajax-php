<?php include '_partials/header.php'; ?>
<?php
	if ( $info ) {
		echo "<h1>{$info->first_name} {$info->last_name}</h1>";
		echo "<p>" . parse_film_info( $info->film_info ) . "</p>";
	} else {
		echo 'No info available.';
	}
?>

<p><a href="index.php">back</a></p>

<?php include '_partials/footer.php'; ?>