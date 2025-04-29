#pragma strict

private var anim : Animator;
var nowAnim : int = 0;

function Start () {
	anim = GetComponent(Animator);
	anim.SetInteger("NowAnim", nowAnim);
}