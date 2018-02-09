<?php
/**
 * Displays top navigation
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>
<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php _e( 'Top Menu', 'fmwtkwordpress' ); ?>">
	<button class="menu-toggle" aria-controls="top-menu" aria-expanded="false"><?php echo fmwtkwordpress_get_svg( array( 'icon' => 'bars' ) ); echo fmwtkwordpress_get_svg( array( 'icon' => 'close' ) ); _e( 'Menu', 'fmwtkwordpress' ); ?></button>
	<?php wp_nav_menu( array(
		'theme_location' => 'top',
		'menu_id'        => 'top-menu',
	) ); ?>

	<?php if ( fmwtkwordpress_is_frontpage() || ( is_home() && is_front_page() ) ) : ?>
		<a href="#content" class="menu-scroll-down"><?php echo fmwtkwordpress_get_svg( array( 'icon' => 'next' ) ); ?><span class="screen-reader-text"><?php _e( 'Scroll Down', 'fmwtkwordpress' ); ?></span></a>
	<?php endif; ?>
</nav><!-- #site-navigation -->
