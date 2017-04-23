#pragma strict

public static var instance:SoundManager = null;

public var girlSound: AudioSource;
public var mainRobot: AudioSource;
public var robots: AudioSource;
public var explosions: AudioSource;
public var conveyors: AudioSource;
public var lasers: AudioSource;
public var musicSource: AudioSource;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);
}

public function playGirl(clip: AudioClip){
	if(!girlSound.isPlaying){
		girlSound.clip = clip;
		girlSound.Play();
	}
}

public function playMainRobot(clip: AudioClip){
	if(!mainRobot.isPlaying){
		mainRobot.clip = clip;
		mainRobot.Play();
	}
}

public function playBreakable(clip: AudioClip){
	if(!explosions.isPlaying){
		explosions.clip = clip;
		explosions.Play();
	}
}

public function playRobotWalk(clip: AudioClip){
	if(!robots.isPlaying){
		robots.clip = clip;
		robots.Play();
	}
}

public function playConveyor(clip: AudioClip){
	if(!conveyors.isPlaying){
		conveyors.clip = clip;
		conveyors.Play();
	}
}

public function playLasers(clip: AudioClip){
	if(!lasers.isPlaying){
		lasers.clip = clip;
		lasers.Play();
	}
}
public function SetAllVolume(volume:float){
	var diff = 0.5;
	girlSound.volume = volume - diff;
	mainRobot.volume = volume - diff;
	robots.volume = volume - diff;
	explosions.volume = volume - diff;
	conveyors.volume = volume - diff;
	lasers.volume = volume - diff;
	musicSource.volume = volume;
}


public function changeMusic(clip:AudioClip){
	musicSource.clip = clip;
}

public function TurnOn(val:boolean){
	if(val){
		girlSound.Play();
		mainRobot.Play();
		robots.Play();
		explosions.Play();
		conveyors.Play();
		lasers.Play();
		musicSource.Play();
	}
	else{
		girlSound.Pause();
		mainRobot.Pause();
		robots.Pause();
		explosions.Pause();
		conveyors.Pause();
		lasers.Pause();
		musicSource.Pause();
	}
}

public function fadeOut(audio: AudioSource) {
     if(audio.volume > 0.1)
     {
         audio.volume -= 0.4 * Time.deltaTime;
     }
 }