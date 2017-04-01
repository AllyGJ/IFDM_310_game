#pragma strict

public static var instance = null;
public static var width:float;
public static var height:float;

var MinX: GameObject;
var MaxX: GameObject;
var MinY: GameObject;
var MaxY: GameObject;


 var leftBound: GameObject;
 var rightBound: GameObject;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	width = transform.localScale.x;
	height = transform.localScale.y;

	grabSceneBounds();

	grabCamBounds();

}

function Update () {
	grabCamBounds();
	grabSceneBounds();

	transform.localScale.x = width;
	transform.localScale.y = height;

}

private function grabCamBounds(){
	MinX = GameObject.Find("Bounds/minX");
	MaxX = GameObject.Find("Bounds/maxX");
	MinY = GameObject.Find("Bounds/minY");
	MaxY = GameObject.Find("Bounds/maxY");
}

private function grabSceneBounds(){
	leftBound = GameObject.Find("Bounds/leftBound");
	rightBound = GameObject.Find("Bounds/rightBound");
}
/************************ PUBLIC FUNCTIONS **********************************************************/

public function resizeFloor(x:float, y:float){
	width = x;
	height = y;
}


public function getLB()
{
	return leftBound;
	
}

public function getRB()
{
	
	return rightBound;
	
}
