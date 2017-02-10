#pragma strict

public var floor:GameObject; 
public var player:GameObject;
private var maxY:float; //highest y-value of floor
private var minY:float; //lowest y-value of floor 

public var scale:float;
private var z = scale;

private var minScale = 3;
private var maxScale = -3; 


function Start () {
//need to make these accurate
	maxY = 7.0;
	minY = -5.0;

}		

function Update () {
	
	if(Input.GetKey(KeyCode.DownArrow)){
		z = -scale;
	}
	else if(Input.GetKey(KeyCode.UpArrow)){
		z = scale;
	}
	else z = 0;

	player.transform.position.z += z;

	if(player.transform.position.z > minScale){
		player.transform.position.z = minScale;
	}
	else if(player.transform.position.z < maxScale){
		player.transform.position.z = maxScale;
	}


}

