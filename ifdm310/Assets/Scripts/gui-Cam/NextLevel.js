#pragma strict

private var girl: GameObject;
 var leftBound: GameObject; //leftmost bound of a scene
 var rightBound: GameObject; //rightmost bound of a scene

private var scene = new LoadScene();
private var leftScene:String;
private var rightScene:String;
private var sceneNum = 0;
private var sceneDecreased = false;
private var update:UpdateFields;

function Start(){
	girl=GameObject.Find("girl");

	update = GetComponent(UpdateFields);

	leftBound = GameObject.Find("Background/Floor/Bounds/leftBound");
	rightBound = GameObject.Find("Background/Floor/Bounds/rightBound");

	leftScene = null;
	rightScene = "Street1";

}

function Update () {

	leftBound = GameObject.Find("Background/Floor/Bounds/leftBound");
	rightBound = GameObject.Find("Background/Floor/Bounds/rightBound");

	if(leftBound != null && girl.transform.position.x < leftBound.transform.position.x){
		sceneNum--;
		scene.loadScene(leftScene);
		updateScenes();
		//girl.transform.position.x = rightBound.transform.position.x - 1;
											  
	}

	else if(rightBound != null && girl.transform.position.x > rightBound.transform.position.x){
		sceneNum++;
		scene.loadScene(rightScene);
		updateScenes();		
		//girl.transform.position.x = leftBound.transform.position.x + 1;
	}



}

function updateScenes(){
	if(sceneNum == 0){
		leftScene = null;
		rightScene = "Street1";
		//update.changeValues(true,false,false);
	}
	else if(sceneNum == 1){
		leftScene = "Forest";
		rightScene = "FinalStage";
		//update.changeValues(false,true,false);
	}
	else if(sceneNum == 2){
		leftScene = "Street1";
		//update.changeValues(false,false,true);
	}

}
