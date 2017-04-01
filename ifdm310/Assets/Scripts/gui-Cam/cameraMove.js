#pragma strict

private var ob:GameObject;

 var MinX: float;
 var MaxX: float;
 var MinY: float;
 var MaxY: float;

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

	if(!ready) StartCoroutine("zoom");

	follow(ob);

}

function follow(ob:GameObject)
{
	transform.position.x = Mathf.Clamp(ob.transform.position.x, MinX, MaxX);
	transform.position.y = Mathf.Clamp(ob.transform.position.y, MinY, MaxY);

//	transform.position.x = ob.transform.position.x;
//	transform.position.y = ob.transform.position.y;
}


private function grabBounds(){
	MinX = GameObject.Find("Bounds/minX").transform.position.x;
	MaxX = GameObject.Find("Bounds/maxX").transform.position.x;
	MinY = GameObject.Find("Bounds/minY").transform.position.y;
	MaxY = GameObject.Find("Bounds/maxY").transform.position.y;


}

private function zoom(){
	yield WaitForSeconds(2);
	if(current.fieldOfView > minFov) current.fieldOfView -= 0.2;
	else if(current.fieldOfView <= minFov) ready = true;
}

public function getCamStatus(){
	return ready;
}



