$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    if (h > 700) {
        $( "#mysidebar" ).attr("class", "nav affix");
    }
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('main h2:not(.no-anchor),main h3:not(.no-anchor),main h4:not(.no-anchor),main h5:not(.no-anchor)');

    // Add copy buttons and wrappers to all code blocks inside main content
    $('main pre, main div.highlight, main figure.highlight, main .highlighter-rouge').each(function () {
        var $block = $(this);

        // Avoid wrapping twice
        if ($block.closest('.code-container').length) {
            return;
        }

        var $container = $('<div class="code-container"></div>');
        var $button = $('<button type="button" class="copy-btn" aria-label="Copy code"><i class="fa-regular fa-copy" aria-hidden="true"></i></button>');

        $block.before($container);
        $container.append($button);
        $container.append($block);

        $button.on('click', function () {
            var codeElement = $container.find('code').get(0) || $block.get(0);
            if (!codeElement) {
                return;
            }
            var text = codeElement.innerText || codeElement.textContent || '';
            copyToClipboard(text, $button);
        });
    });

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});

function copyToClipboard(text, $button) {
    if (!text) {
        return;
    }

    function indicateCopied() {
        if (!$button) {
            return;
        }
        $button.addClass('copy-btn--copied');
        setTimeout(function () {
            $button.removeClass('copy-btn--copied');
        }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(function () {
                indicateCopied();
            })
            .catch(function (err) {
                console.error("Copy failed", err);
            });
    } else {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
            indicateCopied();
        } catch (err) {
            console.error("Copy failed", err);
        }
        document.body.removeChild(textArea);
    }
}

function copyText() {
    var introElement = document.getElementById("intro-text");
    if (!introElement) {
        return;
    }
    var text = introElement.innerText || introElement.textContent;
    copyToClipboard(text);
}
