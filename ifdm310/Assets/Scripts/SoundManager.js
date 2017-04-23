#pragma strict

public static var instance:SoundManager = null;

public var efxSource1: AudioSource;
public var efxSource2: AudioSource;
public var musicSource: AudioSource;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);
}

public function playSingleGirl(clip: AudioClip){
	if(!efxSource1.isPlaying){
		efxSource1.clip = clip;
		efxSource1.Play();
	}
}

public function playSingleTim(clip: AudioClip){
	if(!efxSource2.isPlaying){
		efxSource2.clip = clip;
		efxSource2.Play();
	}
}

public function SetVolume(volume:float){
	efxSource1.volume = volume;
	efxSource2.volume = volume;
	musicSource.volume = volume;
}

public function SetVolEffects(volume:float){
	efxSource1.volume = volume;
	efxSource2.volume = volume;
}

public function TurnOn(val:boolean){
	if(val){
		efxSource1.Play();
		efxSource2.Play();
		musicSource.Play();
	}
	else{
		efxSource1.Pause();
		efxSource2.Pause();
		musicSource.Pause();
	}
}