﻿#pragma strict

var anim: Animator;
var facingRight = false;
public var speed:float;

var touchList: Transform[];
private var touched = 1;

var currentTouch: Transform;
var targetTouch: Transform;

private var walkToLeft = true;
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

	//Make robot move towards target
	if(walking) transform.position = Vector3.MoveTowards(transform.position, targetTouch.position, step);

	//What happens when robot reaches target
	 if(transform.position == targetTouch.position)
    {    
   		//If it gets to the pause target, robot pauses to scan room
    	if(targetTouch == touchList[1]){
    		print("scanning room");
    	 	scanRoom();
    	 }

    	//Keeps track of which way the robot should be touching targets
    	//Goes 1, 2, 3, 2, 1, 2, 3, etc.
    	if(walkToLeft){
    		touched++;
    	}
    	else touched--;

    	//Checks for end targets and makes robot walk other direction
    	if(touched == touchList.length-1 || touched == 0) walkToLeft = !walkToLeft;

    	//Switches out targets once touched
        currentTouch = targetTouch;
        targetTouch = touchList[touched];

     }
}

function scanRoom(){
	walking = false;
	anim.SetFloat("Speed", 0.0);

	/* Once we have the light beam eye-scanner animation, it will go here */

	yield WaitForSeconds (8);
	walking = true;
}

//Flips sprite across y-axis
function Flip()
 {
     facingRight = !facingRight;
     var theScale = transform.localScale;
     theScale.x *= -1;
     transform.localScale = theScale;
 }
