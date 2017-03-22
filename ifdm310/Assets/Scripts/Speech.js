#pragma strict
import UnityEngine.UI;

private var button:GameObject;

function Start(){
	button = this.gameObject;
}
function changeText(words:String){
	GetComponentInChildren(Text).text = words;
}

function changeLocation(x:float, y:float){
	transform.position.x = x;
	transform.position.y = y;
}

function fontSize(size:int){
	GetComponentInChildren(Text).fontSize=size;
}

function show(val:boolean){
	button.SetActive(val);
}