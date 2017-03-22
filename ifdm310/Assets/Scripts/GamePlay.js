#pragma strict

private var girl:GameObject;
private var t1m:GameObject;
private var cam:GameObject;

private var followScript: TimFollow;
private var girlScript: GirlMove;
private var girlBubble: Speech;
private var timBubble: Speech;
private var scaredMeter: ScaredMeter;

private var dialogue = true;

function Start () {
	girl = GameObject.Find("girl");
	t1m = GameObject.Find("t1m");
	cam = GameObject.Find("camera");
	girlBubble = GameObject.Find("canvas/girlBubble").GetComponent(Speech);
	timBubble = GameObject.Find("canvas/timBubble").GetComponent(Speech);

	followScript = t1m.GetComponent(TimFollow);
	followScript.enabled = false;

	girlScript = girl.GetComponent(GirlMove);
	girlScript.enabled = false;

	scaredMeter = girl.GetComponent(ScaredMeter);


}

function Update () {
	if(cam.GetComponent(cameraMove).getCamStatus()){
		if(dialogue) {
			callForMom();
			beginDialogue();

			//dialogue = false;
		}

		t1m.transform.position = Vector3.Lerp(t1m.transform.position, new Vector3(girl.transform.position.x + 5,
																					t1m.transform.position.y + 2,
																					t1m.transform.position.z), 0.02);
	}

}

function startGame(){
																
}

function wait(secs:float){
	yield WaitForSeconds(secs);
}

function callForMom(){
	wait(2);
	girlBubble.show(true);
	girlBubble.changeText("Mom?");
	girlBubble.changeLocation(girl.transform.position.x + 1, girl.transform.position.y + 2);
	wait(3);
	girlBubble.show(false);
}

function beginDialogue(){
	wait(1);	
	timBubble.fontSize(20);
	timBubble.changeText("Oh dear, why did you have to show up?");
	timBubble.changeLocation(t1m.transform.position.x - 1, t1m.transform.position.y + 3);

//	wait(2);
//	girlBubble.show(true);
//	girlBubble.changeText(" ... ");
//	wait(2);
	//girlBubble.changeText("");


}
