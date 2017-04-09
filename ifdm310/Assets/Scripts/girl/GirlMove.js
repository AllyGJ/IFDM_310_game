#pragma strict

public var anim: Animator;
private var timTalk: TimTalk;

public var facingRight = true;
public var speed:float;
public var scale:float;

public var rb:Rigidbody2D;

private var moving = false;

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
}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");


	rb.velocity = new Vector2(moveH*speed, moveV*speed);

	if(Mathf.Abs(rb.velocity.x) > 0) anim.SetFloat("Speed",Mathf.Abs(rb.velocity.x));
	else if(Mathf.Abs(rb.velocity.y) > 0) anim.SetFloat("Speed",Mathf.Abs(rb.velocity.y));
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
 }
 /**********************************************************************/

 public function setGirlSpeed(hor:float, ver:float){
 	rb.velocity = new Vector2(hor, ver);
 	anim.SetFloat("Speed",0);
 }


