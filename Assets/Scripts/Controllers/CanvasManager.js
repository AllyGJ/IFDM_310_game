#pragma strict


public static var instance:CanvasManager = null;

public var deadWindow: GameObject;
public var deadOther: GameObject;
public var tooScared: GameObject;
public var menu: GameObject;
public var settings: GameObject;
public var gameOver: GameObject;

public var flyer1: GameObject;
public var flyer2: GameObject;
public var flyer3: GameObject;

public var menuButton: Button;
public var cont: Button;
public var ss: Button;
public var redo: Button;
public var quit: Button;

public var musicToggle: Toggle;
public var musicSlider: Slider;
public var submitMusic: Button;

private var deathByRobots = false;
private var deathByOther = false;
private var deathScared = false;

private var level: NextLevel;
private var game: GamePlay;

private var tim: GameObject;
private var bubble: GameObject;
private var restart = false;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);


}

function Start () {
	tim = GameObject.Find("t1m");
	bubble = GameObject.Find("timBubble");

	deadWindow.SetActive(false);
	menu.SetActive(false);
	settings.SetActive(false);
	gameOver.SetActive(false);
	tooScared.SetActive(false);

	menuButton.interactable = false;

	level = GameObject.Find("GameManager").GetComponent(NextLevel);
	game = GameObject.Find("GameManager").GetComponent(GamePlay);

}

function Update () {
	menuButton.onClick.AddListener( function() { MenuController.instance.openWindow(menu);});

	cont.onClick.AddListener( function() { MenuController.instance.closeWindow(menu,true);});

	ss.onClick.AddListener( function() { MenuController.instance.openWindow(settings);});
	ss.onClick.AddListener( function() { MenuController.instance.closeWindow(menu,false);});

	redo.onClick.AddListener( function() { MenuController.instance.closeWindow(menu,true);});

	quit.onClick.AddListener( function() { MenuController.instance.openWindow(menu);});

	musicToggle.onValueChanged.AddListener( function() {MenuController.instance.setMusic(musicToggle);});

	musicSlider.onValueChanged.AddListener( function() {MenuController.instance.setVolume(musicSlider);});

	submitMusic.onClick.AddListener( function() { MenuController.instance.closeWindow(settings,false);});
	submitMusic.onClick.AddListener( function() { MenuController.instance.openWindow(menu);});


}

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

public function showScared()
{
	tooScared.SetActive(true);
	deathScared = true;
	pause();
}


public function startOver(){
	if(deathByRobots) deadWindow.SetActive(false);
	if(deathByOther) deadOther.SetActive(false);
	if(deathScared) tooScared.SetActive(false);

	level.restartLevel();
	unpause();
	SoundManager.instance.StartSounds();

}

public function exit()
{
	gameOver.SetActive(true);

	cleanUp();

	//Application.Quit();
}

function cleanUp(){
	var objects = GameObject.FindObjectsOfType(GameObject);
 	for (var o : GameObject in objects) {
 		Destroy(o.gameObject);
 	}

 	if(SceneManager.GetActiveScene().name == "FinalStage"){
 		tim.SetActive(true);
 		bubble.SetActive(true);

 		Destroy(tim);
 		Destroy(bubble);
 	}

 	Time.timeScale = 1;
 	GameManager.instance.GetComponent(LoadScene).loadScene("StartMenu");

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