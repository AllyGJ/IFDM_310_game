#pragma strict

private var girl:GameObject;
private var t1m:GameObject;
private var cam:GameObject;

private var followScript: TimFollow;
private var girlScript: GirlMove;

private var girlBubble: Animator;
//private var timBubbleAnim: Animator;
private var timTalk: TimTalk;
private var levelManager: NextLevel;

private var scaredMeter: ScaredMeter;
private var doneScaredSpeech = false;

private var dialogue = true;

private var timer:float;

function Start () {
	levelManager = this.GetComponent(NextLevel);
	girl = GameObject.Find("girl");
	t1m = GameObject.Find("t1m");
	cam = GameObject.Find("camera");
	girlBubble = GameObject.Find("girl/girlBubble").GetComponent(Animator);
	//timBubbleAnim = GameObject.Find("timBubble").GetComponent(Animator);
	timTalk = GameObject.Find("timBubble").GetComponent(TimTalk);


	followScript = t1m.GetComponent(TimFollow);
	followScript.enabled = false;

	girlScript = girl.GetComponent(GirlMove);
	girlScript.enabled = false;

	scaredMeter = girl.GetComponent(ScaredMeter);

	//timBubbleAnim.enabled = false;

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
			if(timTalk.introOver()) StartCoroutine("startGame");
		}

		if(levelManager.getCurScene == "FinalStage") scaredMeter.showBar(false);

		checkForImpDiag();
		randomDialogue();



	}

}

function startGame(){
	followScript.enabled = true;
	girlScript.enabled = true;
	scaredMeter.setGameStarted(true);										
}

function beginDialogue(){
	yield WaitForSeconds(5);
	dialogue = false;

	yield;
}

function randomDialogue()
{
	if(scaredMeter.getMeterDialogue()) {
		timTalk.scaredTalk(true);
	}



}

function checkForImpDiag(){
	if(timTalk.getLevelFlag()){
		girlScript.setGirlSpeed(0,0);
		girlScript.enabled = false;
		scaredMeter.setGameStarted(false);
	}
}




