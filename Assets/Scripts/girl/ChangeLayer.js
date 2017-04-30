#pragma strict
//Place on little girl

//public var layer1_2:GameObject; //y-coord of 1/2 boundary
//public var layer2_3:GameObject; //y-coord of 2/3 boundary

private var l12Y:float;
private var l23Y:float;

private var girlY:float;

function Start () {
	l12Y = GameObject.Find("Floor/LayerSeperator1&2").transform.position.y;
	l23Y = GameObject.Find("Floor/LayerSeperator2&3").transform.position.y;
}

function Update () {
	
	girlY = GetComponent.<Collider2D>().bounds.center.y;

	if(girlY > l23Y) GetComponent.<Renderer>().sortingLayerName = "Layer3";
	else if(girlY < l23Y && girlY > l12Y) GetComponent.<Renderer>().sortingLayerName = "Layer2";
	else if(girlY < l12Y) GetComponent.<Renderer>().sortingLayerName = "Layer1";

	l12Y = GameObject.Find("Floor/LayerSeperator1&2").transform.position.y;
	l23Y = GameObject.Find("Floor/LayerSeperator2&3").transform.position.y;
}
