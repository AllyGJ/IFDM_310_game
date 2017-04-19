#pragma strict

private var girl: GameObject;
var girlLayer: String;

var laserBox:GameObject;
var laserBeam:GameObject;

private var min = 1.7f;
private var med = 2.4f;
private var max = 3.0f;

var startRot:float; 
var maxRot:float;
var minRot:float;

private var forward = true;
var bounds: Bounds;
var girlY: float;
var Ydiff:float;

var facingRight = true;

function Start () {
	girl = GameObject.Find("girl");

	startRot = laserBeam.transform.localRotation.z;
	maxRot = startRot + 0.2f;
	minRot = startRot - 0.2f;

	girlY = girl.transform.position.y;
	bounds = laserBeam.GetComponent.<Renderer>().bounds;

	//laserBeam.SetActive(false);

}

function Update () {
	girlLayer = girl.GetComponent.<Renderer>().sortingLayerName;
	var girlX = girl.transform.position.x;
	girlY = girl.transform.position.y;
	bounds = laserBeam.GetComponent.<Renderer>().bounds;


	//flip box and beam to side girl is on

	if(girlX < laserBox.transform.position.x && facingRight){
		flip(laserBox);
	}
	else if (girlX > laserBox.transform.position.x && !facingRight) {
		flip(laserBox);
	}
	

	//move laser with girl, but slower
	laserScale();
	laserMove();

}

function flip(ob1:GameObject){
	facingRight = !facingRight;

	var theScale1 = ob1.transform.localScale;
    theScale1.x *= -1;

    yield WaitForSeconds(.5);
    ob1.transform.localScale = theScale1;

}

function laserMove(){
	
	var rot = laserBeam.transform.localRotation.z;
	var move = 0.01;
	var lY = bounds.min.y;
	var diff = 0.05;

		if(forward){
			rot+=move;
			if(rot > maxRot) forward = false;
		}
		else{
			rot-=move;
			if(rot < minRot) forward = true;
		}

		laserBeam.transform.localRotation.z = rot;

	

	var newSize = girlY > lY ? bounds.size.y - diff : bounds.size.y + diff;
	laserBeam.transform.localScale.y *= newSize / bounds.size.y; 

}

function laserScale(){
	
	//var curScale = laserBeam.transform.localScale.y;








//		if(girlLayer == "Layer1"){
//			while(curScale < max) {
//				curScale+=0.01f;
//				laserBeam.transform.localScale.y = curScale;
//			}
// 		}
// 		else if(girlLayer == "Layer2"){
// 			while(curScale > med) {
// 				curScale-=0.01f;
// 				beam.transform.localScale.y = curScale;
// 			}
// 			while(curScale < med) {
// 				curScale+=0.01f;
// 				beam.transform.localScale.y = curScale;
// 			}
// 		}
// 		else if(girlLayer == "Layer3"){
// 			while(curScale > min) {
// 				curScale-=0.01f;
// 				beam.transform.localScale.y = curScale;
// 			}
// 		}
	
}

public function turnOnLasers(val:boolean){
	laserBeam.SetActive(val);
}