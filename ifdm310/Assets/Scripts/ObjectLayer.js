#pragma strict

public var girlCol: Collider2D;
private var gcY:float;

public var frontLayer: String;
public var backLayer: String;

public var obBox: Collider2D;
public var obEdge: EdgeCollider2D;
private var obColY:float;

function Start () {
	if(obBox == null) obColY = obEdge.bounds.center.y;
	else if(obEdge == null) obColY = obBox.bounds.center.y;
}

function Update () {
	gcY = girlCol.bounds.center.y;

	if(gcY > obColY) //Girl is behind
	{
		GetComponent.<Renderer>().sortingLayerName = frontLayer;
	}
	else //Girl is infront
	{
		GetComponent.<Renderer>().sortingLayerName = backLayer;
	}
}
