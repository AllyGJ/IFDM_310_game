#pragma strict


public static var instance = null;

public var deadWindow: GameObject;

private var level: NextLevel;
private var game: GamePlay;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);


}

function Start () {
	deadWindow.SetActive(false);
	level = GameObject.Find("GameManager").GetComponent(NextLevel);
	game = GameObject.Find("GameManager").GetComponent(GamePlay);
}
//
//function Update () {
//	
//}

/**********************************************************************/

public function show(val : boolean)
{
	deadWindow.SetActive(val);
	pause();
}

public function startOver(){
	show(false);
	level.restartLevel();
	unpause();

}

public function exit()
{

}

public function pause(){
	Time.timeScale = 0;
	game.disableScripts();
}

public function unpause(){
	Time.timeScale = 1;
	game.enableScripts();
}