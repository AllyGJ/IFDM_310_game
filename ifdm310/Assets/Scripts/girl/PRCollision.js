#pragma strict


private var deathWindow: CanvasManager;

function Start()
{
	deathWindow = GameObject.Find("canvas").GetComponent(CanvasManager);
}

function OnTriggerEnter2D(Col: Collider2D)
{
	if(Col.CompareTag("Robot") || Col.CompareTag("lazerBeam"))
	{
		print("DEAD");
		deathWindow.showDeathWindow(true);
	}
}