#pragma strict

public var ob:GameObject;

function Update () {
	follow(ob);
}

function follow(ob:GameObject)
{
	transform.position.x = ob.transform.position.x;
	transform.position.y = ob.transform.position.y;
}