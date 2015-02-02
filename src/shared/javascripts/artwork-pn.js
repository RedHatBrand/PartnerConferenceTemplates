(function (global) {
    var canvasWrapper = document.getElementById('artwork');
    var canvas        = document.createElement('div');
    
    canvas.classList.add('artwork-inner');
    canvasWrapper.appendChild(canvas);
    
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
        "top": function(triangle, i) {
            triangle.style.top = "0%";
            triangle.style.right = (i*10) + "%";
        },
        "left": function(triangle, i) {
            triangle.style.left = "0%";
            triangle.style.top = (i*10) + "%";
            triangle.style.transform = "rotateY(0deg)";
        },
        "bottom": function(triangle, i) {
            triangle.style.bottom = "0%";
            triangle.style.right = (i*10) + "%";
        },
        "right": function(triangle, i) {
            triangle.style.right = "0%";
            triangle.style.top = (i*10) + "%";
            triangle.style.transform = "rotateY(180deg)";
        }
    }
    
    function setTriangleAlignment (_alignment, triangle, i) {
        if (alignment[_alignment])
            return alignment[_alignment](triangle, i);
        else
            return alignment.left(triangle, i);
    }
    
    function addTriangle (i, _alignment) {
        var div = document.createElement('div');
        div.classList.add('artwork-triangle');
        div.style.backgroundImage = "url(\"data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200'><polygon fill-opacity='0.2' fill='rgb(0,185,228)' points='0,0 100,100 0,200' /></svg>\")";
        setTriangleAlignment (_alignment, div, i);
        div.style.position = "absolute";
        div.style.width = "100vh";
        div.style.height = "100vh";
        div.style.backgroundSize = "200%";
        div.style.overflow = "hidden";
        canvas.appendChild(div);
    }
    
    function drawBackground () {
        for (var i = 0; i < 5; i++) {
            addTriangle (i,"left");
        }
        
        for (var i = 0; i < 5; i++) {
            addTriangle (i,"right");
        }
    }
    
    drawBackground();
    
})(window);