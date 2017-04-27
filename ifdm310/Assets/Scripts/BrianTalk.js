#pragma strict

public var empty: Sprite;
public var brianChat: Sprite[];
 var talk = false;
 var repeat = true;

 var index = 1;

 private var cam : CameraMove;
 private var girl: GameObject;
 private var tim: GameObject;
 private var tAnim:Animator;


 private var panToBrian = false;
 private var panToGirl = false;
 private var timDies = false;
 private var done = false;
 private var removeTim = false;
 var laserBoxs: GameObject[];
 private var laserOn = false;

 private var explosion: AudioClip;
 private var brianSpeak : AudioClip;
 private var music3 : AudioClip;

 var nextTime = 0;

function Start () {
	explosion = LoadSound("explosion");
	brianSpeak = LoadSound("brianSpeak");
	SoundManager.instance.changeRobotVol(.2);

	music3 = LoadSound("BossBattle");

	cam = GameObject.Find("camera").GetComponent(CameraMove);
	girl = GameObject.Find("girl");
	tim = GameObject.Find("t1m");
	laserBoxs = GameObject.FindGameObjectsWithTag("lazerBox");



	tAnim = tim.GetComponent(Animator);
	GetComponent(SpriteRenderer).sprite = brianChat[0];
}

public static function LoadSound(name: String)
{
    return Resources.Load("Sounds/"+name) as AudioClip;
}


function Update () {
	

	if(panToBrian && Time.time < nextTime){
		showBrian();
	}
	else{
		//looking at brian
		panToBrian = false;
		talk = true;
	}

	if(panToGirl && Time.time < nextTime){
		showGirl();
	}
	else{
		//Looking at girl
		if(timDies){
			GetComponent(SpriteRenderer).sprite = brianChat[index];
			index = 11;

			timExplodes();
		
		}

		if(removeTim && Time.time > nextTime){
			stopExplosion();
			nextTime = Time.time + 5;
		}

		if(done){ 
			cam.stopPan();
			GirlMove.instance.setConveyor(true);
			if(!laserOn){
				for(var l in laserBoxs){
					l.GetComponent(ShootLasers).turnOnLasers(true);
				}
				laserOn = true;
			}
		}

		panToGirl = false;
	}

	if(Input.GetKeyDown(KeyCode.Space)){
		if(talk && repeat){
			SoundManager.instance.playMainRobot(brianSpeak);
			if(index >= brianChat.length) {
				GetComponent(SpriteRenderer).sprite = empty;
				index = 0;
				talk = false;
				repeat = false;
				panToGirl = true;
				done = true;
				nextTime = Time.time + 5;

			}else{
				GetComponent(SpriteRenderer).sprite = brianChat[index];
				index++;

				if(index == 11){
					talk = false;
					timDies = true;
					panToGirl = true;
					nextTime = Time.time + 5;
				}
			}
		}
	}
}

private function showBrian(){
	var camPos = cam.getCamPos();
	yield WaitForSeconds(1);
	cam.zoomOut(90);
	cam.panCam(new Vector3(transform.position.x, transform.position.y - 5, camPos.z), 90);
}

private function showGirl(){
	SoundManager.instance.mainRobot.Stop();
	var camPos = cam.getCamPos();
	yield WaitForSeconds(1);
	cam.zoomIn(75);	
	cam.panCam(new Vector3(girl.transform.position.x, girl.transform.position.y,camPos.z),90);
}

private function timExplodes(){
	tAnim = tim.GetComponent(Animator);
	//show him exploding
	tAnim.SetTrigger("explode");
	SoundManager.instance.playBreakable(explosion);
	print("Tim Explodes");

	timDies = false;
	panToBrian = true;

	nextTime = Time.time + 10;
	removeTim=true;

}

private function stopExplosion(){
	tAnim.enabled = false;
	SoundManager.instance.explosions.Stop();
	tim.SetActive(false);
}

/*************************************************************/

public function startTalk(val:boolean){
	talk = val;
	panToBrian = true;
	nextTime = Time.time + 5;
}

