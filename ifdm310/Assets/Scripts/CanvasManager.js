#pragma strict


public static var canvas = null;

public var deadWindow: GameObject;
public var menu: GameObject;
public var settings: GameObject;

private var level: NextLevel;
private var game: GamePlay;

function Awake(){

	if(canvas == null) canvas = this;
	else if(canvas != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);


}

function Start () {
	deadWindow.SetActive(false);
	menu.SetActive(false);
	settings.SetActive(false);

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