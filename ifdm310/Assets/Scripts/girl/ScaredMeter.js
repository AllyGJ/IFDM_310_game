#pragma strict

public var scaredMeter: UnityEngine.UI.Slider;
//public var lightCol: PolygonCollider2D[];

private var happy = 100;
private var inLight = false;

private var timer = 0;

function Update(){
	timer++;

	if(timer % 20 == 0){ //slow down how quickly she dies

		if(inLight){
			if(happy < 100) happy+=3;
		}
		else{
			if(happy > 0) {
				happy--;
			}else if(happy <= 0){
				print("Too scared to go on!");
				//exit game
			}
		
		}

		scaredMeter.value = happy;
	}
}

function OnTriggerEnter2D(Col: Collider2D)
{
//	for(var light : PolygonCollider2D in lightCol){
//		if(Col == light)
		if(Col.CompareTag("Light"))
		{	
			inLight = true;

		}
	//}
}

function OnTriggerExit2D(Col: Collider2D)
{
//	for(var light : PolygonCollider2D in lightCol){
//		if(Col == light)
		if(Col.CompareTag("Light"))
		{	
			inLight = false;

		}
	//}
}

//public function setNumLights(size:int){
//	lightCol = new PolygonCollider2D[size];
//}

//public function addLights(){
//	lightCol.Add(GameObject.FindWithTag("Light").collider2D);
//}


