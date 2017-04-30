#pragma strict
@script RequireComponent(AudioSource)


public var movie: MovieTexture;
public var next: String;
private var scene: LoadScene;

function Start () {
	scene = GetComponent(LoadScene);
	GetComponent.<Renderer>().material.mainTexture = movie;
	movie.Play();
}

function Update(){
	if(!movie.isPlaying){
		if(SceneManager.GetActiveScene().name == "CutScene2"){
			Destroy(GameObject.Find("MenuCTRL"));
			Destroy(GameObject.Find("SoundManager"));
		}
		//if(next != "none") 
		scene.loadScene(next);
		//else Application.Quit();
	}

	
}


