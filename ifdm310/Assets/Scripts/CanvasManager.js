#pragma strict

public static var instance = null;

public var deadWindow: GameObject;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);


}

function Start () {
	deadWindow.SetActive(false);
}

function Update () {
	
}


public function showDeathWindow(val : boolean)
{
	deadWindow.SetActive(val);
}

public function startOver(){

}

public function exit()
{

}