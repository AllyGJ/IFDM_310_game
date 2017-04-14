#pragma strict
import UnityEngine.SceneManagement;

private var load : LoadScene; 
private var music = true;
private var volume = 100;

private var slide: Slider;

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

function closeWindow(window:GameObject){
	window.SetActive(false);
}

function openWindow(window:GameObject){
	window.SetActive(true);
	//print("click!");
}

function setMusic(tog: Toggle){
	music = tog.isOn;
}

function setVolume(slide: Slider){
	volume = slide.value;
}
