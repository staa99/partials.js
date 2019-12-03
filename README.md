# partials.js
Support partial views in plain HTML with just one line of code

## How to use
### Import the partials.js file
#### Direct download
Download the [partials.js](https://github.com/staa99/partials.js/releases/download/v1.1.1/partials.js) or [partials.min.js](https://github.com/staa99/partials.js/releases/download/v1.1.1/partials.min.js) partials.js.min (the minified version) from github directly for the current version (v1.1.1).

#### CDN
Add the following script tag to your HTML code for the current version (v1.1.1).

```html
<script src="https://cdn.jsdelivr.net/gh/staa99/partials.js@1.1.1/partials.min.js"
        integrity="sha512-xZNo6GsUWWT6MEeHXv7jzPKSikGHq27ihKSwfJ4OPUDmhR505cid89BMJMAyU91864IoVPtO7vo4DNPONdGGpQ=="
        crossorigin="anonymous"></script>
```

### Add your partial views
Simply add a `<div data-partials="path/to/partial/view"></div>` wherever you want to load the view at `'path/to/partial/view'` as a partial view.


## FAQs

### Are there plans to support custom `<partial` elements?
Yes, there are currently plans to support custom `partial` elements.

### Does v1.1.1 support request caching for multiple partials to the same view on the same page?
No, at this time, there's no support for request caching.

### Does v1.0.0 support nested partials?
No, to use nested partials you must upgrade to 1.1.1. All existing code will work as before, except that nested partials are now resolved.
