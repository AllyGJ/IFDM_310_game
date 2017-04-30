#pragma strict

public var scaredMeter: UnityEngine.UI.Slider;

private var happy = 100;
private var inLight = false;

private var timer = 0;

private var gameStarted = false;
private var timTalkMeter = false;
private var shown = false;

function Update(){
	if(gameStarted){
		timer++;

		if(timer % 50 == 0){ //slow down how quickly she gets scared

			if(inLight){
				if(happy < 100) happy+=3;
			}
			else{
				if(happy > 0) {
					happy--;
					if(shown) timTalkMeter = false;
					if(happy <= 20 && shown == false) {
						timTalkMeter = true; 
						shown = true;
					}

			
				}else if(happy <= 0){
					print("Too scared to go on!");
					CanvasManager.instance.showScared();
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

/***********************************************************************/

public function setGameStarted(val:boolean){
	gameStarted = val;
}

public function getMeterDialogue()
{
	return timTalkMeter;
}

public function setMeter(num:int){
	happy = num;
}

public function showBar(val:boolean){
	scaredMeter.gameObject.SetActive(val);
}

