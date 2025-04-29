#pragma strict

var bganim : GameObject;
var chatbox : GameObject;

var progress : int = 1;

var storyProgress : int = 1;
var storyCount : int = 5; // new story
var nowStoryLen : int = 99;

var storyArrIndex : int = 0;
// new story
var story1 : Array = [
	"Roro is a cute meatball, he\nlives at beach. The most\nfavorite things he loved are\nsunshine, sand and bikini."
];
var story2 : Array = [
	"The weather turns to dark.",
	"It looks like bad sign."
];
var story3 : Array = [
	"RUN!!!",
	"The storm is coming!!!"
];
var story4 : Array = [
	"Oh no! Roro is attacked\n by strong waves."
];
var story5 : Array = [
	"Roro passed out, and awake\n after a very long time..."
];

var sprite1 : Sprite;
var sprite2 : Sprite;
var sprite3 : Sprite;
var sprite4 : Sprite;

var sceneProgress : int = 1;

var scene1 : RuntimeAnimatorController; // peace beach
var scene2 : RuntimeAnimatorController; // storm beach
var scene3 : RuntimeAnimatorController; // uzumaki
var scene4 : RuntimeAnimatorController; // dungeon

function Start () {
	readStory(); // story1
}

function Update () {
	if(Input.GetKeyDown("return")) {
		switch (progress) {
			case 1: readStory(); break; // story1
			case 2: playScene(); break;
			case 3: readStory(); break; // story2
			case 4: playScene(); break;
			case 5: readStory(); break; // story3
			case 6: playScene(); break;
			case 7: readStory(); break; // story4
			case 8: playScene(); break;
			case 9: readStory(); break; // story5
			case 10: Application.LoadLevel(2); break;
			default: break;
		}
	}
	checkStoryEnd ();
}

function readStory () {
	if(chatbox.GetComponentInChildren(AutoType).done) {
		chatbox.GetComponentInChildren(AutoType).letterPause = .05;
		
		showChatBox(true);
		
		switch (storyProgress) { // new story
			case 1: readSentence(story1); break;
			case 2: readSentence(story2); break;
			case 3: readSentence(story3); break;
			case 4: readSentence(story4); break;
			case 5: readSentence(story5); break;
			default: break;
		}
	}
	else {
		chatbox.GetComponentInChildren(AutoType).letterPause = .01;
	}
}

function readSentence (story : Array) {
	nowStoryLen = story.length;
	if(storyArrIndex < nowStoryLen) {
		chatbox.GetComponentInChildren(GUIText).GetComponent.<GUIText>().text = story[storyArrIndex];
		chatbox.GetComponentInChildren(AutoType).Speak();
		storyArrIndex ++;
	}
}

function checkStoryEnd () {
	if(chatbox.GetComponentInChildren(AutoType).done) {
		if(storyArrIndex >= nowStoryLen && storyProgress <= storyCount) {
			storyArrIndex = 0;
			storyProgress ++;
			progress ++;
		}
	}
}

function playScene () {
	showBGAnim(true);
	switch (sceneProgress) {
		case 1: setSprite(1); setAnimator(1); break;
		case 2: setSprite(2); setAnimator(2); break;
		case 3: setSprite(3); setAnimator(3); break;
		case 4: setSprite(4); setAnimator(4); break;
		default: break;
	}
	sceneProgress ++;
	progress ++;
}

function setSprite (target : int) {
	bganim.GetComponent(SpriteRenderer).color = Color.white;
	switch (target) {
		case 1: bganim.GetComponent(SpriteRenderer).sprite = sprite1; break;
		case 2: bganim.GetComponent(SpriteRenderer).sprite = sprite2; break;
		case 3: bganim.GetComponent(SpriteRenderer).sprite = sprite3; break;
		case 4: bganim.GetComponent(SpriteRenderer).sprite = sprite4; break;
		default: break;
	}
}

function setAnimator (target : int) {
	var anim : Animator;
	switch (target) {
		case 1:
			bganim.GetComponent(Animator).runtimeAnimatorController = scene1;
			anim = bganim.GetComponent(Animator);
			anim.SetInteger("NowAnim", 0);
			break;
		case 2:
			bganim.GetComponent(Animator).runtimeAnimatorController = scene2;
			anim = bganim.GetComponent(Animator);
			anim.SetInteger("NowAnim", 1);
			break;
		case 3: bganim.GetComponent(Animator).runtimeAnimatorController = scene3; break;
		case 4: bganim.GetComponent(Animator).runtimeAnimatorController = scene4; break;
		default: break;
	}
}

function showChatBox (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	
	chatbox.GetComponent(GUIText).color.a = val;
	bganim.GetComponent(SpriteRenderer).color.a = (val==1)?0:1;
}

function showBGAnim (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	
	bganim.GetComponent(SpriteRenderer).color.a = val;
	chatbox.GetComponent(GUIText).color.a = (val==1)?0:1;
}