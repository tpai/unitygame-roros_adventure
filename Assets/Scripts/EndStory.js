#pragma strict

var toScene : int;
var nextStory : GameObject;

function Update () {
	if(Input.GetKeyDown("return")) {
		Destroy(gameObject);
		Instantiate(nextStory, Vector3.zero, Quaternion.identity);
	}
}