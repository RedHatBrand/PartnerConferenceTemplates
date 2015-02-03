(function (global) {
    var canvasWrapper = document.getElementById("artwork");
    var canvas        = document.createElement("div");
    
    canvas.classList.add("artwork-inner");
    canvasWrapper.appendChild(canvas);
    
    var artColor            = global.artworkColor;
    var artStyle          = global.artworkStyle;
    var artSize             = global.artworkSize;
    var artOrientation      = global.artworkOrientation;
    var artFlipped          = global.artworkFlipped;
    
    function isPortrait (element) {
        return element.offsetWidth < element.offsetHeight;
    }

    function setCanvasSize () {
        if (isPortrait(canvasWrapper)) {
            canvas.style.width = canvasWrapper.offsetHeight + "px";
        } else {
            canvas.style.width = "initial";
        }
    }
    
    setCanvasSize();
    window.addEventListener("resize", function () {
        setCanvasSize();
    });
    
    var color = {
        "blue": function() {
            return "rgba(0,185,228,0.2)";
        },
        "teal": function() {
            return "rgba(0,122,135,0.2)";
        },
        "yellow": function() {
            return "rgba(240,171,0,0.2)";
        },
        "green": function() {
            return "rgba(146,212,0,0.2)";
        },
        "grey": function() {
            return "rgba(209,212,211,0.2)";
        }
    }
    
    function getColor (_colormode) {
        if (color[_colormode])
            return color[_colormode]();
        else
            return color.blue();
    }
    
    var orientation = {
        "vertical": function(n) {
            if (n > 0)
                return "right";
            else
                return "left";
        },
        "horizontal": function(n) {
            if (n > 0)
                return "bottom";
            else
                return "top";
        }
    }
    
    function getAlignment (n, _orientation) {
        if (orientation[_orientation])
            return orientation[_orientation](n);
        else
            return orientation.vertical();
    }
    
    var style = {
        "5:1": function(n) {
            if (n > 0)
                return 20;
            else
                return -100;
        },
        "1:5": function(n) {
            if (n > 0)
                return -100;
            else
                return 20;
        },
        "1:1": function(n) {
            if (n > 0)
                return -80;
            else
                return -80;
        },
        "0:0": function(n) {
            if (n > 0)
                return 0;
            else
                return 0;
        }
    }
    
    function getOffset (n, _style) {
        if (style[_style])
            return style[_style](n);
        else
            return style.vertical();
    }
    
    var alignment = {
        "top": function(triangle, i, size, offset, flipped) {
            
            var transformation = flipped ? "skewY(-45deg)" : "skewY(45deg)";
            
            triangle.style.top = "0%";
            triangle.style.right = flipped ? (i*(size*10)) + "vw": -(i*(size*10)) + offset + "vw";
            triangle.style.transformOrigin = flipped ? "0% 0%" : "100% 100%";
            triangle.style.transform = transformation;
            triangle.style.webkitTransform = transformation;
            triangle.style.MozTransform = transformation;
            triangle.style.msTransform = transformation;
            triangle.style.OTransform = transformation;
            triangle.style.width = (100-offset) + "vw";
            triangle.style.height = (100-offset) + "vw";
        },
        "left": function(triangle, i, size, offset, flipped) {
            
            var transformation = flipped ? "skewX(-45deg)" : "skewX(45deg)";
            
            triangle.style.left = "0%";
            triangle.style.top = flipped ? -(i*(size*10)) + "vh" : (i*(size*10)) + offset + "vh";
            triangle.style.transformOrigin = flipped ? "0% 0%" : "100% 100%";
            triangle.style.transform = transformation;
            triangle.style.webkitTransform = transformation;
            triangle.style.MozTransform = transformation;
            triangle.style.msTransform = transformation;
            triangle.style.OTransform = transformation;
            triangle.style.width = (100-offset) + "vh";
            triangle.style.height = (100-offset) + "vh";
        },
        "bottom": function(triangle, i, size, offset, flipped) {
            
            var transformation = flipped ? "skewY(45deg)" : "skewY(-45deg)";
            
            triangle.style.bottom = "0%";
            triangle.style.right = flipped ? (i*(size*10)) + "vw" : -(i*(size*10)) + offset + "vw";
            triangle.style.transformOrigin = flipped ? "0% 0%" : "100% 100%";
            triangle.style.transform = transformation;
            triangle.style.webkitTransform = transformation;
            triangle.style.MozTransform = transformation;
            triangle.style.msTransform = transformation;
            triangle.style.OTransform = transformation;
            triangle.style.width = (100-offset) + "vw";
            triangle.style.height = (100-offset) + "vw";
        },
        "right": function(triangle, i, size, offset, flipped) {
            
            var transformation = flipped ? "skewX(45deg)" : "skewX(-45deg)";
            
            triangle.style.right = "0%";
            triangle.style.top = flipped ? -(i*(size*10)) + "vh" : (i*(size*10)) + offset + "vh";
            triangle.style.transformOrigin = flipped ? "0% 0%" : "100% 100%";
            triangle.style.transform = transformation;
            triangle.style.webkitTransform = transformation;
            triangle.style.MozTransform = transformation;
            triangle.style.msTransform = transformation;
            triangle.style.OTransform = transformation;
            triangle.style.width = (100-offset) + "vh";
            triangle.style.height = (100-offset) + "vh";
        }
    }
    
    function setTriangleAlignment (_alignment, triangle, i, _size, _offset, _flipped) {
        if (alignment[_alignment])
            return alignment[_alignment](triangle, i, _size, _offset, _flipped);
        else
            return alignment.left(triangle, i, _size, _offset, _flipped);
    }
    
    function addTriangleWithOptions (i, _size, _alignment, _offset, _flipped) {
        var div = document.createElement("div");
        div.classList.add("artwork-triangle");
        
        div.style.backgroundColor = getColor(artColor);
        div.style.position = "absolute";
        
        setTriangleAlignment (_alignment, div, i, _size, _offset, _flipped);
        
        canvas.appendChild(div);
    }
    
    function addTriangle (i, _alignment) {
        addTriangleWithOptions (i, _alignment, 0, false);
    }
    
    function drawArtwork () {
        for (var i = 0; i < 5; i++) {
            addTriangleWithOptions (i,artSize,getAlignment(0,artOrientation),getOffset(0,artStyle),artFlipped);
        }
        
        for (var i = 0; i < 5; i++) {
            addTriangleWithOptions (i,artSize,getAlignment(1,artOrientation),getOffset(1,artStyle),artFlipped);
        }
    }
    
    drawArtwork();
    
})(window);