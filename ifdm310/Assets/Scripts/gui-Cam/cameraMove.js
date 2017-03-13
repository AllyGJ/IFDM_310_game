#pragma strict

private var ob:GameObject;
private var minx: GameObject;
private var maxx: GameObject;
private var miny: GameObject;
private var maxy: GameObject;
private var MinX: float;
private var MaxX: float;
private var MinY: float;
private var MaxY: float;

function Start(){
	ob = GameObject.Find("girl");
	grabBounds();

}

function Update () {
	grabBounds();

	follow(ob);
	transform.position = new Vector3(
	Mathf.Clamp(transform.position.x,MinX,MaxX),
	Mathf.Clamp(transform.position.y,MinY,MaxY),
	transform.position.z);
}

function follow(ob:GameObject)
{
	transform.position.x = ob.transform.position.x;
	transform.position.y = ob.transform.position.y;
}

function grabBounds(){
	minx = GameObject.Find("Background/Floor/Bounds/minX");
	maxx = GameObject.Find("Background/Floor/Bounds/maxX");
	miny = GameObject.Find("Background/Floor/Bounds/minY");
	maxy = GameObject.Find("Background/Floor/Bounds/maxY");

	MinX = minx.transform.position.x;
	MaxX = maxx.transform.position.x;
	MinY = miny.transform.position.y;
	MaxY = maxy.transform.position.y;
}