/*!
 * blinkfox/ghost-matery2
 * Copyright (c) blinkfox <chenjiayin1990@163.com>
 * MIT Licensed
 */
/* Setting all articles div width */
function setArtWidth() {
    var width = $("#navContainer").width();
    width += width >= 450 ? 21 : width >= 350 && 450 > width ? 18 : width >= 300 && 350 > width ? 16 : 14,
    $("#articles").width(width)
}

/* Content of the article details some initialization properties */
function articleInit() {
    $('#articleContent img').addClass('materialboxed').addClass('responsive-img');
    $('.materialboxed').materialbox();
    $('.modal-trigger').leanModal();
}

/*!
 * reading-time
 * Copyright (c) Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */
/* ngryman/reading-time
 * https://github.com/ngryman/reading-time
 * Medium's like reading time estimation. http://ngryman.sh
 */
function ansiWordBound(c) {
 return ((' ' === c) || ('\n' === c) || ('\r' === c) || ('\t' === c))
}

function readingTime(text, options) {
    var words = 0, start = 0, end = text.length - 1, wordBound, i

    options = options || {}

    // use default values if necessary
    options.wordsPerMinute = options.wordsPerMinute || 200

    // use provided function if available
    wordBound = options.wordBound || ansiWordBound

    // fetch bounds
    while (wordBound(text[start])) start++
    while (wordBound(text[end])) end--

    // calculate the number of words
    for (i = start; i <= end;) {
        for (; i <= end && !wordBound(text[i]); i++) ;
        words++
        for (; i <= end && wordBound(text[i]); i++) ;
    }

    // reading time stats
    var minutes = words / options.wordsPerMinute
    var time = minutes * 60 * 1000
    var displayed = Math.ceil(minutes.toFixed(2))

    return {
        //text: displayed + ' min read',
        //minutes: minutes,
        //time: time,
        //words: words
        text: '읽기 소요 시간: ' + displayed + '분',
        minutes: minutes,
        time: time,
        words: '('+ words + ' 단어)'
    }
}

function countReadingTime() {
    if (location.pathname === '/') return;
    var countres = readingTime($('.card-content.article-card-content').text());
    $(".post-reading-time").html(countres.text + countres.words);
}

/* GET.SET COOKIES 
 * http://www.w3schools.com/js/js_cookies.asp 
 */
/*
$.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

$.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
*/
$(function() {
    /* Menu change */
    $('.button-collapse').sideNav();
        
    setArtWidth();

    /* Adjust the screen to reset the width of the column width of the article, repair small spacing issue */
    $(window).resize(function() {
        setArtWidth();
    });

    /* Initializes cascade layout */
    $('#articles').masonry({
        itemSelector: '.article'
    });

    /* Some displays feature article content initialization */
    articleInit();

    /* Count reading time for post */
    countReadingTime();

    /* Show and hide the search */
    $('#searchIcon').click(function() {
        $('#search-mask').fadeIn(300);
        $('#searchKey').focus();
        $('#searchIcon').hide();
    });

    $('#search-mask .search-close').click(function() {
        $('#searchIcon').show();
        $('#search-mask').fadeOut(300);
    });

    /* back to the top */
    $('#backTop').click(function() {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /* back to the bottom */
    $('#backBottom').click(function() {
        $('body,html').animate({scrollTop: $(document).height()}, 400);
        return false;
    });

    /* Check Only One Post Saved and There is no prev or next post */
    if(($('.pn-content-left').length === 0) && ($('.pn-content-right').length === 0))
    {
        $('#backTop').addClass('noprenext');
        $('.prenext-card').addClass('noprenext');
    }

    // IE10+
    document.getElementsByTagName( "html" )[0].classList.remove( "loading" );
    // All browsers
    document.getElementsByTagName( "html" )[0].className.replace( /loading/, "" );

    // Or with jQuery
    $( "html" ).removeClass( "loading" );

/*!
 * Typewriter Effect
 * Copyright (c) Geoff Graham
 * Licensed with SUPER IMPORTANT LEGAL DOCUMENT
 * https://css-tricks.com/license/
 * https://css-tricks.com/snippets/css/typewriter-effect/
 */
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

/*!
 * jeromeetienne/jquery-qrcode
 * Copyright (c) Jerome Etienne <jerome.etienne@gmail.com>
 * MIT Licensed
 */
    $('#share-qr').qrcode({
        render : "canvas",
		width : 90,
		height : 90,        
        background : "#2c373e",
        text : $('#share-url').data('url'),
        foreground : "#ffffff"        
    });

    /* Listening position of the scrollbar */
    $(window).scroll(function(event) {
        var t = $(window).scrollTop();
        /* Navigation bar listening position */
        var nav = $('#headNav');

        if (t < 15)  nav.addClass('none-shadow');
        else nav.removeClass('none-shadow');

        /* Back to the top of the button the display position of the slider and hidden */
        var ts = $('.top-scroll');
        if (t < 100) {
            ts.slideUp(300);
        } else {
            ts.slideDown(300);
        }        
    });
});

/*!
 * aholmes/Casper(Part of source)
 * Copyright (c) Aaron Holmes <aaron@aaronholmes.net>
 * MIT Licensed
 * http://blog.aaronholmes.net/displaying-code-with-ace-on-ghost/
 */
/* For Codehighlight fuction */
$('pre code').each(function (i, el)
{
    var newEl = document.createElement('CODE');
    newEl.className = el.className + (el.className ? ' ' : '') + 'ace-editor';
    newEl.innerHTML = el.innerHTML;
    // the three-backticks syntax for code blocks in markdown allows you to specify the language name, which Ghost gets set as a class on the code element.
    newEl.setAttribute('data-language', (el.className.match(/language-([^ ]+)/) || [, 'c_cpp'])[1]);

    var editor = ace.edit(newEl);

    editor.setOptions(
    {
      minLines: 1, //1
      maxLines: 400 //20
    });
    editor.setTheme("ace/theme/chrome");
    editor.find('needle',{
        backwards: false,
        wrap: false,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
    });
    editor.findNext();
    editor.findPrevious();
    editor.setShowPrintMargin(false); 
    // el.dataset only works in IE11. :(
    // c_cpp is a safe bet for most languages I work with.
    editor.session.setMode('ace/mode/'+newEl.getAttribute('data-language'));
    // Who needs <pre> when you have Ace? Replace the pre element with the newEl <code> element.
    $(el.parentElement).replaceWith(editor.container);
});


/*!
 * Ghost-Theme-Examples
 * Copyright (c) David Balderston
 * MIT Licensed
 * https://www.ghostforbeginners.com/add-search-to-ghost-using-twitter-typeahead-js/
 */
/*!
 * twitter/typeahead.js
 * Copyright (c) Twitter, Inc.
 * MIT Licensed
 */
/* For Post Searching function */
//Wait for other things to be loaded so the site doesn't wait on the search
$(document).ready(function() {
    //Go grab all the posts on the blog, but only the slug and title fields
    //That helps limit the amount of data sent and stored locally
    $.get(ghost.url.api('posts', {
        limit: "all", 
        fields: 'url,title',
    })).done(function(data) {
        //add all the data returned to a variable
        var searchData = data.posts;
        //New bloodhound to make it searchable
        var search = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: searchData
        });
        //Build the typeahead
        $('#site-search .typeahead').typeahead(null, {
              name: 'search',
              //source is the bloodhound variable
              source: search,
              templates: {
                empty: [
                    '<div class="search-empty-message">',
                    '검색어에 대한 포스팅이 없습니다.',
                    '</div>'
                ].join('\n'),
                suggestion: function(data) {
                    return '<p><strong><a id="suggestion-link" href="' + data.url+ '">' + data.title + '</a></strong></p>';
                }
            }
        });
        //Now show the search bar since getting data was successful
        $('#site-search').show();

    }).fail(function() {
        //If the get request errors out, put an error in the console
        console.log("Error getting Ghost API Data");
    });
});