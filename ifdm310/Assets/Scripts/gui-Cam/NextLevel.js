#pragma strict

private var girl: GameObject;
private var t1m: GameObject;
 var leftBound: GameObject; //leftmost bound of a scene
 var rightBound: GameObject; //rightmost bound of a scene

private var scene = new LoadScene();
 var leftScene:String;
 var rightScene:String;
 var sceneNum = 0;
 var backwards = false;

private var floorOb:ChangeFloorSize;

var spawn1:GameObject;
var spawn2:GameObject;

var currentScene:Scene;
var newScene:boolean;

function Start(){
	girl=GameObject.Find("girl");
	t1m = GameObject.Find("t1m");


	leftBound = GameObject.Find("Floor/Bounds/leftBound");
	rightBound = GameObject.Find("Floor/Bounds/rightBound");

	floorOb = GameObject.Find("Floor").GetComponent(ChangeFloorSize);

	leftScene = null;
	rightScene = "Street1";

	spawn1 = GameObject.Find("spawnPos1");
	spawn2 = GameObject.Find("spawnPos2");

	girl.transform.position = spawn1.transform.position;
	t1m.transform.position = spawn2.transform.position;

	currentScene = SceneManager.GetActiveScene();

}

function Update () {
	
	if(leftBound != null && girl.transform.position.x < leftBound.transform.position.x){
		scene.loadScene(leftScene);	
		newScene = true;					  
	}

	else if(rightBound != null && girl.transform.position.x > rightBound.transform.position.x){
		scene.loadScene(rightScene);
		newScene = true;
	}

	currentScene = SceneManager.GetActiveScene();

	if(newScene){
	if(currentScene.name == leftScene ){
		backwards = true;
		updateScenes();				
	}
	else if(currentScene.name == rightScene){
		backwards = false;
		updateScenes();
	}
	}
	newScene = false;

}

function updateScenes(){
	leftBound = GameObject.Find("Floor/Bounds/leftBound");
	rightBound = GameObject.Find("Floor/Bounds/rightBound");
	spawn1 = GameObject.Find("spawnPos1");
	spawn2 = GameObject.Find("spawnPos2");

	if(currentScene.name == "Forest"){
		leftScene = null;
		rightScene = "Street1";
		floorOb.resizeFloor(20,5.5);

	}
	else if(currentScene.name == "Street1"){
		leftScene = "Forest";
		rightScene = "FinalStage";
		floorOb.resizeFloor(40,5.5);

	}
	else if(currentScene.name == "FinalStage"){
		leftScene = "Street1";
		rightScene = null;

	}


	if(backwards) {
		girl.transform.position.x = spawn2.transform.position.x;
		girl.transform.position.y = spawn2.transform.position.y;
	}
	else {
		girl.transform.position.x = spawn1.transform.position.x;
		girl.transform.position.y = spawn1.transform.position.y;
	}
}

function wait(sec:int){
	yield WaitForSeconds(sec);
}
