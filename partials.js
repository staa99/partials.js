(function()
{
    function detectPartials()
    {
        // use a partial tag
        var partials = document.querySelectorAll("div[data-partial]");

        // process the partials
        for (var i in partials)
        {
            if (partials.hasOwnProperty(i))
            {
                var partial = partials[i];
                processPartial(partial);
            }
        }
    }

    function processPartial(partial)
    {
        // get the links
        var link = partial.getAttribute("data-partial");
        if (link === null)
        {
            console.log("Skipping this partial because there's no link: " + partial);
            return;
        }

        loadUrl(link,
            function()
            {
                loadUrlCallback(partial, this.response);
            });
    }

    function loadUrlCallback(partial, response)
    {
        var children = response.body.children;
        // first add the children
        var i;
        for (i in children)
        {
            if (children.hasOwnProperty(i))
            {
                var child = children[i];
                partial.parentNode.insertBefore(child, partial);
            }
        }

        // then add the scripts/links
        var headChildren = response.head.children;

        function moveToNextOrStop(pos) {
            if (++pos < headChildren.length) {
                loadScripts(pos);
                return pos;
            }
            else {
                partial.parentNode.removeChild(partial);
                return headChildren.length;
            }
        }

        function loadScripts(pos)
        {
            if (headChildren.hasOwnProperty(pos))
            {
                var child = headChildren[pos];
                var type = child.tagName;
                if (type.toLowerCase() !== "script" && type.toLowerCase() !== "link")
                {
                    if (moveToNextOrStop(pos) === headChildren.length)
                    {
                        return;
                    }
                }

                var headElement = document.createElement(type);
                for (var attr, i = 0, attrs = child.attributes, n = attrs.length; i < n; i++) {
                    attr = attrs[i];
                    headElement.setAttribute(attr.nodeName, attr.nodeValue);
                }

                headElement.onload = function()
                {
                    pos = moveToNextOrStop(pos);
                };

                partial.parentNode.insertBefore(headElement, partial);
            }
        }

        loadScripts(0);
    }

    function loadUrl(url, callback)
    {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "document";
        request.onloadend = callback;
        request.send();
    }

    detectPartials();
})();