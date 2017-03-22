#pragma strict

public var ob: GameObject;

private var offset = 5;
private var y0:float;
private var amplitude = 1;
private var speed = 0.05;

var facingRight = true;

public static var instance = null;

function Awake(){

	if(instance == null) instance = this;
	else if(instance != null)  Destroy(gameObject);

	DontDestroyOnLoad(this);

}

function Start(){
	y0 = transform.position.y;	
}

function Update () {
	var moveH = Input.GetAxis("Horizontal");
	var moveV = Input.GetAxis("Vertical");


	lerpX(offset);

	GetComponent.<Renderer>().sortingLayerName = ob.GetComponent.<Renderer>().sortingLayerName;

	//flipping sprite
	if(moveH < 0 && facingRight){
         Flip();
         offset = Mathf.Abs(offset);
     }
     else if(moveH > 0 && !facingRight){
         Flip();
         offset = -Mathf.Abs(offset);

     }

}

//moves T1M over to right/lefy side of girl when flipped
function lerpX(offset : int){
	var endPos = new Vector3(ob.transform.position.x + offset,transform.position.y + 2, transform.position.z);
	transform.position = Vector3.Lerp(transform.position,endPos, speed);
}


function Flip()
 {
     facingRight = !facingRight;
     var theScale = transform.localScale;
     theScale.x *= -1;
     transform.localScale = theScale;

 }




