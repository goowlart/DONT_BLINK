(function exampleCode() {
	"use strict";

	var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    //stop = document.getElementById('stop'),
    //clear = document.getElementById('clear'),
	//score = document.getElementById('score'),
	//name = document.getElementById('name'),

    mils = 0 ,seconds = 0, minutes = 0,
    t;


function add() {

    mils++;
    if (mils >= 100) {
        mils = 0;
        seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
  }

    h1.textContent = (minutes > 9 ? minutes : "0" + minutes)+ ":" + (seconds > 9 ? seconds : "0" + seconds)+ ":" + (mils > 9 ? mils : "0" + mils);

    timer();
}
function timer() {
    t = setTimeout(add, 1);
}



/* Start button */
start.onclick = timer;


	brfv4Example.initCurrentExample = function(brfManager, resolution) {
		brfManager.init(resolution, resolution, brfv4Example.appId);
	};

	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {

		brfManager.update(imageData);

		draw.clear();

		// Face detection results: a rough rectangle used to start the face tracking.

		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);
		draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);

		var faces = brfManager.getFaces(); // default: one face, only one element in that array.

		for(var i = 0; i < faces.length; i++) {

			var face = faces[i];

			if(face.state === brfv4.BRFState.FACE_TRACKING) {

				// simple blink detection

				// A simple approach with quite a lot false positives. Fast movement can't be
				// handled properly. This code is quite good when it comes to
				// staring contest apps though.

				// It basically compares the old positions of the eye points to the current ones.
				// If rapid movement of the current points was detected it's considered a blink.

				var v = face.vertices;

				if(_oldFaceShapeVertices.length === 0) storeFaceShapeVertices(v);

				var k, l, yLE, yRE;

				// Left eye movement (y)

				for(k = 36, l = 41, yLE = 0; k <= l; k++) {
					yLE += v[k * 2 + 1] - _oldFaceShapeVertices[k * 2 + 1];
				}
				yLE /= 6;

				// Right eye movement (y)

				for(k = 42, l = 47, yRE = 0; k <= l; k++) {
					yRE += v[k * 2 + 1] - _oldFaceShapeVertices[k * 2 + 1];
				}

				yRE /= 6;

				var yN = 0;

				// Compare to overall movement (nose y)

				yN += v[27 * 2 + 1] - _oldFaceShapeVertices[27 * 2 + 1];
				yN += v[28 * 2 + 1] - _oldFaceShapeVertices[28 * 2 + 1];
				yN += v[29 * 2 + 1] - _oldFaceShapeVertices[29 * 2 + 1];
				yN += v[30 * 2 + 1] - _oldFaceShapeVertices[30 * 2 + 1];
				yN /= 4;

				var blinkRatio = Math.abs((yLE + yRE) / yN);

				if((blinkRatio > 12 && (yLE > 0.4 || yRE > 0.4))) {
					console.log("blink " + blinkRatio.toFixed(2) + " " + yLE.toFixed(2) + " " +
						yRE.toFixed(2) + " " + yN.toFixed(2));

					blink();
				}

				// Let the color of the shape show whether you blinked.

				var color = 0x00a0ff;

				if(_blinked) {
					color = 0xe74c3c;
				}

				// Face Tracking results: 68 facial feature points.

				draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
				draw.drawVertices(	face.vertices, 2.0, false, color, 0.4);

				brfv4Example.dom.updateHeadline("BRFv4 - advanced - face tracking - simple blink" +
					"detection.\nDetects an eye  blink: " + (_blinked ? timeR() : "No"));

				storeFaceShapeVertices(v);
			}
		}
	};

	function blink() {
		_blinked = true;

		if(_timeOut > -1) { clearTimeout(_timeOut); }

		_timeOut = setTimeout(resetBlink, 500);
	}

	function resetBlink() {
		_blinked = false;
	}

	function storeFaceShapeVertices(vertices) {
		for(var i = 0, l = vertices.length; i < l; i++) {
			_oldFaceShapeVertices[i] = vertices[i];
		}
	}

	var _oldFaceShapeVertices = [];
	var _blinked		= false;
	var _timeOut		= -1;

	brfv4Example.dom.updateHeadline("BRFv4 - advanced - face tracking - simple blink detection.\n" +
		"Detects a blink of the eyes: ");

	brfv4Example.dom.updateCodeSnippet(exampleCode + "");
	var tabTime = [];
	var tabNom = [];



/* Stop button
stop.onclick = function() {
    clearTimeout(t);
}
*/
/* Clear button
clear.onclick = function() {
    h1.textContent = "00:00:00";
	mils = 0; seconds = 0; minutes = 0;
}
*/
function timeR(){

	clearTimeout(t);


				if (h1.textContent != "00:00:00" ){
				var ff = h1.textContent;
				tabTime.push(ff);
				mils = 0; seconds = 0; minutes = 0;
				h1.textContent = "00:00:00";


			}

	tabTime.sort();



for(var i=0; i<tabTime.length; i++){

	if (tabTime[i]==ff){

		var xname = tabName[0];

		tabNom.splice(i, 0, xname);


	}
  }



var tab3 = tabTime.slice(-5);

var tab2 = tabNom.slice(-5);


if(tab3.length==1){
	document.getElementById("name1").innerHTML = tab2[0];
	document.getElementById("score1").innerHTML = tab3[0];
}else if(tab3.length==2){
	document.getElementById("name1").innerHTML = tab2[1];
	document.getElementById("score1").innerHTML = tab3[1];
	document.getElementById("name2").innerHTML = tab2[0];
	document.getElementById("score2").innerHTML = tab3[0];
}else if(tab3.length==3){
	document.getElementById("name1").innerHTML = tab2[2];
	document.getElementById("score1").innerHTML = tab3[2];
	document.getElementById("name2").innerHTML = tab2[1];
	document.getElementById("score2").innerHTML = tab3[1];
	document.getElementById("name3").innerHTML = tab2[0];
	document.getElementById("score3").innerHTML = tab3[0];
}else if(tab3.length==4){
	document.getElementById("name1").innerHTML = tab2[3];
	document.getElementById("score1").innerHTML = tab3[3];
	document.getElementById("name2").innerHTML = tab2[2];
	document.getElementById("score2").innerHTML = tab3[2];
	document.getElementById("name3").innerHTML = tab2[1];
	document.getElementById("score3").innerHTML = tab3[1];
	document.getElementById("name4").innerHTML = tab2[0];
	document.getElementById("score4").innerHTML = tab3[0];
}else if(tab3.length==5){
	document.getElementById("name1").innerHTML = tab2[4];
	document.getElementById("score1").innerHTML = tab3[4];
	document.getElementById("name2").innerHTML = tab2[3];
	document.getElementById("score2").innerHTML = tab3[3];
	document.getElementById("name3").innerHTML = tab2[2];
	document.getElementById("score3").innerHTML = tab3[2];
	document.getElementById("name4").innerHTML = tab2[1];
	document.getElementById("score4").innerHTML = tab3[1];
	document.getElementById("name5").innerHTML = tab2[0];
	document.getElementById("score5").innerHTML = tab3[0];
}else if(tab3.length==6){
	document.getElementById("name1").innerHTML = tab2[5];
	document.getElementById("score1").innerHTML = tab3[5];
	document.getElementById("name2").innerHTML = tab2[4];
	document.getElementById("score2").innerHTML = tab3[4];
	document.getElementById("name3").innerHTML = tab2[3];
	document.getElementById("score3").innerHTML = tab3[3];
	document.getElementById("name4").innerHTML = tab2[2];
	document.getElementById("score4").innerHTML = tab3[2];
	document.getElementById("name5").innerHTML = tab2[1];
	document.getElementById("score5").innerHTML = tab3[1];
	document.getElementById("name6").innerHTML = tab2[0];
	document.getElementById("score6").innerHTML = tab3[0];
}else if(tab3.length==7){
	document.getElementById("name1").innerHTML = tab2[6];
	document.getElementById("score1").innerHTML = tab3[6];
	document.getElementById("name2").innerHTML = tab2[5];
	document.getElementById("score2").innerHTML = tab3[5];
	document.getElementById("name3").innerHTML = tab2[4];
	document.getElementById("score3").innerHTML = tab3[4];
	document.getElementById("name4").innerHTML = tab2[3];
	document.getElementById("score4").innerHTML = tab3[3];
	document.getElementById("name5").innerHTML = tab2[2];
	document.getElementById("score5").innerHTML = tab3[2];
	document.getElementById("name6").innerHTML = tab2[1];
	document.getElementById("score6").innerHTML = tab3[1];
	document.getElementById("name7").innerHTML = tab2[0];
	document.getElementById("score7").innerHTML = tab3[0];
}else if(tab3.length==8){
	document.getElementById("name1").innerHTML = tab2[7];
	document.getElementById("score1").innerHTML = tab3[7];
	document.getElementById("name2").innerHTML = tab2[6];
	document.getElementById("score2").innerHTML = tab3[6];
	document.getElementById("name3").innerHTML = tab2[5];
	document.getElementById("score3").innerHTML = tab3[5];
	document.getElementById("name4").innerHTML = tab2[4];
	document.getElementById("score4").innerHTML = tab3[4];
	document.getElementById("name5").innerHTML = tab2[3];
	document.getElementById("score5").innerHTML = tab3[3];
	document.getElementById("name6").innerHTML = tab2[2];
	document.getElementById("score6").innerHTML = tab3[2];
	document.getElementById("name7").innerHTML = tab2[1];
	document.getElementById("score7").innerHTML = tab3[1];
	document.getElementById("name8").innerHTML = tab2[0];
	document.getElementById("score8").innerHTML = tab3[0];
}else if(tab3.length==9){
	document.getElementById("name1").innerHTML = tab2[8];
	document.getElementById("score1").innerHTML = tab3[8];
	document.getElementById("name2").innerHTML = tab2[7];
	document.getElementById("score2").innerHTML = tab3[7];
	document.getElementById("name3").innerHTML = tab2[6];
	document.getElementById("score3").innerHTML = tab3[6];
	document.getElementById("name4").innerHTML = tab2[5];
	document.getElementById("score4").innerHTML = tab3[5];
	document.getElementById("name5").innerHTML = tab2[4];
	document.getElementById("score5").innerHTML = tab3[4];
	document.getElementById("name6").innerHTML = tab2[3];
	document.getElementById("score6").innerHTML = tab3[3];
	document.getElementById("name7").innerHTML = tab2[2];
	document.getElementById("score7").innerHTML = tab3[2];
	document.getElementById("name8").innerHTML = tab2[1];
	document.getElementById("score8").innerHTML = tab3[1];
	document.getElementById("name9").innerHTML = tab2[0];
	document.getElementById("score9").innerHTML = tab3[0];
}else if(tab3.length==10){
	document.getElementById("name1").innerHTML = tab2[9];
	document.getElementById("score1").innerHTML = tab3[9];
	document.getElementById("name2").innerHTML = tab2[8];
	document.getElementById("score2").innerHTML = tab3[8];
	document.getElementById("name3").innerHTML = tab2[7];
	document.getElementById("score3").innerHTML = tab3[7];
	document.getElementById("name4").innerHTML = tab2[6];
	document.getElementById("score4").innerHTML = tab3[6];
	document.getElementById("name5").innerHTML = tab2[5];
	document.getElementById("score5").innerHTML = tab3[5];
	document.getElementById("name6").innerHTML = tab2[4];
	document.getElementById("score6").innerHTML = tab3[4];
	document.getElementById("name7").innerHTML = tab2[3];
	document.getElementById("score7").innerHTML = tab3[3];
	document.getElementById("name8").innerHTML = tab2[2];
	document.getElementById("score8").innerHTML = tab3[2];
	document.getElementById("name9").innerHTML = tab2[1];
	document.getElementById("score9").innerHTML = tab3[1];
	document.getElementById("name10").innerHTML = tab2[0];
	document.getElementById("score10").innerHTML = tab3[0];
}


var tabb = tabTime.reverse();
for(var i=0; i<tabb.length; i++){

	if (tabb[i]==ff){

		// var w = window.open('', '', 'width=300,height=2px');
        // w.document.write(`${xname} avez un score de ${ff} et vous etes a la position ${i+1} `);
        // w.focus();
		// setTimeout(function () { w.close(); }, 5000);
		var el = document.createElement("span");
     el.setAttribute("style","font-weight: bold; top:20%;left:20%;background-color:white;float-left; padding:5px; font-size:20px; width:50px");
     el.innerHTML = `<br> Bravo ${xname},<br> vous êtes classé en position ${i+1} <br> Vous avez tenu ${ff}`;
     setTimeout(function(){
      el.parentNode.removeChild(el);
     },10000);
     document.body.appendChild(el);

	}
  }

}

})();
var tabName = [];

function formContact_result() {

	var elem = document.getElementById("formContact__text");
	tabName.splice(0, 0, elem.value);
	document.getElementById("formContact__text").value = "";
	return tabName;

  }
