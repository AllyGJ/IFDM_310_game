#pragma strict

public var girl: GameObject;

private var level1:boolean;
private var level2:boolean;
private var level3:boolean;


function Start () {
	level1 = true;
	level2 = false;
	level3 = false;

}

function Update () {
	if(level1){
		//lights.setNumLights(0);
	}
	else if(level2){
//		lights.setNumLights(7);
//		lights.addLights();	
	}
	else if(level3){

	}
}

public function changeValues(val1:boolean, val2:boolean, val3:boolean){
	level1 = val1;
	level2 = val2;
	level3 = val3;
}
