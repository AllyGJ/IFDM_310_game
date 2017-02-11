#pragma strict

private var y0:float;
private var amplitude = 0.5;
private var speed = 1;

function Start () {
	y0 = transform.position.y;
}

function Update () {
	transform.position.y = y0 + amplitude*Mathf.Sin(speed*Time.time);
}
