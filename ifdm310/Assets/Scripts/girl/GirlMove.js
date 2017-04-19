#pragma strict

public var anim: Animator;
private var timTalk: TimTalk;
private var deathWindow: CanvasManager;

public var facingRight = true;
public var speed:float;
public var scale:float;

public var rb:Rigidbody2D;

private var moving = false;
private var extra = 0;
private var conveyorMove = false;

public static var instance = null;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	rb = GetComponent.<Rigidbody2D>();	
	anim = GetComponent(Animator);
	timTalk = GameObject.Find("timBubble").GetComponent(TimTalk);
	deathWindow = GameObject.Find("canvas").GetComponent(CanvasManager);
}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");


	rb.velocity = new Vector2(moveH*speed + extra, moveV*speed);

//	if(Mathf.Abs(rb.velocity.x) > 0) anim.SetFloat("Speed",Mathf.Abs(rb.velocity.x));
//	else if(Mathf.Abs(rb.velocity.y) > 0) anim.SetFloat("Speed",Mathf.Abs(rb.velocity.y));
//	else anim.SetFloat("Speed",0);

	if(Mathf.Abs(moveH) > 0) anim.SetFloat("Speed",Mathf.Abs(rb.velocity.x));
	else if(Mathf.Abs(moveV) > 0) anim.SetFloat("Speed",Mathf.Abs(rb.velocity.y));
	else anim.SetFloat("Speed",0);



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

 function OnTriggerEnter2D(col:Collider2D){
 	if(col.gameObject.tag == "bossLevel"){
 		print("entering boss level");
 		timTalk.bossTalk(true);
 	}


	if(col.gameObject.tag == "Robot" || col.gameObject.tag == "lazerBeam")
	{
		print("DEAD");
		deathWindow.show(true);
	}

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


