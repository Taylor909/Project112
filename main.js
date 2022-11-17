Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");


function campture_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capturedPhoto" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0dyqF0EAO/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the gesture prediction is "+ prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}
function predict_gesture(){
    img=document.getElementById("capturedPhoto");
    classifier.classify(img,gotResult)
    }


    function gotResult(error,results){
        if (error){
            console.error(error);
        }    else{
            console.log(results);
            prediction_1=results[0].label;
            speak();
            if(results[0].label=="best"){
                document.getElementById("predict_gesture").innerHTML="&#128077;";
            }
            if(results[0].label=="amazing"){
                document.getElementById("predict_gesture").innerHTML="&#128076;";
            }
            if(results[0].label=="victory"){
                document.getElementById("predict_gesture").innerHTML="&#9996;";
            }
        }
    }