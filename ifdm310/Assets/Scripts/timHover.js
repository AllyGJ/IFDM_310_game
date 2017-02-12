#pragma strict

public var ob: GameObject;
private var y0:float;
private var amplitude = 0.7;
private var speed = 1.5;

function Start () {
	y0 = transform.position.y;
}

function Update () {
	transform.position.y = (y0 + amplitude * Mathf.Sin(speed*Time.time)) + ob.transform.position.y ;
}
