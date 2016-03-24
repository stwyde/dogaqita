$(function() {
    //initialize the canvas
    var canvas = $('#kaleidoscope');
    console.log(canvas);
    var g = canvas[0].getContext('2d');

    // button to switch picture
    $('.switchBtn').click(function () {
        console.log("clicked");
        if (changed != false) {
            img.src = imgSource;
            changed = false;
        } else {
            img.src = "../images/squirrel.jpg";
            changed = true;
        }
    });

    //Zooming in and out effect
    var animate = function () {
        if(shift > shiftLimitMin && !toggle){
            shift--;
        }
        else if(shift == shiftLimitMin && toggle == false){
            toggle = !toggle;
            shift++;
        }
        else if(shift < shiftLimitMax && toggle){
            shift++;
        }
        else if(shift == shiftLimitMax && toggle){
            toggle=!toggle;
            shift--;
        }
        draw();
    };

    $('.shuffleBtn').click(function(){
        if(animationTimer == null) {
            animationTimer = setInterval(animate, 100);
        }
        else{
            clearInterval(animationTimer);
            animationTimer = null;
        }
    });

    var animationTimer = null;
    var imgSource = "../images/k.jpg";
    var shiftLimitMin = -40;
    var shiftLimitMax = 0;
    var toggle = false;
    var shift = 0;
    var pixelBuffer = 20;
    var width = 1000;
    var height = 650;
    var centerW = (width / 2);
    var centerH = (height / 2);
    var TriLength = 150;
    var TriHeight = Math.sqrt((TriLength * TriLength) - (TriLength * TriLength / 4));

    var img = new Image();
    img.src = imgSource;
    changed = false;
    function drawMultipleHexs() {
        g.translate(centerW, centerH);
        g.save();
        drawHex();
        g.restore();

        /*
        //above
        g.save();
        g.translate(0, -2 * TriHeight);
        drawHex();
        g.restore();

        //lower right diagonal
        g.save();
        g.translate(1.5 * TriLength, TriHeight);
        drawHex();
        g.restore();

        //directly below
        g.save();
        g.translate(0, 2 * TriHeight);
        drawHex();
        g.restore();

        //upper left
        g.save();
        g.translate(-1.5 * TriLength, -1 * TriHeight);
        drawHex();
        g.restore();

        //lower left
        g.save();
        g.translate(-1.5 * TriLength, TriHeight);
        drawHex();
        g.restore();

        //???
        g.save();
        g.translate(3 * TriLength, 1 / 200 * TriHeight); //1/200??
        drawHex();
        g.restore();

        g.save();
        g.translate(1.5 * TriLength, 3 * TriHeight);
        drawHex();
        g.restore();

        //upper right diagonal
        g.save();
        g.translate(1.5 * TriLength, -1 * TriHeight);
        drawHex();
        g.restore();

        g.save();
        drawHex();
        g.restore();
        */

        //todo: fix this code below
        //this loop creates the start of the columns of images
        for(var t = -3; t < 10; t++) {
            g.save();
            g.translate(TriLength*4*t, 0);
            //this loop actually renders the image
            for (var i = -3; i < 4; i++) {
                g.save();
                g.translate(0, i * 2 * TriHeight);
                drawHex();
                g.translate(TriLength*2, TriHeight);
                drawHex();
                g.restore();
            }
            g.restore();
        }
    }

    function drawHex() {
        for (i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                drawTriangle(shift);
            }
            if (i % 2 == 1) {
                g.save();
                g.scale(-1, 1);
                drawTriangle(shift);
                g.restore()
            }
            g.rotate(60 * Math.PI / 180);

        }
    }

    // Draw a single triangle
    function drawTriangle(shift) {
        g.save();
        g.beginPath();
        g.moveTo(TriLength, 0);
        g.lineTo(TriLength / 2, TriHeight);
        g.lineTo(0, 0);
        g.clip();
        g.drawImage(img, shift, shift);
        g.restore();
    }

    //Draw the huge Kalei on the center
    function draw() {
        var grd = g.createLinearGradient(0, 0, width, 0);
        grd.addColorStop(0, "sandybrown");
        grd.addColorStop(1, "lightblue");
        g.fillStyle = grd;

        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH, 0, 2 * Math.PI);
        g.clip();
        g.fillRect(0, 0, width, height);
        g.restore();

        //draw hexagons in circle
        g.save();
        g.beginPath();
        g.arc(centerW, centerH, centerH - pixelBuffer, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();
    }


    img.onload = draw;


    //Play and pause the song
    function aud_play_pause(songTitle) {
        var thisAudio = document.getElementById(songTitle);
        if (thisAudio.paused) {
            thisAudio.play();
        } else {
            thisAudio.pause();
        }
    }

    //todo: fix the download button
    // Download Image
    function download(){
        document.getElementById("downloader").download = "image.png";
        document.getElementById("downloader").href = document.getElementById("kaleidoscope").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }
});