#pragma strict

var anim: Animator;
var facingRight = false;
public var speed:float;

var touchList: Transform[];
var touched = 1;

var currentTouch: Transform;
var targetTouch: Transform;

var walkToLeft = true;
private var walking = true;


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
	if(walking) anim.SetFloat("Speed", Mathf.Abs(moveH));

	//Flips robot after it hits it's target
     if(transform.position.x <= targetTouch.position.x && !facingRight)
         Flip();
     else if(transform.position.x >= targetTouch.position.x && facingRight)
         Flip();
}

function move()
{
	var step = speed * Time.deltaTime;

	if(walking) transform.position = Vector3.MoveTowards(transform.position, targetTouch.position, step);


	 if(transform.position == targetTouch.position)
    {    

    	if(targetTouch == touchList[1]){
    		print("touched halfway");
    	 	scanRoom();
    	 }
    		
    	if(walkToLeft){
    		touched++;
    	}
    	else touched--;

    	if(touched == touchList.length-1 || touched == 0) walkToLeft = !walkToLeft;

        currentTouch = targetTouch;
        targetTouch = touchList[touched];

     }
}

function scanRoom(){
	walking = false;
	anim.SetFloat("Speed", 0.0);

	yield WaitForSeconds (8);
	walking = true;
}

function Flip()
 {
     facingRight = !facingRight;
     var theScale = transform.localScale;
     theScale.x *= -1;
     transform.localScale = theScale;
 }
