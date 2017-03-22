#pragma strict

public static var instance = null;
public static var width:float;
public static var height:float;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	width = transform.localScale.x;
	height = transform.localScale.y;
}

function Update () {
	transform.localScale.x = width;
	transform.localScale.y = height;
}

function resizeFloor(x:float, y:float){
	width = x;
	height = y;
}