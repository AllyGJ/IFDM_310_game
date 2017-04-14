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
		scene.loadScene(next);
	}

	
}


