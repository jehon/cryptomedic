# Structure of the application

In the main app folder, we will find files orchestrating the whole applications. But most of it should be in /js folder.

## csj2esm

Inlude elements copied from node_modules, but transformed into a esm module (see Makefile build)

## js

All function logic that is not linked to an element (or the logic of an element).
This should be emptied to the max to be linked to element's behaviors.

## elements

This folder contains all html elements used to render the pages and stuff.

### elements > abstracts

Elements not mean to be rendered as it. It should be inherited to have it work.
These should be mixin, but jsdoc does not understand it (or do I?).

### elements > widgets

Widgets are the real build pieces of the applications. They add:

- styling
- unitar behavior
- unit of data
- ...

Wigets also have sub-categories:

- x-ff: they expect to have a 'folder'
- x-fff: they expect to have a 'folder' and a 'file'

### elements > pages

Pages organize widgets into unit of logic. They should not have any styling. They should coordinate the various widgets into more complex logic.

# Legacy

## controllers

Linked to angular 1.3

## models

Unit of logic. But what to do with this?
