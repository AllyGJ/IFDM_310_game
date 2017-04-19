#pragma strict

public static var instance:SoundManager = null;

public var efxSource: AudioSource;
public var musicSource: AudioSource;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);
}

public function playSingle(clip: AudioClip){
	efxSource.clip = clip;
	efxSource.Play();
}

public function SetVolume(volume:float){
	efxSource.volume = volume;
	musicSource.volume = volume;
}

public function TurnOn(val:boolean){
	if(val){
		efxSource.Play();
		musicSource.Play();
	}
	else{
		efxSource.Pause();
		musicSource.Pause();
	}
}