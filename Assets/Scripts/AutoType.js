#pragma strict

var done : boolean = true;
var letterPause : float = 0.05;
// var sound : AudioClip;
private var word : String;
 
function Speak () {
	done = false;
	word = GetComponent.<GUIText>().text;
	GetComponent.<GUIText>().text = "";
	TypeText ();
}
 
function TypeText () {
	for (var i=0;i<word.Length;i++) {
		GetComponent.<GUIText>().text += word[i];
		/*if (sound)
			audio.PlayOneShot (sound);*/
		yield WaitForSeconds (letterPause);
	}
	done = true;
}