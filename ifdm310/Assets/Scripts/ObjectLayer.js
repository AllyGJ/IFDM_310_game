#pragma strict

public var girlCol: Collider2D;
private var gcY:float;

public var frontLayer: String;
public var backLayer: String;

private var obColY:float;

function Start () {
	obColY = GetComponent.<Collider2D>().bounds.center.y;
}

function Update () {
	gcY = girlCol.GetComponent.<Collider2D>().bounds.center.y;

	if(gcY > obColY) //Girl is behind
	{
		GetComponent.<Renderer>().sortingLayerName = frontLayer;
	}
	else //Girl is infront
	{
		GetComponent.<Renderer>().sortingLayerName = backLayer;
	}
}
