(function()
{
    function detectPartials(document)
    {
        // use a partial tag
        var divPartials = document.querySelectorAll("div[data-partial]");
        var tagPartials = document.getElementsByTagName("partial");

        var partials = [];
        var i;
        for (i in divPartials)
        {
            if (divPartials.hasOwnProperty(i))
            {
                partials.push(divPartials[i]);
            }
        }

        for (i in tagPartials)
        {
            if (tagPartials.hasOwnProperty(i))
            {
                partials.push(tagPartials[i]);
            }
        }

        // process the partials
        for (i in partials)
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
        var tagName = partial.tagName.toLowerCase();
        var link = tagName === "partial"
            ? partial.getAttribute("href")
            : tagName === "div"
            ? partial.getAttribute("data-partial")
                : null;

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

                // detect partials in the child
                detectPartials(child);
                partial.parentNode.insertBefore(child, partial);
            }
        }

        // then add the scripts/links
        var headChildren = response.head.children;

        // if there are no headChildren,
        // remove the partial here
        if (headChildren.length === 0)
        {
            partial.parentNode.removeChild(partial);
        }

        loadScripts(0);

        function moveToNextOrStop(pos)
        {
            if (++pos < headChildren.length)
            {
                loadScripts(pos);
                return pos;
            }
            else
            {
                partial.parentNode.removeChild(partial);
                return headChildren.length;
            }
        }

        function loadScripts(pos)
        {
            if (headChildren.hasOwnProperty(pos))
            {
                var child = headChildren[pos];
                var type = child.tagName.toLowerCase();
                if (type !== "script" && type !== "link")
                {
                    if (moveToNextOrStop(pos) === headChildren.length)
                    {
                        return;
                    }
                }

                var headElement = document.createElement(type);
                for (var attr, i = 0, attrs = child.attributes, n = attrs.length; i < n; i++)
                {
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
    }

    function loadUrl(url, callback)
    {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "document";
        request.onloadend = callback;
        request.send();
    }

    detectPartials(document);
})();