#pragma strict

private var girl: GameObject;
private var t1m: GameObject;
 var leftBound: GameObject; //leftmost bound of a scene
 var rightBound: GameObject; //rightmost bound of a scene

private var scene: LoadScene; 
 var leftScene:String;
 var rightScene:String;
private var sceneNum = 0;
private var backwards = false;

private var floorOb:floorManager;

var spawn1:GameObject;
 var spawn2:GameObject;

private var currentScene: Scene;
private var newScene: boolean;

function Start(){
	scene = GetComponent(LoadScene);

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
		floorOb.resizeFloor(20,6);

	}
	else if(currentScene.name == "Street1"){
		leftScene = "Forest";
		rightScene = "FinalStage";
		floorOb.resizeFloor(40,6);
	
	}
	else if(currentScene.name == "FinalStage"){
		leftScene = "Street1";
		rightScene = null;

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


