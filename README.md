# TAW Social Sharing - Easy, clean social sharing buttons with optional share counters.

**TAW Social Sharing** is a simple, clean, and easy-to-use social sharing jQuery plugin.

## Demo

[View Demo](https://codepen.io/trvswgnr/live/2a60000f245e63df73d3b4d0391bfb14)

## Getting Started

1. Download the minified js file (taw_social_sharing.min.js) OR download the package or install it with npm:
    
    ```bash
    $ npm install taw-social-sharing
    ```
    
2. Add link to `font-awesome.css` (used for social media logos)
    ```html
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    ```
3. Add link to `jquery.js` and plugin js file `taw_social_sharing.js`
    ```html
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="taw_social_sharing.min.js"></script>
    ```
4. Initialize plugin with options:
    
    ```html
    <script type="text/javascript">
      jQuery(function($){
        social_share.init({
          counters: true,
          margin: 0,
          namespace: 'social-sharing'
        });
      });
    </script>
    ```
5. Add element with the namespace class. Default is 'social-sharing'.
    ```html
    <div class="social-sharing"></div>
    ```

### Preview
![TAW Social Sharing Preview](https://raw.githubusercontent.com/trvswgnr/taw-social-sharing/master/preview.png "TAW Social Sharing Preview")

### Options

**TAW Social Sharing** includes a few options to customize the look and behavior of the plugin.

An example of some alternative init options:
 
```javascript
{
  shares: ["facebook", "twitter", "pinterest"],
  url: "http://google.com",
  image: 'http://lorempixel.com/200/200',
  counters: false,
  margin: 10,
  namespace: 'share-btns',
  rounded: true
}
```

#### shares :`Array`

An array of shares. Default is `['facebook', 'twitter', 'linkedin', 'pinterest']`


#### url :`String`

A custom url to share. The current page's url is used by default.


#### image :`String`

A custom image for Pinterest. Default looks for an Open Graph meta tag: `<meta property="og:image" content="http://someurl.com/theimage.jpg">`.


#### counters :`true|false`

A boolean specifying whether or not to show the counter. Defaults to `true`.

#### margin : Number

Specifies a margin in pixels above and below the element.

#### namespace : `String`

Creates a custom namespace. Default is `social-sharing`. Useful if there are conflicts with existing stylesheets.

#### rounded : `true|false`

A boolean specifying whether or not to round the corners. Defaults to `false`.

## License

MIT © Travis A. Wagner
