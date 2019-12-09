[![](https://data.jsdelivr.com/v1/package/gh/staa99/partials.js/badge)](https://www.jsdelivr.com/package/gh/staa99/partials.js)

# partials.js
Support partial views in plain HTML with just one line of code

## How to use
### Import the partials.js file
#### Direct download
Download the [partials.js](https://github.com/staa99/partials.js/releases/download/v2.0.0/partials.js) or [partials.min.js](https://github.com/staa99/partials.js/releases/download/v2.0.0/partials.min.js) partials.js.min (the minified version) from github directly for the current version (v2.0.0).

#### CDN
Add the following script tag to your HTML code for the current version (v2.0.0).

```html
<script src="https://cdn.jsdelivr.net/gh/staa99/partials.js@2.0.0/partials.min.js"
        integrity="sha512-Hw8gbpqUwd1kdPaYb6GzSrvlRt7q1QiC8G1I/e+tLQPmRtejZIk3TYdzIyzDW2FZ8/eGIWpoM7r9d1p2bSZqig=="
        crossorigin="anonymous"></script>
```

### Add your partial views
Simply add a 
```html
<partial href="path/to/partial/view"></partial>
<!-- Note the explicit closing tag. It is required for the partial element to work as expected. -->
```
or
```html
<div data-partials="path/to/partial/view"></div>
```
wherever you want to load the view at `'path/to/partial/view'` as a partial view. You can use whichever you prefer.


## FAQs

### Does it support `<partial>` elements?
Yes, `partials.js` supports `<partial>` elements since v2.0.0.

### Can `<div data-partial>` and `<partial>` tags be mixed?
Yes, if you used the previous versions. You don't need to rewrite all your `<div data-partial>` tags to upgrade to version 2.

### Does v2.0.0 support request caching for multiple partials to the same view on the same page?
No, at this time, there's no support for request caching.

### Does v1.0.0 support nested partials?
No, to use nested partials you must upgrade to 1.1.1+. I recommend the latest, v2.0.0. Kindly note that relative paths in 2.0.0+ will always be relative to the location of the partial view, which was not the case in previous versions.
