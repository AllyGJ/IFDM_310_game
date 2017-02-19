﻿#pragma strict

public var ob:GameObject;
public var minx: GameObject;
public var maxx: GameObject;
public var miny: GameObject;
public var maxy: GameObject;

private var MinX: float;
private var MaxX: float;
private var MinY: float;
private var MaxY: float;

function Start(){
	MinX = minx.transform.position.x;
	MaxX = maxx.transform.position.x;
	MinY = miny.transform.position.y;
	MaxY = maxy.transform.position.y;
}

function Update () {
	follow(ob);
	transform.position = new Vector3(
	Mathf.Clamp(transform.position.x,MinX,MaxX),
	Mathf.Clamp(transform.position.y,MinY,MaxY),
	transform.position.z);
}

function follow(ob:GameObject)
{
	transform.position.x = ob.transform.position.x;
	transform.position.y = ob.transform.position.y;
}