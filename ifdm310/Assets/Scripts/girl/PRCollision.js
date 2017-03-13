#pragma strict

//public var enemyList: Collider2D[];


function OnTriggerEnter2D(Col: Collider2D)
{
	if(Col.CompareTag("Robot") || Col.CompareTag("lazerBeam"))
	{
		print("DEAD");
	}
}