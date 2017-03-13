#pragma strict

public var girl: GameObject;
 var leftBound: GameObject; //leftmost bound of a scene
 var rightBound: GameObject; //rightmost bound of a scene

private var scene = new LoadScene();

private var leftScene = null;
private var rightScene = "Street1";

private var sceneNum = 0;
private var sceneDecreased = false;

private var update:UpdateFields;

function Start(){
	
	update = GetComponent(UpdateFields);

	leftBound = GameObject.Find("Background/Floor/Bounds/leftBound");
	rightBound = GameObject.Find("Background/Floor/Bounds/rightBound");

//	if(sceneDecreased) girl.transform.position = leftBound.position;
//	else girl.transform.position = rightBound.position;
}

function Update () {

	leftBound = GameObject.Find("Background/Floor/Bounds/leftBound");
	rightBound = GameObject.Find("Background/Floor/Bounds/rightBound");

	if(leftBound != null && girl.transform.position.x < leftBound.transform.position.x){
		sceneNum--;
		sceneDecreased = true;
		scene.loadScene(leftScene);
		updateScenes();
	
	}

	else if(rightBound != null && girl.transform.position.x > rightBound.transform.position.x){
		sceneNum++;
		sceneDecreased = false;
		scene.loadScene(rightScene);
		updateScenes();		
	}


}

function updateScenes(){
	if(sceneNum == 0){
		leftScene = null;
		rightScene = "Street1";
		update.changeValues(true,false,false);
	}
	else if(sceneNum == 1){
		leftScene = "Forest";
		rightScene = "FinalStage";
		update.changeValues(false,true,false);
	}
	else if(sceneNum == 2){
		leftScene = "Street1";
		update.changeValues(false,false,true);
	}



}
