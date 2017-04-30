#pragma strict

private var tim: GameObject;
private var girl: GameObject;

public var empty: Sprite;
public var intro: Sprite[];
public var lightTalk: Sprite[];
public var bossChat: Sprite[];

private var index = 1;

private var introIsOver = false; 
private var scared = false;
private var firstBubble = true;
private var lastLevel = false;

private var speakSound:AudioClip;



public static var instance: TimTalk = null;

private var cam : CameraMove;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	tim = GameObject.Find("t1m");
	girl = GameObject.Find("girl");
	cam = GameObject.Find("camera").GetComponent(CameraMove);

	GetComponent(SpriteRenderer).sprite = intro[0];
}

function Update () {
	transform.position.x = tim.transform.position.x;
	transform.position.y = girl.transform.position.y + 6;


	if(scared && firstBubble) {
		GetComponent(SpriteRenderer).sprite = lightTalk[0]; 
	}
	else if(lastLevel && firstBubble){
		cam.setZoomIn(true);
		GetComponent(SpriteRenderer).sprite = bossChat[0]; 
	}

		//print(GetComponent(SpriteRenderer).sprite);

	if(Input.GetKeyDown(KeyCode.Space)){

	    //Introduction speech
		if(!introIsOver){
			SoundManager.instance.playMainRobot(speakSound);
			if(index >= intro.length) {
				GetComponent(SpriteRenderer).sprite = empty;
				index = 0;
				introIsOver = true;
				cam.setZoomOut(true);
				SoundManager.instance.mainRobot.Stop();
			}else{
				GetComponent(SpriteRenderer).sprite = intro[index];
				index++;
			}

		}

		//Scared speech
		else if(scared){
			SoundManager.instance.playMainRobot(speakSound);
			firstBubble = false;
			if(index >= lightTalk.length) {
				GetComponent(SpriteRenderer).sprite = empty;
				index = 0;
				scared = false;
				firstBubble = true;
				SoundManager.instance.mainRobot.Stop();
			}else{
				GetComponent(SpriteRenderer).sprite = lightTalk[index];
				index++;
			}
		}

		else if(lastLevel){
			SoundManager.instance.playMainRobot(speakSound);
			firstBubble = false;
			if(index >= bossChat.length) {
				GetComponent(SpriteRenderer).sprite = empty;
				index = 0;
				lastLevel = false;
				firstBubble = true;
				cam.setZoomOut(true);
				SoundManager.instance.mainRobot.Stop();
				GameManager.instance.GetComponent(GamePlay).girlScriptSwitch(true);
			}else{
				GetComponent(SpriteRenderer).sprite = bossChat[index];
				index++;
			}
		}
	}
}
/*************************************************************************/
public function introOver(){
	return introIsOver;
}

public function scaredTalk(val : boolean)
{
	scared = val;

}

public function bossTalk(val:boolean){
	lastLevel = true;
}

public function getLevelFlag(){
	return lastLevel;
}

public function setSound(clip:AudioClip){
	speakSound = clip;
}

