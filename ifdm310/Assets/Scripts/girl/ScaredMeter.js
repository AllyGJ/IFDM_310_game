#pragma strict

public var scaredMeter: UnityEngine.UI.Slider;
//public var lightCol: PolygonCollider2D[];

private var happy = 100;
private var inLight = false;

private var timer = 0;

private var gameStarted = false;

function Update(){
	if(gameStarted){
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
}

private function OnTriggerEnter2D(Col: Collider2D)
{
		
	if(Col.CompareTag("Light"))
	{	
		inLight = true;
	}
	
}

private function OnTriggerExit2D(Col: Collider2D)
{

	if(Col.CompareTag("Light"))	{	
		inLight = false;

	}
	
}

public function setGameStarted(val:boolean){
	gameStarted = val;
}


