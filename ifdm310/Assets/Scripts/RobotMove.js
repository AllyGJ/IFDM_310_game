#pragma strict

var anim: Animator;
var facingRight = false;
public var speed:float;

var touchList: Transform[];
var touched = 0f;

var currentTouch: Transform;
var targetTouch: Transform;



function Start () {
	anim = GetComponent(Animator);
}

function Update () {
	var moveH = Time.deltaTime * speed;

	//Check which points touched
	if(transform.position != targetTouch.position)
	{
		if(targetTouch == null)
		{
			targetTouch = touchList[touched];
		}
		move();
	}

	//connects animation to horizontal speed of robot
	anim.SetFloat("Speed", Mathf.Abs(moveH));

	//Flips robot
     if(transform.position.x < 0 && !facingRight)
         Flip();
     else if(transform.position.x > 0 && facingRight)
         Flip();
}

function move()
{
	transform.position = Vector3.MoveTowards(transform.position, targetTouch.position, speed*Time.deltaTime);
	if(transform.position == targetTouch.position)
         {
           	currentTouch = targetTouch;
            targetTouch = touchList[touched];

            //facingRight = !facingRight;
            Flip();

            if(touched == 0) touched = 1;
            else touched = 0;

         }
}

function Flip()
 {
     facingRight = !facingRight;
     var theScale = transform.localScale;
     theScale.x *= -1;
     transform.localScale = theScale;
 }
