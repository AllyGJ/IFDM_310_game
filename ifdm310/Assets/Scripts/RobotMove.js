#pragma strict

public var speed:float;
public var backNForth: boolean;
public var followPath: boolean;
public var touchList: Transform[];
public var currentTouch: Transform;
public var targetTouch: Transform;
public var beam1: GameObject;
public var beam2: GameObject;

private var touched = 1;
private var walking = true;
private var walkToLeft = true;
private var anim: Animator;
private var facingRight = false;

function Start () {
	anim = GetComponent(Animator);
	beam1.GetComponent.<Renderer>().enabled = false;
	beam2.GetComponent.<Renderer>().enabled = false;
}

function Update () {
	var moveH = Time.deltaTime * speed;

	//connects animation to horizontal speed of robot
	 anim.SetFloat("Speed", Mathf.Abs(moveH));

	if(transform.position != targetTouch.position)
	{
		if(targetTouch == null)
		{
			targetTouch = touchList[touched];
		}

	
		if(backNForth) simpleToNFro();
		else if(followPath) oneByOne();
	}

	if(transform.position.x < targetTouch.position.x && !facingRight)
         Flip();
     else if(transform.position.x > targetTouch.position.x && facingRight)
         Flip();

}


//Flips sprite across y-axis
function Flip()
 {
     facingRight = !facingRight;
     var theScale = transform.localScale;
     theScale.x *= -1;
     transform.localScale = theScale;
 }

 //Incremental path touches
 function simpleToNFro()
 {
 	var step = speed * Time.deltaTime;
 
	//Make robot move towards target
	transform.position = Vector3.MoveTowards(transform.position, targetTouch.position, step);
	

	//What happens when robot reaches target
	if(transform.position == targetTouch.position)
   	{    
   	    //If it gets to the pause target, robot pauses to scan room
    	if(targetTouch.CompareTag("scan")){
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

 //Circular path touches
 private function oneByOne()
{
	var step = speed * Time.deltaTime;
	transform.position = Vector3.MoveTowards(transform.position, targetTouch.position, step);

	if(transform.position == targetTouch.position){
		if(targetTouch.CompareTag("scan")){
   	 		scanRoom();
   	 	}
  
   	 	touched++;
   	 	if(touched == touchList.length) touched = 0;

   	 	currentTouch = targetTouch;
   	 	targetTouch = touchList[touched];
	}

}

private function scanRoom(){
	beam1.GetComponent.<Renderer>().enabled = true;
	beam2.GetComponent.<Renderer>().enabled = true;

	yield WaitForSeconds (5);

	beam1.GetComponent.<Renderer>().enabled = false;
	beam2.GetComponent.<Renderer>().enabled = false;
}
