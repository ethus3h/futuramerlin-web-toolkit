<?php
function my_theme_enqueue_styles() {
    $parent_style = 'twentyseventeen-style';

    wp_enqueue_style( 'm', '/../../../m.css' );
    wp_enqueue_style( 'child-style', '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function remove_admin_login_header() {
    remove_action('wp_head', '_admin_bar_bump_cb');
}
add_action('get_header', 'remove_admin_login_header');
