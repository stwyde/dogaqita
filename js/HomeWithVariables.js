
$(function() {
    var canvas = $('#kaleidoscope');
    console.log(canvas);
    var g = canvas[0].getContext('2d');

    //set img source
    var img = new Image();
    img.src = "../images/k.jpg";

    // button to switch picture
    $('.switchBtn').click(function() {
        console.log("clicked")
        img.src = "../images/p.jpg";
    })




    //setInterval()


    $('.sw').click(function() {
        for(i = -40; i < 0; i++){
            shift = i;
            draw();
        }
        //shift = Math.random() * -40;

    })



    var shift = 0;
    var pixelBuffer = 20;
    var width = 1000;
    var height = 650;
    var centerW = (width/2);
    var centerH = (height/2);
    var TriLength = 150;
    var TriHeight = Math.sqrt((TriLength*TriLength) - (TriLength*TriLength/4));

    function drawMultipleHexs(){
        g.translate(centerW, centerH);
        g.save();
        drawHex();
        g.restore();

        //above
        g.save();
        g.translate(0, -2*TriHeight);
        drawHex();
        g.restore();

        //lower right diagonal
        g.save();
        g.translate(1.5*TriLength, TriHeight);
        drawHex();
        g.restore();

        //directly below
        g.save();
        g.translate(0, 2*TriHeight);
        drawHex();
        g.restore();

        //upper left
        g.save();
        g.translate(-1.5*TriLength, -1*TriHeight);
        drawHex();
        g.restore();

        //lower left
        g.save();
        g.translate(-1.5*TriLength, TriHeight);
        drawHex();
        g.restore();

        //???
        g.save();
        g.translate(3*TriLength, 1/200*TriHeight); //1/200??
        drawHex();
        g.restore();

        g.save();
        g.translate(1.5*TriLength, 3*TriHeight);
        drawHex();
        g.restore();

        //upper right diagonal
        g.save();
        g.translate(1.5*TriLength, -1*TriHeight);
        drawHex();
        g.restore();
    }

    function drawHex(){
        for(i = 0; i< 6; i++) {
            if(i%2 == 0){
                drawTriangle(shift);
            }
            if(i%2 == 1){
                g.save();
                g.scale(-1,1);
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
        g.moveTo(TriLength,0);
        g.lineTo(TriLength/2, TriHeight);
        g.lineTo(0, 0);
        g.clip();
        g.drawImage(img, shift, shift);
        g.restore();
    }

    //
    function draw(){
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
        g.arc(centerW, centerH, centerH-pixelBuffer, 0, 2 * Math.PI);
        g.clip();
        drawMultipleHexs();
        g.restore();
    }




    function aud_play_pause(songTitle) {
        var thisAudio = document.getElementById(songTitle);
        if (thisAudio.paused) {
            thisAudio.play();
        } else {
            thisAudio.pause();
        }
    }

    // Download Image
    function download(){
        document.getElementById("downloader").download = "image.png";
        document.getElementById("downloader").href = document.getElementById("kaleidoscope").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    }

    img.onload = draw;

});