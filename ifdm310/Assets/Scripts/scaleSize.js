#pragma strict

private var maxY:float; //highest y-value of floor
private var minY:float; //lowest y-value of floor 

private var scale=0.05;
private var z = scale;

private var minScale = 1;
private var maxScale = -1.5; 


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

	transform.position.z += z;

	if(transform.position.z > minScale){
		transform.position.z = minScale;
	}
	else if(transform.position.z < maxScale){
		transform.position.z = maxScale;
	}


}

