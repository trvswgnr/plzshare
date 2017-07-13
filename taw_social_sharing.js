var taw_social_sharing = (function ($) {
  "use strict";

  function init(settings) {

    // default settings
    var options = $.extend({
        shares: ['facebook', 'twitter', 'linkedin', 'pinterest'],
        url: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname,
        image: (function () {
          var image = $('meta[property="og:image"]').attr("content");
          image = typeof image !== "undefined" ? image : '';
          return image;
        }()),
        counters: true,
        margin: 0,
        namespace: 'social-sharing',
        rounded: false
      }, settings),

      // set the namespace for all css classes
      namespace = options.namespace,
      window_args = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600",
      count_span,

      // define social media platforms
      socials = [
        {
          name: "facebook",
          link: "https://www.facebook.com/sharer/sharer.php?u=" + options.url,
          shares: (function () {
            var token = "666987483466439|b3e1a0948513223b0bc51b32a735e2cf";
            $.ajax({
              url: "https://graph.facebook.com/v2.7/",
              dataType: "jsonp",
              type: "GET",
              data: {
                access_token: token,
                id: options.url
              },
              success: function (data) {
                if (data.share.share_count > 0 && options.counters) {
                  count_span = data.share.share_count;
                } else {
                  count_span = 'Share';
                }
                $("." + namespace + "__item-wrapper--facebook").append('<span class="' + namespace + '__count">' + count_span + "</span>");
              }
            });
          }())
        },
        {
          name: "twitter",
          link: "https://twitter.com/intent/tweet?url=" + options.url,
          shares: (function () {
            $.getJSON(
              "https://public.newsharecounts.com/count.json?url=" + options.url,
              function (data) {
                var items = [];
                $.each(data, function (key, val) {
                  items.push(val);
                });
                if (items[1] > 0) {
                  count_span = items[1];
                } else {
                  count_span = 'Share';
                }
                $("." + namespace + "__item-wrapper--twitter").append('<span class="' + namespace + '__count">' + count_span + "</span>");
              }
            );
          }())
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/shareArticle?mini=true&url=" + options.url,
          shares: (function () {
            $.ajax({
              url: "https://www.linkedin.com/countserv/count/share?url=" + options.url,
              type: "GET",
              contentType: "application/json",
              dataType: "jsonp",
              success: function (data) {
                if (data.count > 0) {
                  count_span = data.count;
                } else {
                  count_span = 'Share';
                }
                $('.' + namespace + '__item-wrapper--linkedin').append('<span class="' + namespace + '__count">' + count_span + "</span>");
              }
            });
          }())
        },
        {
          name: "pinterest",
          link: "https://www.pinterest.com/pin/create/button/?media=" + options.image + "&url=" + options.url,
          shares: (function () {
            $.ajax({
              url: "https://api.pinterest.com/v1/urls/count.json?url=" + options.url,
              type: "GET",
              contentType: "application/json",
              dataType: "jsonp",
              success: function (data) {
                if (data.count > 0) {
                  count_span = data.count;
                } else {
                  count_span = 'Share';
                }
                $('.' + namespace + '__item-wrapper--pinterest').append('<span class="' + namespace + '__count">' + count_span + "</span>");
              }
            });
          }())
        }
      ],
      i,

      // click event for opening a new window
      popup = function (i) {
        $("." + namespace + '__item-wrapper--' + socials[i].name).on("click", function () {
          window.open(socials[i].link, "", window_args);
        });
      },

      //full width if counters setting is false
      min_width = options.counters ? '50px' : '100%',
      rounded = options.rounded ? 'border-radius: 5px;' : '',
      facebook_on = $.inArray("facebook", options.shares) !== -1 ? '' : 'display:none;',
      twitter_on = $.inArray("twitter", options.shares) !== -1 ? '' : 'display:none;',
      linkedin_on = $.inArray("linkedin", options.shares) !== -1 ? '' : 'display:none;',
      pinterest_on = $.inArray("pinterest", options.shares) !== -1 ? '' : 'display:none;',
      font_awesome = $('link[href*="font-awesome"]').length ? '' : '<link rel="stylesheet prefetch" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';

    // add stylesheet to <head>
    $('head').append(font_awesome + '<style>.' + namespace + '{font-family:Helvetica Neue,sans-serif;margin-left:-8px;margin-right:-8px}.' + namespace + '__wrapper{overflow:hidden;width:100%;margin:' + options.margin + 'px auto;}.' + namespace + '__inner{width:100%;display:table;table-layout:fixed;height:48px;border-spacing:8px 0}.' + namespace + '__item-wrapper{overflow:hidden;' + rounded + 'position:relative;display:table-cell}.' + namespace + '__item-wrapper--facebook{' + facebook_on + 'background:#3b5998}.' + namespace + '__item-wrapper--facebook .' + namespace + '__item{background:#30497c}.' + namespace + '__item-wrapper--twitter{' + twitter_on + 'background:#1da1f2}.' + namespace + '__item-wrapper--twitter .' + namespace + '__item{background:#0d8ddc}.' + namespace + '__item-wrapper--linkedin{' + linkedin_on + 'background:#0077b5}.' + namespace + '__item-wrapper--linkedin .' + namespace + '__item{background:#005e8f}.' + namespace + '__item-wrapper--pinterest{' + pinterest_on + 'background:#bd081c}.' + namespace + '__item-wrapper--pinterest .' + namespace + '__item{background:#980617}.' + namespace + '__item-wrapper:hover .' + namespace + '__item{min-width:100%;-webkit-transition:.2s;transition:.2s}.' + namespace + '__item{color:#fff;font-size:24px;min-width:' + min_width + ';text-align:center;height:48px;line-height:48px;display:inline-block;background:rgba(0,0,0,.15);-webkit-transition:.2s;transition:.2s;position:absolute}.' + namespace + '__count{color:#fff;font-size:19px;text-decoration:none;float:right;padding:0 16px;line-height:48px}@media (max-width:580px){.' + namespace + '__item{width:100%}.' + namespace + '__count{display:none}}</style>');

    // replace .social-sharing
    $('.' + namespace).replaceWith('<div class="' + namespace + '__wrapper"> <div class="' + namespace + '"> <div class="' + namespace + '__inner"><a class="' + namespace + '__item-wrapper ' + namespace + '__item-wrapper--facebook" href="#"> <div class="' + namespace + '__item"> <div class="fa fa-facebook"></div></div></a><a class="' + namespace + '__item-wrapper ' + namespace + '__item-wrapper--twitter" href="#"> <div class="' + namespace + '__item"> <div class="fa fa-twitter"></div></div></a><a class="' + namespace + '__item-wrapper ' + namespace + '__item-wrapper--linkedin" href="#"> <div class="' + namespace + '__item"> <div class="fa fa-linkedin"></div></div></a><a class="' + namespace + '__item-wrapper ' + namespace + '__item-wrapper--pinterest" href="#"> <div class="' + namespace + '__item"> <div class="fa fa-pinterest"></div></div></a></div></div></div>');

    // create click events for all defined social media platforms
    for (i = 0; i < socials.length; i += 1) {
      popup(i);
    }
  }

  // return init function
  return {
    init: init
  };

}(jQuery));
