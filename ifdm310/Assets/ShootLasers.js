#pragma strict

private var girl: GameObject;
var girlLayer: String;

var laserBox:GameObject;
var laserBeam:GameObject;
var laserBeamCol: Bounds;

private var min = 1.7f;
private var med = 2.4f;
private var max = 3.0f;

var startRot:float; 
var maxRot:float;
var minRot:float;

private var forward = true;
var bounds: Bounds;

var rot: float;
var laserTarget:float;
var girlY: float;
var Ydiff:float;

var facingRight = true;
var nextTime:float;

var laserOn = true;

function Start () {
	girl = GameObject.Find("girl");


	girlY = girl.transform.position.y;
	laserTarget = girlY - (girl.GetComponent(BoxCollider2D).size.y + 4);

	laserBeamCol = laserBeam.GetComponent(CapsuleCollider2D).bounds;
	laserBeam.SetActive(false);

}

function Update () {
	girlLayer = girl.GetComponent.<Renderer>().sortingLayerName;
	var girlX = girl.transform.position.x;
	girlY = girl.transform.position.y;
	laserTarget = girlY - (girl.GetComponent(BoxCollider2D).size.y + 4);


	nextTime = Time.time + 2;
	if(Time.time > nextTime && laserOn) {
		laserBeam.SetActive(true);
	}
	else {
		laserOn = false;
	}

	nextTime = Time.time + 2;
	if(Time.time > nextTime && !laserOn) {
		laserBeam.SetActive(false);
	}
	else {
		laserOn = true;
	}


	//flip box and beam to side girl is on
	if(girlX < laserBox.transform.position.x && facingRight){
		flip(laserBox);
	}
	else if (girlX > laserBox.transform.position.x && !facingRight) {
		flip(laserBox);
	}
	



}

function flash(){
	if(Time.time > nextTime) {
		laserBeam.SetActive(true);

	}

	nextTime = Time.time + Random.Range(3,5);

	if(Time.time > nextTime) {
		laserBeam.SetActive(false);
		//nextTime = Time.time + Random.Range(3,5);
	}

//	yield WaitForSeconds(Random.Range(2,5));
//	laserBeam.SetActive(true);
//
//	yield WaitForSeconds(Random.Range(2,5));
//	laserBeam.SetActive(false);
}

function flip(ob1:GameObject){
	facingRight = !facingRight;

	var theScale1 = ob1.transform.localScale;
    theScale1.x *= -1;

    yield WaitForSeconds(.5);
    ob1.transform.localScale = theScale1;

}

function laserMove(){
	
	rot = laserBeam.transform.localRotation.z;
	var move = 0.01;
	var lY = bounds.min.y;
	var diff = 0.1;

	laserTarget = girlY - (girl.GetComponent(BoxCollider2D).size.y + 4);
//
//		if(forward){
//			rot+=move;
//			if(rot > maxRot) forward = false;
//		}
//		else{
//			rot-=move;
//			if(rot < minRot) forward = true;
//		}
//
//		laserBeam.transform.localRotation.z = rot;

	if(girlClose(3)){
		var newSize = laserTarget > lY ? bounds.size.y - diff : bounds.size.y + diff;
		laserBeam.transform.localScale.y *= newSize / bounds.size.y; 

//		if(rot < girlY && forward){
//			rot+=move;
//			if(rot >= maxRot) forward = false;
//		}
//		else if(rot >= girlY && !forward){
//			rot-=move;
//			if(rot <= minRot) forward = true;
//		}

		var c = Mathf.Abs((laserTarget + transform.position.x)/100);
		print(c);
		laserBeam.transform.localRotation.z = Mathf.Clamp(c, minRot, maxRot);
		 
	}



}

function girlClose(diff: int){
	return (girlY > transform.position.x - diff) || (girlY < transform.position.x + diff);
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