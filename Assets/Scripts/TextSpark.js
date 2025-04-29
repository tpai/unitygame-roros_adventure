#pragma strict

var alphaOffset : float = .03;
private var fadeOut : boolean = false;

function Update () {
	var alpha = GetComponent(GUIText).color.a;
	
	if(fadeOut) {
		alpha += alphaOffset;
	}
	else {
		alpha -= alphaOffset;
	}
	
	if(alpha >= 1 || alpha <= 0) {
		fadeOut = !fadeOut;
	}
	
	GetComponent(GUIText).color.a = alpha;
}