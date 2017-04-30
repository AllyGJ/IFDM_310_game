#pragma strict
import UnityEngine.UI;

private var girl:GameObject;
private var t1m:GameObject;
private var cam:GameObject;

private var followScript: TimFollow;
public var girlScript: GirlMove;

private var girlBubble: Animator;
//private var timBubbleAnim: Animator;
private var timTalk: TimTalk;
private var levelManager: NextLevel;
private var brianTalk: BrianTalk;
private var startBrian = true;

private var scaredMeter: ScaredMeter;
private var doneScaredSpeech = false;

private var dialogue = true;
private var gameFirstStarted = true;

private var timer:float;



function Start () {
	//SoundManager.instance.SetAllVolume();

	levelManager = gameObject.GetComponent(NextLevel);
	girl = GameObject.Find("girl");
	t1m = GameObject.Find("t1m");
	cam = GameObject.Find("camera");
	timTalk = GameObject.Find("timBubble").GetComponent(TimTalk);


	followScript = t1m.GetComponent(TimFollow);
	followScript.enabled = false;

	girlScript = girl.GetComponent(GirlMove);
	girlScript.enabled = false;

	scaredMeter = girl.GetComponent(ScaredMeter);


}

function Update () {
	timer++;

	if(CameraMove.instance.getCamStatus()){
		if(dialogue) {
			
			t1m.transform.position = Vector3.Lerp(t1m.transform.position, new Vector3(girl.transform.position.x + 5,
																					t1m.transform.position.y + 2,
																					t1m.transform.position.z), 0.04);
			StartCoroutine("beginDialogue");

		}else if(!dialogue && gameFirstStarted){
			if(timTalk.introOver()) StartCoroutine("startGame");
		}


		if(levelManager.getLvl() && startBrian) {
			girlScript.enabled = false;
			followScript.enabled = false;
			scaredMeter.showBar(false);
			brianTalk = GameObject.Find("BrianBubble").GetComponent(BrianTalk);
			brianTalk.startTalk(true);
			startBrian = false;
		}

		checkForImpDiag();
		randomDialogue();
	
	}


}

function startGame(){
	yield WaitForSeconds(1);
	followScript.enabled = true;
	girlScript.enabled = true;
	scaredMeter.setGameStarted(true);
	CanvasManager.instance.menuButton.interactable = true;
	gameFirstStarted = false;
										
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


/************************************************************************/
public function enableScripts(){
	girlScript.enabled = true;
	scaredMeter.enabled = true;
}

public function disableScripts(){
	girlScript.enabled = false;
	scaredMeter.enabled = false;
}

public function girlScriptSwitch(on:boolean){
	girlScript.enabled = on;
}


