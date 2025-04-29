#pragma strict

var toLevel : int;

function Update () {
	if(Input.GetKeyDown("return")) {
		Application.LoadLevel(toLevel);
	}
}