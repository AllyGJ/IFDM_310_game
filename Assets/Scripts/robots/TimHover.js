#pragma strict

public var ob: GameObject;
private var y0:float;
private var amplitude = 0.7;
private var speed = 1.5;

private var timAnim: Animator;

function Start () {
	timAnim = GetComponent("Animator");
	y0 = transform.position.y;
}

function Update () {
	var hover = Mathf.Sin(speed*Time.time);
	//print(hover);
	transform.position.y = (y0 + amplitude * hover) + (ob.transform.position.y*0.75) ;

	timAnim.SetFloat("hover",hover);

}
