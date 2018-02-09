<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>
			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();
				get_template_part( 'components/post/content', get_post_format() );

				the_post_navigation( array(
					'prev_text' => '<span class="screen-reader-text">' . __( 'Previous Post', 'fmwtk-wordpress' ) . '</span><span aria-hidden="true" class="nav-subtitle">' . __( 'Previous', 'fmwtk-wordpress' ) . '</span> <span class="nav-title"><span class="nav-title-icon-wrapper">' . fmwtk-wordpress_get_svg( array( 'icon' => 'arrow-left' ) ) . '</span>%title</span>',
					'next_text' => '<span class="screen-reader-text">' . __( 'Next Post', 'fmwtk-wordpress' ) . '</span><span aria-hidden="true" class="nav-subtitle">' . __( 'Next', 'fmwtk-wordpress' ) . '</span> <span class="nav-title">%title<span class="nav-title-icon-wrapper">' . fmwtk-wordpress_get_svg( array( 'icon' => 'arrow-right' ) ) . '</span></span>',
				) );

			endwhile; // End of the loop.
			?>


<?php get_footer();
