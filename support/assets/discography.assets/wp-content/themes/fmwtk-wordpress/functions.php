<?php
function my_theme_enqueue_styles() {
    $parent_style = 'twentyseventeen-style';

    wp_enqueue_style( 'm', '/../../../m.css' );
    wp_enqueue_style( 'child-style', '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
?>
