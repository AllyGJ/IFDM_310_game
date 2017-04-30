#pragma strict


public var anim: Animator;
private var timTalk: TimTalk;
private var tim: GameObject;
private var bubble: GameObject;
private var canvas: CanvasManager;

public var facingRight = true;
public var speed:float;
public var scale:float;

public var rb:Rigidbody2D;

private var moving = false;
private var extra = 0;
private var conveyorMove = false;
private var brianDead = false;
private var hvntTalked = true;

public static var instance: GirlMove = null;

private var sound : AudioSource;
private var runSound: AudioClip;
private var buttonDown: AudioClip;
private var glassBreak: AudioClip;
private var conveyor: AudioClip;

private var removedTim = false; 



function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	
	rb = GetComponent.<Rigidbody2D>();	
	anim = GetComponent(Animator);
	tim = GameObject.Find("t1m");
 	bubble = GameObject.Find("timBubble");
	timTalk = GameObject.Find("timBubble").GetComponent(TimTalk);
	canvas = GameObject.Find("canvas").GetComponent(CanvasManager);
	glassBreak = Resources.Load("Sounds/glassBreak") as AudioClip;
	buttonDown =  Resources.Load("Sounds/buttonPress") as AudioClip;
	runSound =  Resources.Load("Sounds/runGravel") as AudioClip;
	conveyor =  Resources.Load("Sounds/conveyor") as AudioClip;


}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");


	rb.velocity = new Vector2(moveH*speed + extra, moveV*speed);

	if(Mathf.Abs(moveH) > 0 && Mathf.Abs(moveV) > 0){
		anim.SetFloat("Speed",Mathf.Abs(rb.velocity.x));
		moving = true;
	}
	else if(Mathf.Abs(moveH) > 0 && Mathf.Abs(moveV) == 0) {
		anim.SetFloat("Speed",Mathf.Abs(rb.velocity.x));
		moving = true;
	}
	else if(Mathf.Abs(moveH) == 0 && Mathf.Abs(moveV) > 0){ 
		anim.SetFloat("Speed",Mathf.Abs(rb.velocity.y));
		moving = true;
	}
	else {
		anim.SetFloat("Speed",0);
		moving = false;
	}

	if(moving) {
		SoundManager.instance.playGirl(runSound);
	}else SoundManager.instance.girlSound.Stop();


	//Facing right way
    if(moveH > 0 && facingRight){
    	anim.SetBool("facingRight", facingRight);
        Flip();
    }
    else if(moveH < 0 && !facingRight){
    	anim.SetBool("facingRight", facingRight);
        Flip();
    }
}

function Flip()
 {
     facingRight = !facingRight;
 }

 function loadButtonImg(){
    var button: Sprite[] = Resources.LoadAll.<Sprite>("redButton");
    return button[1];
 }

 function OnTriggerEnter2D(col:Collider2D){
 	if(col.gameObject.tag == "news1"){
 		CanvasManager.instance.flyer1.SetActive(true);
 	}
 	if(col.gameObject.tag == "news2"){
 		CanvasManager.instance.flyer2.SetActive(true);
 	}
 	if(col.gameObject.tag == "news3"){
 		CanvasManager.instance.flyer3.SetActive(true);
 	}

 	if(col.gameObject.tag == "bossLevel" && !facingRight && hvntTalked){

 			SoundManager.instance.girlSound.Stop();
 			timTalk.bossTalk(true);
 			hvntTalked = false;
 		
 	}


	if(col.gameObject.tag == "Robot" || col.gameObject.tag == "roboScan")
	{
		SoundManager.instance.StopSounds();
		canvas.show();
	}

	if(col.gameObject.tag == "lazerBeam" || col.gameObject.tag == "spikes"){
		SoundManager.instance.StopSounds();
		canvas.showDieByOther();
	}


	if(col.gameObject.tag == "redbutton"){
		SoundManager.instance.changeExplVol(0.8);
		SoundManager.instance.playBreakable(buttonDown);
		col.gameObject.GetComponent.<SpriteRenderer>().sprite = loadButtonImg();
		yield WaitForSeconds(1f);
		var brian = GameObject.Find("Brian");
		brian.GetComponent.<SpriteRenderer>().sprite = Resources.Load.<Sprite>("Brian_Broken");
		if(!brianDead){
			SoundManager.instance.playBreakable(glassBreak);
		}

		brianDead = true;
	}


	if(brianDead) {
		finalCutScene();
	}



}

function OnTriggerStay2D(col: Collider2D){

	if(conveyorMove){
		SoundManager.instance.playConveyor(conveyor);
		if(col.gameObject.tag == "fwd"){
			extra = 8;
		}


		if(col.gameObject.tag == "backwards"){
			extra = -8;
		}
	}
}

function OnTriggerExit2D(col:Collider2D){
	if(col.gameObject.tag == "news1"){
 		CanvasManager.instance.flyer1.SetActive(false);
 	}
 	if(col.gameObject.tag == "news2"){
 		CanvasManager.instance.flyer2.SetActive(false);
 	}
 	if(col.gameObject.tag == "news3"){
 		CanvasManager.instance.flyer3.SetActive(false);
 	}

	if(col.gameObject.tag == "fwd" || col.gameObject.tag == "backwards"){
		extra = 0;
		SoundManager.instance.fadeOut(SoundManager.instance.conveyors);
	}

}

function finalCutScene(){
	yield WaitForSeconds(2);
	var laserBoxs:GameObject[] =  GameObject.FindGameObjectsWithTag("lazerBox");
	for(var l in laserBoxs){
		l.GetComponent(ShootLasers).turnOnLasers(false);
		SoundManager.instance.lasers.mute = true;
	}
	SoundManager.instance.StopSounds();

	var objects = GameObject.FindObjectsOfType(GameObject);
 	for (var o : GameObject in objects) {
 		if(o.tag != "soundMan" && o.tag != "menuC") Destroy(o.gameObject);
 	}
 	//delete tim and his bubble
 	if(!removedTim){
 		tim.SetActive(true);
 		bubble.SetActive(true);

 		Destroy(tim);
 		Destroy(bubble);
 		removedTim = true;
 	}

	GameManager.instance.GetComponent(LoadScene).loadScene("CutScene2");
}
 /**********************************************************************/

 public function setGirlSpeed(hor:float, ver:float){
 	rb.velocity = new Vector2(hor, ver);
 	anim.SetFloat("Speed",0);
 }

 public function setConveyor(val:boolean){
 	conveyorMove = val;
 }

 public function setRunSound(clip: AudioClip){
 	runSound = clip;
 }



