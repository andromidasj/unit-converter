# Unit Converter
I wrote this simple conversion app from scratch in the first couple weeks of my software engineering immersive program. It is written using Javascript, jQuery, HTML, and CSS.

## Current Problems That Need Fixing:

- [ ] Rounding errors since it’s converting twice, sometimes across metric and imperial.
- [ ] Temperature conversion not working - new calculation needed since `0ºF` does not equal `0ºC`.

## Ideas:

- Make a switch button in between the two form fields that'll switch the two sides.
- Make the data come from a custom external database
	- Put all conversion formulas there (can be more verbose, potentially fixing Rounding Error problem)
	- Use an API to access the database of units and conversions
	- Allow for custom units and conversions (i.e. a PUT option that lets you add any conversion name and formula — ( 1 Josh = 71 inches tall )
  - Maybe give this a GUI? Would this just be part of the same web app itself - it'll only be different under the hood?
