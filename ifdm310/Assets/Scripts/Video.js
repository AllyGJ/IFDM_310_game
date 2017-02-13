#pragma strict
@script RequireComponent(AudioSource)


public var movie: MovieTexture;

function Start () {
	GetComponent.<Renderer>().material.mainTexture = movie as MovieTexture;
	movie.Play();
}


