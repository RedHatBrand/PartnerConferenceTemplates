//(function (global) {
//  var canvasWrapper = document.getElementById('artwork');
//  var canvas        = document.createElement('div');
//  var animatable    = canvasWrapper.classList.contains('artwork-animate');
//
//  canvas.classList.add('artwork-inner');
//  canvasWrapper.appendChild(canvas);
//
//  var complexity = global.redhatArtComplexity || 10;
//  global.redhatBrandPattern = 'corporate';
//
//  function isPortrait (element) {
//    return element.offsetWidth < element.offsetHeight;
//  }
//
//  function setCanvasSize () {
//    if (isPortrait(canvasWrapper)) {
//      canvas.style.width = canvasWrapper.offsetHeight + 'px';
//    } else {
//      canvas.style.width = 'initial';
//    }
//  }
//
//  setCanvasSize();
//  window.addEventListener('resize', function () {
//    setCanvasSize();
//  });
//
//  function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min)) + min;
//  }
//
//  function getRandomArbitrary(min, max) {
//    return Math.random() * (max - min) + min;
//  }
//
//  function initArray(n) {
//    return Array.apply([], Array(n));
//  }
//
//  function gridPositions (colCount) {
//    return initArray(colCount).map(function (_elem, index) {
//      return (100 / colCount) * index;
//    });
//  }
//
//  function randomArrayElem (arr) {
//    return arr[getRandomInt(0, arr.length - 1)];
//  }
//
//  var artwork = {
//    gridPositions: gridPositions(10)
//  };
//
//  function createShape (i) {
//    var div = document.createElement('div');
//    div.classList.add('artwork-shape');
//    div.style.left    = randomArrayElem(artwork.gridPositions).toString() + '%';
//    div.style.top     = randomArrayElem(artwork.gridPositions.slice(1)).toString() + '%';
//    div.style.height  = randomArrayElem(artwork.gridPositions.slice(1)).toString() + '%';
//    div.style.width   = randomArrayElem(artwork.gridPositions.slice(1)).toString() + '%';
//    div.style.opacity = randomArrayElem([0.25, 0.5, 0.75]);
//    div.style.animationDuration = getRandomInt(1,3).toString() + 's';
//    canvas.appendChild(div);
//
//    if (animatable) {
//      div.classList.add('skew-animate-in');
//    }
//  }
//
//  function addPattern () {
//    var div = document.createElement('div');
//    div.setAttribute('data-red-hat-pattern', global.redhatBrandPattern);
//    div.classList.add('artwork-pattern');
//    div.style.animationDuration = getRandomInt(1,3).toString() + 's';
//    canvas.appendChild(div);
//
//    if (animatable) {
//      div.classList.add('rotate-animate-in');
//    }
//  }
//
//  function populateCanvas (complexity) {
//    for (var i = 0; i < complexity; i++) {
//      createShape(i);
//    }
//
//    addPattern();
//  }
//  populateCanvas(complexity);
//})(window);


(function (global) {
    var canvasWrapper = document.getElementById('artwork');
    var canvas        = document.createElement('div');
    
    canvas.classList.add('artwork-inner');
    canvasWrapper.appendChild(canvas);
    
    var complexity = global.redhatArtComplexity || 5;
    var offsetInitial = 20;
    var flipped = false;
    
    function isPortrait (element) {
        return element.offsetWidth < element.offsetHeight;
    }

    function setCanvasSize () {
        if (isPortrait(canvasWrapper)) {
            canvas.style.width = canvasWrapper.offsetHeight + 'px';
        } else {
            canvas.style.width = 'initial';
        }
    }
    
    setCanvasSize();
    window.addEventListener('resize', function () {
        setCanvasSize();
    });
    
    var alignment = {
        "top": function(triangle, i, offset, flipped) {
            triangle.style.top = "0%";
            triangle.style.right = flipped ? (i*-15) + offset - 100 + "vw" : (i*15) + offset + "vw";
            triangle.style.transform = "rotateX(180deg) skewX(-45deg)";
            triangle.style.webkitTransform = "rotateX(180deg) skewX(-45deg)";
            triangle.style.MozTransform = "rotateX(180deg) skewX(-45deg)";
            triangle.style.msTransform = "rotateX(180deg) skewX(-45deg)";
            triangle.style.OTransform = "rotateX(180deg) skewX(-45deg)";
            triangle.style.width = (100-offset) + "vw";
            triangle.style.height = (100-offset)*2 + "vw";
        },
        "left": function(triangle, i, offset, flipped) {
            triangle.style.left = "0%";
            triangle.style.top = flipped ? (i*-15) + offset - 100 + "vh" : (i*15) + offset + "vh";
            triangle.style.transform = "rotateY(0deg) skewX(-45deg)";
            triangle.style.webkitTransform = "rotateY(0deg) skewX(-45deg)";
            triangle.style.MozTransform = "rotateY(0deg) skewX(-45deg)";
            triangle.style.msTransform = "rotateY(0deg) skewX(-45deg)";
            triangle.style.OTransform = "rotateY(0deg) skewX(-45deg)";
            triangle.style.width = (100-offset) + "vh";
            triangle.style.height = (100-offset)*2 + "vh";
        },
        "bottom": function(triangle, i, offset, flipped) {
            triangle.style.bottom = "0%";
            triangle.style.right = flipped ? (i*-15) + offset - 100 + "vw" : (i*15) + offset + "vw";
            triangle.style.transform = "rotateX(0deg) skewX(-45deg)";
            triangle.style.webkitTransform = "rotateX(0deg) skewX(-45deg)";
            triangle.style.MozTransform = "rotateX(0deg) skewX(-45deg)";
            triangle.style.msTransform = "rotateX(0deg) skewX(-45deg)";
            triangle.style.OTransform = "rotateX(0deg) skewX(-45deg)";
            triangle.style.width = (100-offset) + "vw";
            triangle.style.height = (100-offset)*2 + "vw";
        },
        "right": function(triangle, i, offset, flipped) {
            triangle.style.right = "0%";
            triangle.style.top = flipped ? (i*-15) + offset - 100 + "vh" : (i*15) + offset + "vh";
            triangle.style.transform = "rotateY(180deg) skewX(-45deg)";
            triangle.style.webkitTransform = "rotateY(180deg) skewX(-45deg)";
            triangle.style.MozTransform = "rotateY(180deg) skewX(-45deg)";
            triangle.style.msTransform = "rotateY(180deg) skewX(-45deg)";
            triangle.style.OTransform = "rotateY(180deg) skewX(-45deg)";
            triangle.style.width = (100-offset) + "vh";
            triangle.style.height = (100-offset)*2 + "vh";
        }
    }
    
    function setTriangleAlignment (_alignment, triangle, i, _offset, _flipped) {
        if (alignment[_alignment])
            return alignment[_alignment](triangle, i, _offset, _flipped);
        else
            return alignment.left(triangle, i, _offset, _flipped);
    }
    
    function addTriangleWithOptions (i, _alignment, _offset, _flipped) {
        var div = document.createElement('div');
        div.classList.add('artwork-triangle');
        
//        div.style.backgroundImage = "url(\"data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200'><polygon fill-opacity='0.2' fill='rgb(0,185,228)' points='0,0 100,100 0,200' /></svg>\")";
        div.style.backgroundColor = "rgba(0,185,228,0.2)";
        
        setTriangleAlignment (_alignment, div, i, _offset, _flipped);
        div.style.position = "absolute";
        div.style.backgroundSize = "100%";
        div.style.overflow = "hidden";
        canvas.appendChild(div);
    }
    
    function addTriangle (i, _alignment) {
        addTriangleWithOptions (i, _alignment, 0, false);
    }
    
    function drawBackground () {
        for (var i = 0; i < 5; i++) {
            addTriangleWithOptions (i,"left",-100,true);
        }
        
        for (var i = 0; i < 5; i++) {
            addTriangleWithOptions (i,"right",15,true);
        }
    }
    
    drawBackground();
    
})(window);