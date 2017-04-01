#pragma strict

private var tim: GameObject;
private var girl: GameObject;

public var intro: Sprite[];
public var lightTalk: Sprite[];
private var index = 1;


private var introIsOver = false;
private var scared = false;

public static var instance = null;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start () {
	tim = GameObject.Find("t1m");
	girl = GameObject.Find("girl");

	GetComponent(SpriteRenderer).sprite = intro[0];
}

function Update () {
	transform.position.x = tim.transform.position.x;
	transform.position.y = girl.transform.position.y + 6;



	if(Input.GetKeyDown(KeyCode.Space)){

	    //Introduction speech
		if(!introIsOver){
			if(index >= intro.length) {
				GetComponent(SpriteRenderer).sprite = null;
				index = 0;
				introIsOver = true;
			}else{
				GetComponent(SpriteRenderer).sprite = intro[index];
				index++;
			}

		}

//		//Scared speech
//		if(scared){
//			if(index >= lightTalk.length) {
//				GetComponent(SpriteRenderer).sprite = null;
//				index = 0;
//				scared = false;
//			}else{
//				GetComponent(SpriteRenderer).sprite = lightTalk[index];
//				index++;
//			}
//		}
	}
}

public function introOver(){
	return introIsOver;
}

//public function scaredTalk(val : boolean)
//{
//	scared = val;
//
//}
// 
