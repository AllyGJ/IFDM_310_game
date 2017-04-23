#pragma strict

private var girl: GameObject;
private var t1m: GameObject;
private var leftBound: GameObject; //leftmost bound of a scene
private var rightBound: GameObject; //rightmost bound of a scene

private var scene: LoadScene; 
private var leftScene:String;
private var rightScene:String;
private var sceneNum = 0;
private var backwards = false;
private var lastLvl = false;

private var floorOb:floorManager;

private var spawn1:GameObject;
private var spawn2:GameObject;

private var currentScene: Scene;
private var newScene: boolean;

private var leaves:GameObject;
private var gears:GameObject;

var runGravel: AudioClip;
var runConcrete: AudioClip;
var timSounds : AudioClip;
var explosion : AudioClip;



function Start(){
	runGravel = LoadSound("runGravel.mp3");
	runConcrete = LoadSound("runConcrete.mp3");
	timSounds = LoadSound("timTalk.mp3");
	explosion = LoadSound("explosion.mp3");

	TimTalk.instance.setSound(timSounds);
	GirlMove.instance.setRunSound(runGravel);

	scene = GetComponent(LoadScene);
	leaves = GameObject.Find("canvas/Leaves");
	gears = GameObject.Find("canvas/Gears");
	gears.SetActive(false);

	girl=GameObject.Find("girl");
	t1m = GameObject.Find("t1m");


	floorOb = GameObject.Find("Floor").GetComponent(floorManager);
	leftBound = GameObject.Find("Bounds/leftBound");
	rightBound = GameObject.Find("Bounds/rightBound");
	

	leftScene = null;
	rightScene = "Street1";

	spawn1 = GameObject.Find("spawnPos1");
	spawn2 = GameObject.Find("spawnPos2");

	girl.transform.position = spawn1.transform.position;
	t1m.transform.position = spawn2.transform.position;

	currentScene = SceneManager.GetActiveScene();

}

@MenuItem("AssetDatabase/LoadAssetExample")
public static function LoadSound(name: String)
{
    return AssetDatabase.LoadAssetAtPath("Assets/Sounds/"+name, AudioClip) as AudioClip;
}

function Update () {

	leftBound = GameObject.Find("Bounds/leftBound");
	rightBound = GameObject.Find("Bounds/rightBound");
	spawn1 = GameObject.Find("spawnPos1");
	spawn2 = GameObject.Find("spawnPos2");

	if(leftScene != null && girl.transform.position.x < leftBound.transform.position.x){
		scene.loadScene(leftScene);	
		newScene = true;					  
	}

	else if(rightScene != null && girl.transform.position.x > rightBound.transform.position.x){
		scene.loadScene(rightScene);
		newScene = true;
	}

	if(newScene) StartCoroutine("changeScene");


}

function changeScene(){
	yield WaitForSeconds(.0001);
	currentScene = SceneManager.GetActiveScene();
	if(currentScene.name == leftScene ){
		backwards = true;			
		updateScenes();				
	}
	else if(currentScene.name == rightScene){
		backwards = false;
		updateScenes();
	}

	newScene = false;

}

function updateScenes(){

	if(currentScene.name == "Forest"){
		leftScene = null;
		rightScene = "Street1";
		leaves.SetActive(true);
		gears.SetActive(false);
		floorOb.resizeFloor(20,6);
		lastLvl = false;
		GirlMove.instance.setRunSound(runGravel);
	}
	else if(currentScene.name == "Street1"){
		leftScene = "Forest";
		rightScene = "FinalStage";
		leaves.SetActive(false);
		gears.SetActive(true);
		floorOb.resizeFloor(60,6);
		lastLvl = false;
		GirlMove.instance.setRunSound(runConcrete);
	}
	else if(currentScene.name == "FinalStage"){
		leftScene = "Street1";
		rightScene = null;
		leaves.SetActive(false);
		gears.SetActive(false);
		floorOb.resizeFloor(50,6);
		lastLvl = true;
	}


	if(backwards) {
		girl.transform.position.x = spawn2.transform.position.x;
		girl.transform.position.y = spawn2.transform.position.y;
		t1m.transform.position.x = spawn2.transform.position.x + 1;
		t1m.transform.position.y = spawn2.transform.position.y;
	}
	else {
		girl.transform.position.x = spawn1.transform.position.x;
		girl.transform.position.y = spawn1.transform.position.y;
		t1m.transform.position.x = spawn1.transform.position.x - 1;
		t1m.transform.position.y = spawn1.transform.position.y;
	}

}

/**************************************************************************/
public function getCurScene(){
	return SceneManager.GetActiveScene().name;
}

public function getLvl(){
	return lastLvl;
}

public function restartLevel()
{
	var meter = GameObject.Find("girl").GetComponent(ScaredMeter);
	meter.setMeter(99);

	girl.transform.position.x = spawn1.transform.position.x;
	girl.transform.position.y = spawn1.transform.position.y;
	t1m.transform.position.x = spawn1.transform.position.x - 1;
	t1m.transform.position.y = spawn1.transform.position.y;

}


public function getExplosion(){
	return explosion;
}


