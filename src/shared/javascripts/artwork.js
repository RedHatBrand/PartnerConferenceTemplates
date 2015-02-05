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
    "corner": function(n) {
      if (n > 0)
        return 20;
      else
        return -100;
    },
    "tiled": function(n) {
      if (n > 0)
        return -80;
      else
        return -80;
    },
    "directional": function(n) {
      if (n > 0)
        return 0;
      else
        return 0;
    },
    "zero": function(n) {
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
      return style.tiled();
  }
  
  var offset = [0,0];
  offset[0] = getOffset(0,artStyle);
  offset[1] = getOffset(1,artStyle);

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
    while ( canvas.hasChildNodes() ){
      canvas.removeChild(canvas.lastChild);
    }
    
    for (var i = 0; i < 5; i++) {
      addTriangleWithOptions (i,artSize,getAlignment(0,artOrientation),offset[0],artFlipped);
    }

    for (var i = 0; i < 5; i++) {
      addTriangleWithOptions (i,artSize,getAlignment(1,artOrientation),offset[1],artFlipped);
    }
  }

  drawArtwork();
  
  // Media Queries
    
  if (matchMedia) {
    
    var queries = {
      "(min-aspect-ratio: 5/1) and (max-aspect-ratio: 10/1)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -300;
            offset[1] = 100;
            drawArtwork();
          } else if (artStyle == "tiled") {
            offset[0] = -400;
            offset[1] = -400;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 3/1) and (max-aspect-ratio: 5/1)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -180;
            offset[1] = -180;
            drawArtwork();
          } else if (artStyle == "tiled") {
            offset[0] = -200;
            offset[1] = -200;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 5/2) and (max-aspect-ratio: 3/1)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -180;
            offset[1] = 30;
            drawArtwork();
          } else if (artStyle == "tiled") {
            offset[0] = -150;
            offset[1] = -150;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 2/1) and (max-aspect-ratio: 5/2)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -130;
            offset[1] = 30;
            drawArtwork();
          } else if (artStyle == "tiled") {
            offset[0] = -125;
            offset[1] = -125;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 5/3) and (max-aspect-ratio: 2/1)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -115;
            offset[1] = 30;
            drawArtwork();
          } else if (artStyle == "tiled") {
            offset[0] = -100;
            offset[1] = -100;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 5/4) and (max-aspect-ratio: 5/3)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -90;
            offset[1] = 25;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 1/3) and (max-aspect-ratio: 5/3)": function (mq) {
        if (mq.matches) {
          if (artStyle == "tiled") {
            offset[0] = -60;
            offset[1] = -60;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 1/1) and (max-aspect-ratio: 5/4)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -65;
            offset[1] = 25;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 210/297) and (max-aspect-ratio: 1/1)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -40;
            offset[1] = 20;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 1/2) and (max-aspect-ratio: 210/297)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -20;
            offset[1] = -10;
            drawArtwork();
          }
        }
      },
      "(min-aspect-ratio: 1/3) and (max-aspect-ratio: 1/2)": function (mq) {
        if (mq.matches) {
          if (artStyle == "corner") {
            offset[0] = -10;
            offset[1] = -40;
            drawArtwork();
          }
        }
      }
    }
  
    var style = document.createElement("style");
    
    for (var query in queries) {
      var mq = window.matchMedia(query);
      mq.addListener(queries[query]);
      queries[query](mq);
      style.appendChild(document.createTextNode("@media " + query + " { .artwork-blank-rule {} }"));
    }
    
    function defaultListener() {
      offset[0] = -100;
      offset[1] = 20;
      drawArtwork();
    }
    
    document.head.appendChild(style);
    
  }
  
})(window);