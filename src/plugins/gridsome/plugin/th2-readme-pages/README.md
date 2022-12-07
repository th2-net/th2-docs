# Readme pages plugin

This plugin adds content from a markdown file specified in the `readme` property of the `DocPage` node.

Technically, this creates a new `ReadmePage` collection, which overrides the existing `DocPage` document. All resulting pages are stored in `content/.cache`. 