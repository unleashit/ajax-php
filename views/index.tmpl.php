<?php
include '_partials/header.php';
$val = (isset($_POST['q']) ? $_POST['q'] : "");
?>

<h1>Search Actors By Last Name</h1>
<form id="actor-selection" action="index.php" method="post">
    <select name="q" id="q">
        <option value="none" selected="selected">-select-</option>
        <?php
        $alphabet = str_split('abcdefghijklmnopqrstuvwxyz');
        foreach( $alphabet as $letter ) {
        ($letter == $val) ? $selected = ' selected="selected"' : $selected = '';
        echo '<option value="' . $letter . '"' . $selected . '>' . $letter . '</option>';
        }
        ?>
    </select>
<button type="submit" class="btn btn-lg btn-primary">Go!</button>
</form>

<?php
    if ( isset($actors) && !count($actors) )  {
        echo '<p>Nothing found.</p>';
    } else {
?>

<ul class="actors_list">

<?php if ( isset($actors) ) {
            foreach( $actors as $a ) {
                echo "<li data-actor_id='{$a->actor_id}'><a href='actor.php?actor_id={$a->actor_id}'>{$a->first_name} {$a->last_name}</a></li>";
            }
        }
} ?>

<script id="actor_list_template" type="text/x-handlebars-template">
    {{#each this}}
    <li data-actor_id="{{actor_id}}">
        <a href="actor.php?actor_id={{actor_id}}">{{fullName this}}</a>
    </li>
    {{/each}}
</script>

</ul>

<div class="actor_info">
    <script id="actor_info_template" type="text/x-handlebars-template">
        <h3>{{first_name}} {{last_name}}</h3>
        <p>{{film_info}}</p>
        <span class="close">X</span>
    </script>
</div>

<?php include '_partials/footer.php'; ?>