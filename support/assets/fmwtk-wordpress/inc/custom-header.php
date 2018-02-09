<?php
/**
 * Custom header implementation
 *
 * @link http://codex.wordpress.org/Custom_Headers
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 */

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses fmwtk-wordpress_header_style()
 */
function fmwtk-wordpress_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'fmwtk-wordpress_custom_header_args', array(
		'default-image'      => get_parent_theme_file_uri( '/assets/images/header.jpg' ),
		'default-text-color' => 'ffffff',
		'width'              => 2000,
		'height'             => 1200,
		'flex-height'        => true,
		'wp-head-callback'   => 'fmwtk-wordpress_header_style',
	) ) );

	register_default_headers( array(
		'default-image' => array(
			'url'           => '%s/assets/images/header.jpg',
			'thumbnail_url' => '%s/assets/images/header.jpg',
			'description'   => __( 'Default Header Image', 'fmwtk-wordpress' ),
		),
	) );
}
add_action( 'after_setup_theme', 'fmwtk-wordpress_custom_header_setup' );

if ( ! function_exists( 'fmwtk-wordpress_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog.
 *
 * @see fmwtk-wordpress_custom_header_setup().
 */
function fmwtk-wordpress_header_style() {
	$header_text_color = get_header_textcolor();

	// If no custom options for text are set, let's bail.
	// get_header_textcolor() options: add_theme_support( 'custom-header' ) is default, hide text (returns 'blank') or any hex value.
	if ( get_theme_support( 'custom-header', 'default-text-color' ) === $header_text_color ) {
		return;
	}

	// If we get this far, we have custom styles. Let's do this.
	?>
	<style type="text/css">
	<?php
		// Has the text been hidden?
		if ( 'blank' === $header_text_color ) :
	?>
		.site-title,
		.site-description {
			position: absolute;
			clip: rect(1px, 1px, 1px, 1px);
		}
	<?php
		// If the user has set a custom color for the text use that.
		else :
	?>
		.site-title a,
		.fmwtk-wordpress-front-page:not(.no-header-image) .site-title,
		.fmwtk-wordpress-front-page:not(.no-header-image) .site-title a,
		.site-description,
		.fmwtk-wordpress-front-page:not(.no-header-image) .site-description {
			color: #<?php echo esc_attr( $header_text_color ); ?>;
		}
	<?php endif; ?>
	</style>
	<?php
}
endif; // End of fmwtk-wordpress_header_style.
