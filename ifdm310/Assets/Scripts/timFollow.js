#pragma strict

public var objToFollow: GameObject;

private var offset = 4;

function Update () {
	follow(objToFollow);

}

function follow(ob:GameObject)
{
	transform.position.x = ob.transform.position.x + offset;
	transform.position.y = ob.transform.position.y + offset;
}
