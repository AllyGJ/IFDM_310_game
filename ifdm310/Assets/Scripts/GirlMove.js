#pragma strict

var anim: Animator;
var facingRight = true;
public var speed:float;

function Start () {
	
}

function Update () {
	var moveH = Input.GetAxis("Horizontal")*Time.deltaTime * speed;
	var moveV = Input.GetAxis("Vertical")*Time.deltaTime * speed;
	transform.Translate(moveH,moveV,0);



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

