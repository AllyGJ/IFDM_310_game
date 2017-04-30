#pragma strict

private var girl:GameObject;
private var t1m:GameObject;
private var cam:CameraMove;

private var followScript: TimFollow;
private var girlScript: GirlMove;

private var girlBubble: Animator;

private var timTalk: TimTalk;

private var brianTalk: BrianTalk;

private var scaredMeter: ScaredMeter;
private var doneScaredSpeech = false;





function Start () {
	
//	girl = GameObject.Find("girl");
//	t1m = GameObject.Find("t1m");
//	cam = GameObject.Find("camera").GetComponent(cameraMove);
//	girlBubble = GameObject.Find("girl/girlBubble").GetComponent(Animator);
//
//	timTalk = GameObject.Find("timBubble").GetComponent(TimTalk);
//
//
//	followScript = t1m.GetComponent(TimFollow);
//
//
//	girlScript = girl.GetComponent(GirlMove);
//
	//cam.zoomIn(50);

	brianTalk = GameObject.Find("BrianBubble").GetComponent(BrianTalk);
	brianTalk.startTalk(true);


}






