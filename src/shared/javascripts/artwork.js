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
    
    var flipped = false;
    var colour = "rgba(0,185,228,0.2)";
    
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
        "top": function(triangle, i, size, offset, flipped) {
            
            var transformation = flipped ? "skewX(-45deg)" : "skewX(45deg)";
            
            triangle.style.top = "0%";
            triangle.style.right = flipped ? -(i*(size*10)) + "vw": (i*(size*10)) + offset + "vw";
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
            
            var transformation = flipped ? "skewX(45deg)" : "skewX(-45deg)";
            
            triangle.style.bottom = "0%";
            triangle.style.right = flipped ? -(i*(size*10)) + "vw" : (i*(size*10)) + offset + "vw";
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
        var div = document.createElement('div');
        div.classList.add('artwork-triangle');
        
        div.style.backgroundColor = colour;
        div.style.position = "absolute";
        
        setTriangleAlignment (_alignment, div, i, _size, _offset, _flipped);
        
        canvas.appendChild(div);
    }
    
    function addTriangle (i, _alignment) {
        addTriangleWithOptions (i, _alignment, 0, false);
    }
    
    function drawBackground () {
        for (var i = 0; i < 5; i++) {
            addTriangleWithOptions (i,2,"left",-100,true);
        }
        
        for (var i = 0; i < 5; i++) {
            addTriangleWithOptions (i,2,"right",20,true);
        }
    }
    
    drawBackground();
    
})(window);