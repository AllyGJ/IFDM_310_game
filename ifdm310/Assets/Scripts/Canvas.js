#pragma strict

public static var instance = null;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);


}

function Start () {
	
}

function Update () {
	
}
