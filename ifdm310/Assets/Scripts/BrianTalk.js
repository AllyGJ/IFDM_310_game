#pragma strict

public var empty: Sprite;
public var brianChat: Sprite[];
 var talk = false;
 var repeat = true;

 var index = 1;

 private var cam : cameraMove;
 private var girl: GameObject;
 private var tim: GameObject;
 private var tAnim:Animator;
var lasers: GameObject[];
var lScripts: ShootLasers[];

 private var panToBrian = false;
 private var panToGirl = false;
 private var timDies = false;
 private var done = false;
 var removeTim = false;

 var nextTime = 0;

function Start () {
	cam = GameObject.Find("camera").GetComponent(cameraMove);
	girl = GameObject.Find("girl");
	tim = GameObject.Find("t1m");
	lasers = GameObject.FindGameObjectsWithTag("lazerBox");
	//laserScripts();

	tAnim = tim.GetComponent(Animator);
	GetComponent(SpriteRenderer).sprite = brianChat[0];
}

//private function laserScripts(){
//	var index = 0;
//	for(var l in lasers){
//		lScripts[index] = l.GetComponent(ShootLasers);
//		index++;
//	}
//}

function Update () {
	tAnim = tim.GetComponent(Animator);

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
			girl.GetComponent(GirlMove).setConveyor(true);
			//turnOnLazers();

		}

		panToGirl = false;
	}

	if(Input.GetKeyDown(KeyCode.Space)){
		if(talk && repeat){
			
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

				if(index == 10){
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
	cam.panCam(new Vector3(transform.position.x, camPos.y, camPos.z), 100);
}

private function showGirl(){
	var camPos = cam.getCamPos();
	yield WaitForSeconds(1);
	cam.zoomIn(60);	
	cam.panCam(new Vector3(girl.transform.position.x,girl.transform.position.y,camPos.z),100);
}

private function timExplodes(){
	
	//show him exploding
	tAnim.SetTrigger("explode");
	print("Tim Explodes");

	timDies = false;
	panToBrian = true;

	nextTime = Time.time + 10;
	removeTim=true;

}

private function stopExplosion(){
	tAnim.enabled = false;
	//Destroy(tim);
	tim.SetActive(false);
}

//private function turnOnLazers(){
//	for(var l in lScripts){
//		l.turnOnLasers(true);
//	}
//}

public function startTalk(val:boolean){
	talk = val;
	panToBrian = true;
	nextTime = Time.time + 5;
}

