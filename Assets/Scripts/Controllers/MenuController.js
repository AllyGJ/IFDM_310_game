#pragma strict
import UnityEngine.SceneManagement;

private var load : LoadScene; 
private var music = true;
private var volume:float;

private var slide: Slider;

public static var instance:MenuController = null;

function Awake(){
	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);
}

function Start () {
	load = GetComponent(LoadScene);
	SoundManager.instance.SetAllVolume(1);

	var SoundSettings = GameObject.Find("Canvas/SoundSettings");
	var HowTo = GameObject.Find("Canvas/HowTo");

	var playB = GameObject.Find("Canvas/titleScreen/Play").GetComponent(Button);
	var HowB = GameObject.Find("Canvas/titleScreen/How").GetComponent(Button);
	var SoundB = GameObject.Find("Canvas/titleScreen/Sound").GetComponent(Button);
	var exit = GameObject.Find("Canvas/titleScreen/Exit").GetComponent(Button);

	var submitSound = GameObject.Find("Canvas/SoundSettings/Panel/OK").GetComponent(Button);
	var musicToggle = GameObject.Find("Canvas/SoundSettings/Panel/Toggle").GetComponent(Toggle);
	var musicSlider = GameObject.Find("Canvas/SoundSettings/Panel/Slider").GetComponent(Slider);

	var closeHow = GameObject.Find("Canvas/HowTo/Panel/OK").GetComponent(Button);


	playB.onClick.AddListener( function() { GetComponent(LoadScene).loadScene("CutScene1");});
	HowB.onClick.AddListener( function() { openWindow(HowTo);});
	SoundB.onClick.AddListener( function() { openWindow(SoundSettings);});
	exit.onClick.AddListener( function() { exitGame();});

	submitSound.onClick.AddListener( function() { closeWindow(SoundSettings,false);});
	musicToggle.onValueChanged.AddListener( function() { setMusic(musicToggle);});
	musicSlider.onValueChanged.AddListener( function() { setVolume(musicSlider);});

	closeHow.onClick.AddListener( function() { closeWindow(HowTo, false);});

	SoundSettings.SetActive(false);
	HowTo.SetActive(false);
}

function Update () {
	var curScene = SceneManager.GetActiveScene().name;
//	if(curScene == "StartMenu"){
//		var playB = GameObject.Find("Canvas/titleScreen/Play").GetComponent(Button);
//		var HowB = GameObject.Find("Canvas/titleScreen/Play").GetComponent(Button);
//		var SoundB = GameObject.Find("Canvas/titleScreen/Play").GetComponent(Button);
//
//		playB.onClick.AddListener( function() { GetComponent(LoadScene).loadScene("CutScene1");});
//		HowB.onClick.AddListener( function() { openWindow(GameObject.Find("Canvas/HowTo"));});
//		SoundB.onClick.AddListener( function() { openWindow(GameObject.Find("Canvas/SoundSettings"));});
//
//
//	}

	if(Input.GetKeyDown(KeyCode.Space)){
		if(curScene == "CutScene1"){
			load.loadScene("Forest");
		}

		else if(curScene == "CutScene2"){
			load.loadScene("StartMenu");

		}
	}


}

function closeWindow(window:GameObject, menuClosed:boolean){
	if(menuClosed) SoundManager.instance.StartSounds();
	window.SetActive(false);
}

function openWindow(window:GameObject){
	if(window.tag == "menuWin") SoundManager.instance.StopSounds();
	window.SetActive(true);
}

function setMusic(tog: Toggle){
	music = tog.isOn;
	SoundManager.instance.TurnOn(music);
}

function setVolume(slide: Slider){
	volume = slide.value;
	SoundManager.instance.SetAllVolume(volume);
}

public function GetVolume(){
	return volume;
}

public function exitGame(){
	Application.Quit();
}