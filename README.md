# partials.js
Support partial views in plain HTML with just one line of code

## How to use
### Import the partials.js file
#### Direct download
Download the [partials.js](https://github.com/staa99/partials.js/releases/download/v1.0.0/partials.js) or [partials.min.js](https://github.com/staa99/partials.js/releases/download/v1.0.0/partials.min.js) partials.js.min (the minified version) from github directly for the current version (v1.0.0).

#### CDN
Add the following script tag to your HTML code for the current version (v1.0.0).

```html
<script src="https://cdn.jsdelivr.net/gh/staa99/partials.js@1.0.0/partials.min.js"
        integrity="sha512-+TluO33Ol2y/d5CnHHCS9gb6FAilwm1uxLFKZs35B0OAftAPMJpBUtxrIMwPfsRrN7A+pg0HR6R5fashqVuT+A=="
        crossorigin="anonymous"></script>
```

### Add your partial views
Simply add a `<div data-partials="path/to/partial/view"></div>` wherever you want to load the view at `'path/to/partial/view'` as a partial view.
