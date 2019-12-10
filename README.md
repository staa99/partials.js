[![](https://data.jsdelivr.com/v1/package/gh/staa99/partials.js/badge)](https://www.jsdelivr.com/package/gh/staa99/partials.js)

# partials.js
Support partial views in plain HTML with just one line of code

## How to use
### Import the partials.js file
#### Direct download
Download the [partials.js](https://github.com/staa99/partials.js/releases/download/v3.0.0/partials.js) or [partials.min.js](https://github.com/staa99/partials.js/releases/download/v3.0.0/partials.min.js) partials.js.min (the minified version) from github directly for the current version (v3.0.0).

#### CDN
Add the following script tag to your HTML code for the current version (v3.0.0).

```html
<script src="https://cdn.jsdelivr.net/gh/staa99/partials.js@3.0.0/partials.min.js"
        integrity="sha512-LaOeBdWQUe/9ZjUDbuwXqx34mvjpkO+z7XnHMzVVnd88vhPXZWM8zsp5tVaGPxBVBHVa1do2BahVa7IBippvow=="
        crossorigin="anonymous"></script>
```

### Add your partial views
Simply add a 
```html
<partial href="path/to/partial/view"></partial>
```
or
```html
<div data-partials="path/to/partial/view"></div>
```
wherever you want to load the view at `'path/to/partial/view'` as a partial view. You can use whichever you prefer.
Note that both `<div>` and `<partial>` require closing tags.

## FAQs

### Does it support `<partial>` elements?
Yes, `partials.js` supports `<partial>` elements since v2.0.0.

### Can `<div data-partial>` and `<partial>` tags be mixed?
Yes, if you used the previous versions. You don't need to rewrite all your `<div data-partial>` tags to upgrade to version 2.

### Does v3.0.0 support request caching for multiple partials to the same view on the same page?
No, at this time, there's no support for request caching.

### Does v1.0.0 support nested partials?
No, to use nested partials you must upgrade to 1.1.1+. I recommend the latest, v3.0.0. Kindly note that relative paths in 2.0.0+ will always be relative to the location of the partial view, which was not the case in previous versions.

### How do you know the page is fully loaded?
Just listen for the window event `'partials:loaded'` the standard way.
The following example removes a `page-loader` when the page is loaded.
```javascript
window.addEventListener("partials:loaded", function()
{
    var loader = document.querySelector(".page-loader");
    loader.parentNode.removeChild(loader);
});
```