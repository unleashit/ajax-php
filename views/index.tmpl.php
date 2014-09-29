<?php include '_partials/header.php'; 
if ( isset($_POST['q']) ) {
	$val = $_POST['q'];
}
?>

<h1>Search Actors By Last Name</h1>
<form action="index.php" method="post">
	<select name="q" id="q">
	<?php
		$alphabet = str_split('abcdefghijklmnopqrstuvwxyz');
		foreach ($alphabet as $letter) {
			($letter == $val) ? $selected = ' selected="selected"' : $selected = '';
			echo '<option value="' . $letter . '"' . $selected . '>' . $letter . '</option>';
		}
	?>
	</select>
	<button type="submit" class="btn btn-lg btn-primary">Go!</button>
</form>

<?php if ( isset($actors) ) { ?>
<ul class="actors_list">
	<?php foreach ($actors as $a) {
		echo "<li data-actor_id='{$a->actor_id}'><a href='actor.php?actor_id={$a->actor_id}'>{$a->first_name} {$a->last_name}</a></li>";
	} ?>
</ul>
<?php } ?>

<?php include '_partials/footer.php'; ?>