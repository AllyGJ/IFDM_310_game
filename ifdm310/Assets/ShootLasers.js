#pragma strict

private var girl: GameObject;

var laserBox:GameObject;
var laserBeam:GameObject;
private var laserBeamCol: Bounds;


var laserTarget:float;
var girlY: float;


var facingRight = true;

var laserOn = false;
var turnOn = false;

private var laserSound: AudioClip;

function Start () {
	girl = GameObject.Find("girl");
	laserSound = Resources.Load("Sounds/laserBeam") as AudioClip;

	girlY = girl.transform.position.y;
	laserTarget = girlY - (girl.GetComponent(BoxCollider2D).size.y + 4);

	laserBeamCol = laserBeam.GetComponent(CapsuleCollider2D).bounds;
	laserBeam.SetActive(false);

}

function Update () {
	var girlX = girl.transform.position.x;
	girlY = girl.transform.position.y;
	laserTarget = girlY - (girl.GetComponent(BoxCollider2D).size.y + 4);


	if(turnOn) flash();


	//flip box and beam to side girl is on
	if(girlX < laserBox.transform.position.x && facingRight){
		flip(laserBox);
	}
	else if (girlX > laserBox.transform.position.x && !facingRight) {
		flip(laserBox);
	}

}

function flash(){
	var secs = Random.Range(2,5);
	yield WaitForSeconds(secs);

	if(!laserOn){
		yield WaitForSeconds(2);
		SoundManager.instance.playLasers(laserSound);
		laserBeam.SetActive(true);
		laserOn = true;
	}

	if(laserOn){
		yield WaitForSeconds(2);
		SoundManager.instance.lasers.Stop();
		laserBeam.SetActive(false);
		laserOn = false;
	}


}

function flip(ob1:GameObject){
	facingRight = !facingRight;

	var theScale1 = ob1.transform.localScale;
    theScale1.x *= -1;

    yield WaitForSeconds(.5);
    ob1.transform.localScale = theScale1;

}


public function turnOnLasers(val:boolean){
	laserBeam.SetActive(val);
	turnOn = true;
}