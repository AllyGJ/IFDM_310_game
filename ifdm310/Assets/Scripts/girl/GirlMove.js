#pragma strict


public var anim: Animator;
private var timTalk: TimTalk;
private var canvas: CanvasManager;

public var facingRight = true;
public var speed:float;
public var scale:float;

public var rb:Rigidbody2D;

private var moving = false;
private var extra = 0;
private var conveyorMove = false;

public static var instance: GirlMove = null;

private var sound : AudioSource;
var runSound: AudioClip;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	rb = GetComponent.<Rigidbody2D>();	
	anim = GetComponent(Animator);
	timTalk = GameObject.Find("timBubble").GetComponent(TimTalk);
	canvas = GameObject.Find("canvas").GetComponent(CanvasManager);
	runSound = GameManager.instance.GetComponent(NextLevel).LoadSound("runGravel.mp3");

}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");


	rb.velocity = new Vector2(moveH*speed + extra, moveV*speed);

//	sound.clip = runSound;

	SoundManager.instance.SetVolEffects(.5);

	if(Mathf.Abs(moveH) > 0) {
		anim.SetFloat("Speed",Mathf.Abs(rb.velocity.x));
		moving = true;
	}
	else if(Mathf.Abs(moveV) > 0){ 
		anim.SetFloat("Speed",Mathf.Abs(rb.velocity.y));
		moving = true;
	}
	else {
		anim.SetFloat("Speed",0);
		moving = false;
	}

	if(moving) {
		SoundManager.instance.playSingleGirl(runSound);
	}else SoundManager.instance.efxSource1.Stop();


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
 	if(col.gameObject.tag == "bossLevel"){
 		print("entering boss level");
 		timTalk.bossTalk(true);
 	}


	if(col.gameObject.tag == "Robot" || col.gameObject.tag == "lazerBeam" || col.gameObject.tag == "spikes")
	{
		print("DEAD");
		canvas.show(true);
	}


	if(col.gameObject.tag == "redbutton"){
		col.gameObject.GetComponent.<SpriteRenderer>().sprite = loadButtonImg();
		var door = GameObject.Find("Foreground/slantedDoor");
		door.transform.position.y += 10;
	}


}

function OnTriggerStay2D(col: Collider2D){
	if(conveyorMove){
		if(col.gameObject.tag == "fwd"){
			print("moving forwards");
			extra = 8;
		}


		if(col.gameObject.tag == "backwards"){
			print("moving backwards");
			extra = -8;
		}
	}
}

function OnTriggerExit2D(col:Collider2D){
	if(col.gameObject.tag == "fwd" || col.gameObject.tag == "backwards"){
		extra = 0;
	}

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



