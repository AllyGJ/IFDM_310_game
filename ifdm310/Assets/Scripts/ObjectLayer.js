#pragma strict

public var girlCol: Collider2D;
private var gcY:float;

public var frontLayer: String;
public var backLayer: String;

public var obBox: Collider2D;
public var obEdge: EdgeCollider2D;
public var obPoly: PolygonCollider2D;

private var obColY:float;

function Start () {
	if(obBox == null && obPoly == null) obColY = obEdge.bounds.center.y;
	else if(obEdge == null && obPoly == null) obColY = obBox.bounds.center.y;
	else if(obBox == null && obEdge == null) obColY = obPoly.bounds.extents.y;
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
