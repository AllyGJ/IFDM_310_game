#pragma strict

private var tim: GameObject;
private var girl: GameObject;

public static var instance = null;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	tim = GameObject.Find("t1m");
	girl = GameObject.Find("girl");
}

function Update () {
	transform.position.x = tim.transform.position.x;
	transform.position.y = girl.transform.position.y + 6;
}
