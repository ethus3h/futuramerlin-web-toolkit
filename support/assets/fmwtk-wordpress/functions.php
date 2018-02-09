<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'fmwtkwordpress-inherit-style', get_template_directory_uri() . '/fmwtkwordpress-inherit-style.css' );
    wp_enqueue_style( 'fmwtkwordpress', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function remove_admin_login_header() {
    remove_action('wp_head', '_admin_bar_bump_cb');
}
add_action('get_header', 'remove_admin_login_header');

function register_my_menu() {
  register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'register_my_menu' );
