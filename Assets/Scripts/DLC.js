#pragma strict

function Start () {
	GetComponent.<GUIText>().text = "What's the story next?";
}

function Update () {
	if(Input.GetKeyDown("return")) {
		GetComponent.<GUIText>().text = "Buy DLC to find out! :P\n\nThe end";
	}
}