#pragma strict

private var girl:GameObject;
private var t1m:GameObject;
private var cam:GameObject;

private var followScript: TimFollow;
private var girlScript: GirlMove;
private var girlBubble: Animator;
private var timBubble: Animator;
private var scaredMeter: ScaredMeter;

private var dialogue = true;

private var timer:float;

function Start () {
	girl = GameObject.Find("girl");
	t1m = GameObject.Find("t1m");
	cam = GameObject.Find("camera");
	girlBubble = GameObject.Find("girl/girlBubble").GetComponent(Animator);
	timBubble = GameObject.Find("t1m/timBubble").GetComponent(Animator);

	followScript = t1m.GetComponent(TimFollow);
	followScript.enabled = false;

	girlScript = girl.GetComponent(GirlMove);
	girlScript.enabled = false;

	scaredMeter = girl.GetComponent(ScaredMeter);


}

function Update () {
	timer++;

	if(cam.GetComponent(cameraMove).getCamStatus()){
		if(dialogue) {
			
			t1m.transform.position = Vector3.Lerp(t1m.transform.position, new Vector3(girl.transform.position.x + 5,
																					t1m.transform.position.y + 2,
																					t1m.transform.position.z), 0.02);
			StartCoroutine("beginDialogue");

		}else{

			StartCoroutine("startGame");
		}

		randomDialogue();
	}

}

function startGame(){
	yield WaitForSeconds(35);
	followScript.enabled = true;
	girlScript.enabled = true;
	scaredMeter.setGameStarted(true);												
}

function beginDialogue(){
	girlBubble.SetBool("mom",true);
	yield WaitForSeconds(5);
	dialogue = false;

	girlBubble.SetBool("mom",false);
	timBubble.SetBool("intro",true);


	yield WaitForSeconds(20);
	timBubble.SetBool("intro",false);
	dialogue = false;
	yield;
}

function randomDialogue()
{
	if(scaredMeter.getMeterDialogue()) timBubble.SetBool("scared",true);
	else timBubble.SetBool("scared",false);
}

function wait(secs:float){
	yield WaitForSeconds(secs);
}

