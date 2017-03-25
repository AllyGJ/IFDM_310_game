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

public static var instance = null;

public var current:Camera;
private var minFov = 45f;
private var maxFov = 90f;

public var ready = false;


function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start(){
	ob = GameObject.Find("girl");
	grabBounds();

	current.fieldOfView = maxFov;
	//current.fieldOfView = 45;
}

function Update () {
	grabBounds();

	transform.position = new Vector3(Mathf.Clamp(transform.position.x, MinX, MaxX),
									 Mathf.Clamp(transform.position.y, MinY, MaxY),
									 transform.position.z);

		zoom();
		follow(ob);
	

}

function follow(ob:GameObject)
{
	transform.position.x = ob.transform.position.x;
	transform.position.y = ob.transform.position.y;
}

function inBounds(pos: Vector3){
	return pos.x > MinX && pos.x < MaxX && pos.y > MinY && pos.y < MaxY;
}

function grabBounds(){
	MinX = GameObject.Find("Floor/Bounds/minX").transform.position.x;
	MaxX = GameObject.Find("Floor/Bounds/maxX").transform.position.x;
	MinY = GameObject.Find("Floor/Bounds/minY").transform.position.y;
	MaxY = GameObject.Find("Floor/Bounds/maxY").transform.position.y;

}

private function zoom(){
	yield WaitForSeconds(2);
	if(current.fieldOfView > minFov) current.fieldOfView-=0.2;
	else if(current.fieldOfView <= minFov) ready = true;
}

public function getCamStatus(){
	return ready;
}