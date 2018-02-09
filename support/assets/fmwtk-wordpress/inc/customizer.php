<?php
/**
 * Twenty Seventeen: Theme Customizer
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function fmwtkwordpress_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	/**
	 * Custom colors.
	 */
	$wp_customize->add_setting( 'colorscheme', array(
		'default'           => 'light',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'fmwtkwordpress_sanitize_colorscheme',
	) );

	$wp_customize->add_setting( 'colorscheme_hue', array(
		'default'           => 250,
		'transport'         => 'postMessage',
		'sanitize_callback' => 'absint', // The hue is stored as a positive integer.
	) );

	$wp_customize->add_control( 'colorscheme', array(
		'type'    => 'radio',
		'label'    => __( 'Color Scheme', 'fmwtkwordpress' ),
		'choices'  => array(
			'light'  => __( 'Light', 'fmwtkwordpress' ),
			'dark'   => __( 'Dark', 'fmwtkwordpress' ),
			'custom' => __( 'Custom', 'fmwtkwordpress' ),
		),
		'section'  => 'colors',
		'priority' => 5,
	) );

	$wp_customize->add_control( 'colorscheme_hue', array(
		'type'    => 'range',
		'input_attrs' => array(
			'min' => 0,
			'max' => 359,
			'step' => 1,
		),
		'section'  => 'colors',
		'priority' => 6,
		'description' => 'Temporary hue slider will be replaced with a visual hue picker that is only shown when a custom scheme is selected', // temporary, intentionally untranslated.
		// @todo change this to a visual hue picker control, ideally extending the color control and leveraging iris by adding a `hue` mode in core.
		// See https://core.trac.wordpress.org/ticket/38263
		// @todo only show this control when the colorscheme is custom.
	) );

	/**
	 * Add the Theme Options section.
	 */
	$wp_customize->add_panel( 'options_panel', array(
		'title'       => __( 'Theme Options', 'fmwtkwordpress' ),
		'description' => __( 'Configure your theme settings', 'fmwtkwordpress' ),
	) );

	// Page Options.
	$wp_customize->add_section( 'page_options', array(
		'title'           => __( 'Single Page Layout', 'fmwtkwordpress' ),
		'active_callback' => 'fmwtkwordpress_is_page',
		'panel'           => 'options_panel',
	) );

	$wp_customize->add_setting( 'page_options', array(
		'default'           => 'two-column',
		'sanitize_callback' => 'fmwtkwordpress_sanitize_layout',
		'transport'         => 'postMessage',
	) );

	$wp_customize->add_control( 'page_options', array(
		'label'       => __( 'Page Layout', 'fmwtkwordpress' ),
		'section'     => 'page_options',
		'type'        => 'radio',
		'description' => __( 'When no sidebar widgets are assigned, you can opt to display all pages with a one column or two column layout. When the two column layout is assigned, the page title is in one column and content is in the other.', 'fmwtkwordpress' ),
		'choices'     => array(
			'one-column' => __( 'One Column', 'fmwtkwordpress' ),
			'two-column' => __( 'Two Column', 'fmwtkwordpress' ),
		),
	) );

	// Panel 1.
	$wp_customize->add_section( 'panel_1', array(
		'title'           => __( 'Panel 1', 'fmwtkwordpress' ),
		'active_callback' => 'is_front_page',
		'panel'           => 'options_panel',
		'description'     => __( 'Add an image to your panel by setting a featured image in the page editor. If you don&rsquo;t select a page, this panel will not be displayed.', 'fmwtkwordpress' ),
	) );

	$wp_customize->add_setting( 'panel_1', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	$wp_customize->add_control( 'panel_1', array(
		'label'   => __( 'Panel Content', 'fmwtkwordpress' ),
		'section' => 'panel_1',
		'type'    => 'dropdown-pages',
	) );

	// Panel 2.
	$wp_customize->add_section( 'panel_2', array(
		'title'           => __( 'Panel 2', 'fmwtkwordpress' ),
		'active_callback' => 'is_front_page',
		'panel'           => 'options_panel',
		'description'     => __( 'Add an image to your panel by setting a featured image in the page editor. If you don&rsquo;t select a page, this panel will not be displayed.', 'fmwtkwordpress' ),
	) );

	$wp_customize->add_setting( 'panel_2', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	$wp_customize->add_control( 'panel_2', array(
		'label'   => __( 'Panel Content', 'fmwtkwordpress' ),
		'section' => 'panel_2',
		'type'    => 'dropdown-pages',
	) );

	// Panel 3.
	$wp_customize->add_section( 'panel_3', array(
		'title'           => __( 'Panel 3', 'fmwtkwordpress' ),
		'active_callback' => 'is_front_page',
		'panel'           => 'options_panel',
		'description'     => __( 'Add an image to your panel by setting a featured image in the page editor. If you don&rsquo;t select a page, this panel will not be displayed.', 'fmwtkwordpress' ),
	) );

	$wp_customize->add_setting( 'panel_3', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	$wp_customize->add_control( 'panel_3', array(
		'label'   => __( 'Panel Content', 'fmwtkwordpress' ),
		'section' => 'panel_3',
		'type'    => 'dropdown-pages',
	) );

	// Panel 4.
	$wp_customize->add_section( 'panel_4', array(
		'title'           => __( 'Panel 4', 'fmwtkwordpress' ),
		'active_callback' => 'is_front_page',
		'panel'           => 'options_panel',
		'description'     => __( 'Add an image to your panel by setting a featured image in the page editor. If you don&rsquo;t select a page, this panel will not be displayed.', 'fmwtkwordpress' ),
	) );

	$wp_customize->add_setting( 'panel_4', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	$wp_customize->add_control( 'panel_4', array(
		'label'   => __( 'Panel Content', 'fmwtkwordpress' ),
		'section' => 'panel_4',
		'type'    => 'dropdown-pages',
	) );
}
add_action( 'customize_register', 'fmwtkwordpress_customize_register' );

/**
 * Sanitize a radio button.
 */
function fmwtkwordpress_sanitize_layout( $input ) {
	$valid = array(
		'one-column' => __( 'One Column', 'fmwtkwordpress' ),
		'two-column' => __( 'Two Column', 'fmwtkwordpress' ),
	);

	if ( array_key_exists( $input, $valid ) ) {
		return $input;
	}

	return '';
}

/**
 * Sanitize the colorscheme.
 */
function fmwtkwordpress_sanitize_colorscheme( $input ) {
	$valid = array( 'light', 'dark', 'custom' );

	if ( in_array( $input, $valid ) ) {
		return $input;
	}

	return 'light';
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function fmwtkwordpress_customize_preview_js() {
	wp_enqueue_script( 'fmwtkwordpress-customizer', get_theme_file_uri( '/assets/js/customizer.js' ), array( 'customize-preview' ), '1.0', true );
}
add_action( 'customize_preview_init', 'fmwtkwordpress_customize_preview_js' );

/**
 * Some extra JavaScript to improve the user experience in the Customizer for this theme.
 */
function fmwtkwordpress_panels_js() {
	wp_enqueue_script( 'fmwtkwordpress-panel-customizer', get_theme_file_uri( '/assets/js/panel-customizer.js' ), array(), '1.0', true );
}
add_action( 'customize_controls_enqueue_scripts', 'fmwtkwordpress_panels_js' );
