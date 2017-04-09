#pragma strict
import UnityEngine.SceneManagement;

private var load : LoadScene; 

public static var instance = null;
function Awake(){
	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);
}

function Start () {
	load = GetComponent(LoadScene);
}

function Update () {
	var curScene = SceneManager.GetActiveScene().name;

	if(Input.GetKeyDown(KeyCode.Space)){
		if(curScene == "CutScene1"){
			load.loadScene("Forest");
		}

		else if(curScene == "CutScene2"){
			load.loadScene("Credits");
		}
	}
}
