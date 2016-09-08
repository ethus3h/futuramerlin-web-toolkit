<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package fm-wp-theme
 */
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link href="/m.css" rel="stylesheet" type="text/css">
    <meta content="Ember" name="author">
    <meta content="width=device-width, height=device-height, user-scalable=yes" name="viewport">
    <title><?php if(is_front_page()) { echo "Ember Blog"; } else { wp_title( '—', true, 'right' ); } ?></title>
</head>
<body>
	<input class="nav-trigger" id="nav-trigger" type="checkbox">
	<label for="nav-trigger">&nbsp;</label>
	<nav>
		<p class="logo">
			<a class="nodecorate logolink" href=
			"/">ember</a>
		</p>
		<ul>
            <li>Navigation:</li>
            <li class="nav-item nav-item-inactive index">
				<a href="/">Home</a>
			</li>
			<li class="nav-item nav-item-selected news">
				<a href="/news">News</a>
			</li>
            <li class="nav-item nav-item-inactive ready-to-use">
				<a href="/ancillary/ready-to-use.htm">Software</a>
			</li>
			<li class="nav-item nav-item-inactive specification">
				<a href="/components.htm">Core project</a>
			</li>
			<li class="nav-item nav-item-inactive ember">
				<a href="/people">People</a>
			</li>
		</ul>
		<a href="#">&#x1F51D;&#xFE0E;</a>
	</nav>
	<main>
