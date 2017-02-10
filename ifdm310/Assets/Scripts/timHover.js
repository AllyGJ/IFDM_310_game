#pragma strict

public var hoverY: float;

function Start () {
	
}

function Update () {
	hover();
}

function hover(){
	transform.position.y += hoverY;
	yield WaitForSeconds (1);
	transform.position.y -= hoverY;
	yield WaitForSeconds (1);
}