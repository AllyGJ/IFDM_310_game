#pragma strict


public static var canvas = null;

public var deadWindow: GameObject;
public var deadOther: GameObject;
public var menu: GameObject;
public var settings: GameObject;
public var gameOver: GameObject;

private var deathByRobots = false;
private var deathByOther = false;

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
	gameOver.SetActive(false);

	level = GameObject.Find("GameManager").GetComponent(NextLevel);
	game = GameObject.Find("GameManager").GetComponent(GamePlay);
}
//
//function Update () {
//	
//}

/**********************************************************************/

public function show()
{
	deadWindow.SetActive(true);
	deathByRobots = true;
	pause();

}

public function showDieByOther(){
	deadOther.SetActive(true);
	deathByOther = true;
	pause();
}


public function startOver(){
	if(deathByRobots) deadWindow.SetActive(false);
	if(deathByOther) deadOther.SetActive(false);

	level.restartLevel();
	unpause();

}

public function exit()
{
	gameOver.SetActive(true);

	wait(5f);

	print("quiting now");
	Application.Quit();
}

function wait(secs: float){
	yield WaitForSeconds(secs);
}

public function pause(){
	Time.timeScale = 0;
	game.disableScripts();
}

public function unpause(){
	Time.timeScale = 1;
	game.enableScripts();
}