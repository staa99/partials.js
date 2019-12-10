(function()
{
    var event = new Event("partials:loaded");

    var count = 0;
    function dispatchEvent()
    {
        if (--count === 0)
        {
            window.dispatchEvent(event);
        }
    }

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
                count++;
                var partial = partials[i];
                processPartial(partial);
            }
        }
    }

    function processPartial(partial)
    {
        var link = getLink(partial);

        if (link === null)
        {
            console.log("Skipping this partial because there's no link: " + partial);
            return;
        }

        loadUrl(link,
            function()
            {
                if (this.status >= 200 && this.status < 300)
                {
                    loadUrlCallback(partial, this.response);
                }
                else
                {
                    partial.parentNode.removeChild(partial);
                    dispatchEvent();
                }
            });
    }

    function getLink(partial)
    {
        // get the links
        var tagName = partial.tagName.toLowerCase();
        var link = tagName === "partial"
            ? partial.getAttribute("href")
            : tagName === "div"
            ? partial.getAttribute("data-partial")
            : null;

        return resolveLink(partial, link);
    }

    function resolveLink(partial, link)
    {
        // exclude empty links
        if (link === null || link === "" || link === undefined)
        {
            return null;
        }

        if (link[0] === "/" || link.match(/^\w+:\/\/.+/))
        {
            return link;
        }

        var path = partial.baseURI;
        var start = path.indexOf("?");
        if (start !== -1)
        {
            path = path.substr(0, start);
        }

        start = path.indexOf("#");
        if (start !== -1)
        {
            path = path.substr(0, start);
        }

        if (path[path.length - 1] !== "/")
        {
            var schemeEnd = path.indexOf("://") + 3;
            path = path.substring(0, path.substring(schemeEnd).lastIndexOf("/") + schemeEnd) + "/";
        }

        return path + link;
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
            dispatchEvent();
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
                dispatchEvent();
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

                // if type is link, append to head instead
                if (type === "link")
                {
                    document.head.append(headElement);
                }
                else
                {
                    partial.parentNode.insertBefore(headElement, partial);
                }
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