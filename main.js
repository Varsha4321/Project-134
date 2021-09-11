alarm = "https://www.soundsnap.com/efx_int_emergency_beeper_a_02_wav";
img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('baby.jpg');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("baby_found").innerHTML = "Baby Found";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(object[i].label != "person"){
                alarm.play()
                document.getElementById("baby_found").innerHTML = "Baby Not Found";
            }
            else{
                document.getElementById("baby_found").innerHTML = "Baby Found";
                alarm.stop()
            }
        }
        if(objects.length = 0){
            document.getElementById("baby_found").innerHTML = "Baby Not Found";
            alarm.play()
        }
    }
}