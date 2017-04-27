#pragma strict

private var ob:GameObject;

 var MinX: float;
 var MaxX: float;
 var MinY: float;
 var MaxY: float;

public static var instance: CameraMove = null;

public var current:Camera;
private var minFov = 35f;
private var medFov = 50f;
private var maxFov = 90f;
private var pan = false;

public var ready = false;
public var zoomO = false;
public var zoomI = false;


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

	if(!ready || zoomI) StartCoroutine("zoomIn",minFov);

	if(zoomO) StartCoroutine("zoomOut", medFov);

	if(!pan) follow(ob);
}

function follow(ob:GameObject)
{
	transform.position.x = Mathf.Clamp(ob.transform.position.x, MinX, MaxX);
	transform.position.y = Mathf.Clamp(ob.transform.position.y, MinY, MaxY);

}


private function grabBounds(){
	MinX = GameObject.Find("Bounds/minX").transform.position.x;
	MaxX = GameObject.Find("Bounds/maxX").transform.position.x;
	MinY = GameObject.Find("Bounds/minY").transform.position.y;
	MaxY = GameObject.Find("Bounds/maxY").transform.position.y;


}

public function zoomIn(min:float){
	yield WaitForSeconds(1);
	if(current.fieldOfView > min) current.fieldOfView -= 0.3;
	else if(current.fieldOfView <= min) ready = true;
	zoomI = false;
}

public function zoomOut(max:float){
	yield WaitForSeconds(.8);
	if(current.fieldOfView < max) current.fieldOfView += 0.3;
	zoomO = false;
}
/*****************************************************************************/

public function setZoomOut(val:boolean)
{
	zoomO = val;
}

public function setZoomIn(val:boolean)
{
	zoomI = val;
}

public function getCamStatus(){
	return ready;
}

public function panCam(newPos:Vector3, speed:int){
	pan = true;
	var step = speed*Time.deltaTime;
	//yield WaitForSeconds(1);
	transform.position = Vector3.MoveTowards(transform.position, newPos, step); 
}

public function stopPan()
{
	pan = false;
}

public function getCamPos(){
	return transform.position;
}

