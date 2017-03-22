#pragma strict

public var anim: Animator;
public var rightImg: Sprite;
public var leftImg: Sprite;

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
	GetComponent(SpriteRenderer).sprite = rightImg;
	anim = GetComponent(Animator);
}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");


	rb.velocity = new Vector2(moveH*speed, moveV*speed);


	anim.SetFloat("SpeedH",Mathf.Abs(rb.velocity.x));
	anim.SetFloat("SpeedV",Mathf.Abs(rb.velocity.y));


	//Facing right way
    if(moveH > 0 && facingRight){
    //	GetComponent(SpriteRenderer).sprite = rightImg;
    	anim.SetBool("facingRight", facingRight);
        Flip();
    }
    else if(moveH < 0 && !facingRight){
    	anim.SetBool("facingRight", facingRight);
     	//GetComponent(SpriteRenderer).sprite = leftImg;
        Flip();
    }
}

function Flip()
 {
     facingRight = !facingRight;
//     var theScale = transform.localScale;
//     theScale.x *= -1;
//     transform.localScale = theScale;
     //GetComponent(SpriteRenderer).flipX = true;
 }


