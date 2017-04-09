#pragma strict


public static var instance = null;

public var deadWindow: GameObject;

private var level: NextLevel;


function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);


}

function Start () {
	deadWindow.SetActive(false);
	level = GameObject.Find("GameManager").GetComponent(NextLevel);
}
//
//function Update () {
//	
//}

/**********************************************************************/

public function show(val : boolean)
{
	deadWindow.SetActive(val);
}

public function startOver(){
	show(false);
	level.restartLevel();

}

public function exit()
{

}