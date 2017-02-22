#pragma strict

var anim: Animator;
var facingRight = true;
public var speed:float;
public var scale:float;

public var rb:Rigidbody2D;

private var moving = false;

function Start () {
	rb = GetComponent.<Rigidbody2D>();	
	//anim = GetComponent(Animator);
}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");
	//transform.Translate(moveH,moveV,0);


		
	rb.velocity = new Vector2(moveH*speed, moveV*speed);



	//Facing right way
     if(moveH < 0 && facingRight)
         Flip();
     else if(moveH > 0 && !facingRight)
         Flip();
}

function Flip()
 {
     facingRight = !facingRight;
     var theScale = transform.localScale;
     theScale.x *= -1;
     transform.localScale = theScale;
 }


