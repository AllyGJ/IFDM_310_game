#pragma strict

public var fadeOutTexture: Texture2D;
public var fadeSpeed = 2f;

private var drawDepth = -1000;
private var alpha = 1.0f;
 var fadeDir = -1; //in = -1, out = 1

function Start(){
	SceneManager.sceneLoaded += this.OnLevelFinishedLoading;
}
function OnGUI(){
	alpha += fadeDir * fadeSpeed * Time.deltaTime;
	alpha = Mathf.Clamp01(alpha);

	GUI.color = new Color(GUI.color.r, GUI.color.g, GUI.color.b, alpha);
	GUI.depth = drawDepth;
	GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height), fadeOutTexture);
}

public function BeginFade(direction:int){
	fadeDir = direction;
	return fadeSpeed;
}

function OnLevelFinishedLoading(scene: Scene, mode: LoadSceneMode){
	BeginFade(-1);
}