img = "";
status1 = "";
sound = "";
objects = [];
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function preload(){
    sound = loadSound('alarm.wav');
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            objectDetector.detect(video, gotResult);
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+200, objects[i].y+50);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y-200, objects[i].width-500, objects[i].height-500);
        }
        if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Baby found";
            console.log("stop");
            sound.stop();
        }else{
            document.getElementById("status").innerHTML = "Baby not found";
            console.log("start");
            sound.play();
        }
    }
    if(objects.length == 0){
        document.getElementById("status").innerHTML = "Baby not found";
        console.log("start");
        sound.play();
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;

}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
