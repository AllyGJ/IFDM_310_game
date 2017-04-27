#pragma strict

public static var instance:SoundManager = null;

public var girlSound: AudioSource;
public var mainRobot: AudioSource;
public var robots: AudioSource;
public var explosions: AudioSource;
public var conveyors: AudioSource;
public var lasers: AudioSource;
public var musicSource: AudioSource;

private var curVol:float;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);
}

function Update(){
	curVol = MenuController.instance.GetVolume();
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
public function SetAllVolume(curVol:float){
	girlSound.volume = curVol - 0.2;
	mainRobot.volume = curVol;
	robots.volume = curVol;
	explosions.volume = curVol;
	conveyors.volume = curVol;
	lasers.volume = curVol;
	musicSource.volume = curVol - 0.1;
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

 public function setBackMusic(clip: AudioClip){
 	musicSource.clip = clip;
 	musicSource.Play();
 }

 public function setBackMusicVol(clip: AudioClip, volume: float){
 	musicSource.clip = clip;
 	musicSource.volume = volume;
 	musicSource.Play();
 }

 public function changeRobotVol(vol:float){
 	mainRobot.volume = mainRobot.volume - vol;
 }

 public function StopSounds(){
 	girlSound.Stop();
	mainRobot.Stop();
	robots.Stop();
	explosions.Stop();
	conveyors.Stop();
	lasers.Stop();
 }