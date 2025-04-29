#pragma strict

var player : GameObject;
var enemy : GameObject;
var chat_p : GameObject;
var chat_e : GameObject;
var options : GameObject;
var bg : GameObject;

var progress : int = 1;
var index_p : int = 0; // player speech index
// var regular_speech_p : Array = ["Where is it?", "I must get out here.", "Who are you?", "What the fuck!?"];
var regular_speech_p : Array = [
	"Yeah! (Roro play hide and seek with \nClownfish)",
	"Sounds good!"
];

var index_e : int = 0; // enemy speech index
var regular_speech_e : Array = [
	"Don't cry, let's have fun!",
	"You looks having fun now, but your face \nshould be...?",
	"That's right! You always have my welcome \nhere."
];

var wrong_speech_e : Array = [
	"There there, don't be upset.",
	"Come on, be happy.",
	"",
	"???"
];

// --------- options
var index_o : int = 0; // option index
var options1 : Array = [":(", ":'(", ":D", ":3"];

// --------- answer
var index_a : int = 0;
var answer : Array = [":D"];

function Start () {
	showPlayerStf (false);
	showEnemyStf (false);
	showOptions (false);
	// first step
	playerIcon (true);
	showEnemyStf (true);
	enemySpk();
}

function Update () {
	if(Input.GetKeyDown("return")) {
		switch (progress) {
			case 1: showPlayerStf (true); playerSpk(); break;
			case 2: enemySpk(); break;
			
			case 3: setOptions(options1); showOptions(true); break;
			case 4: chooseOption(options1); break;
			
			case 5: playerSpk(); break;
			
			case 6: doorOpen(); break;
			case 7: walkInside(); break;

			default:
				break;
		}
		progress++;
	}
	
	if(Input.GetKeyDown("up")) {
		if(index_o > 0)selectOption(--index_o);
	}
	else if(Input.GetKeyDown("down")) {
		if(index_o < 3)selectOption(++index_o);
	}
}

function showPlayerStf (show : boolean) {
	playerIcon(show);
	playerChatBox(show);
}

function showEnemyStf (show : boolean) {
	enemyIcon(show);
	enemyChatBox(show);
}

function playerSpk () {
	playerSpeak(regular_speech_p[index_p++]);
}

function enemySpk () {
	enemySpeak(regular_speech_e[index_e++]);
}

// ------- speak
function playerSpeak (speech : String) { // speech_p[index_p++]
	setPlayerSpeech (speech);
	chat_p.GetComponentInChildren(AutoType).Speak();
}

function enemySpeak (speech : String) { // speech_e[index_e++]
	setEnemySpeech (speech);
	chat_e.GetComponentInChildren(AutoType).Speak();
}

// --------- Speech
function setEnemySpeech (str : String) {
	chat_e.GetComponentInChildren(GUIText).GetComponent.<GUIText>().text = str;
}

function setPlayerSpeech (str : String) {
	chat_p.GetComponentInChildren(GUIText).GetComponent.<GUIText>().text = str;
}

// -------- Icon show/hide
function enemyIcon (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	
	enemy.GetComponent(SpriteRenderer).color.a = val;
}

function playerIcon (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	
	player.GetComponent(SpriteRenderer).color.a = val;
}

// -------- Chatbox show/hide
function enemyChatBox (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	
	chat_e.GetComponent(SpriteRenderer).color.a = val;
	chat_e.GetComponentInChildren(GUIText).color.a = val;
}

function playerChatBox (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	
	chat_p.GetComponent(SpriteRenderer).color.a = val;
	chat_p.GetComponentInChildren(GUIText).color.a = val;
}

// ----------- Options

function setOptions (arr : Array) {
	options.GetComponentsInChildren(GUIText)[0].GetComponent.<GUIText>().text = arr[0];
	options.GetComponentsInChildren(GUIText)[1].GetComponent.<GUIText>().text = arr[1];
	options.GetComponentsInChildren(GUIText)[2].GetComponent.<GUIText>().text = arr[2];
	options.GetComponentsInChildren(GUIText)[3].GetComponent.<GUIText>().text = arr[3];
}

function showOptions (show : boolean) {
	var val : int;
	if(show)val = 1;
	else val = 0;
	options.GetComponent(SpriteRenderer).color.a = val;
	options.GetComponentsInChildren(GUIText)[0].GetComponent.<GUIText>().color.a = val;
	options.GetComponentsInChildren(GUIText)[1].GetComponent.<GUIText>().color.a = val;
	options.GetComponentsInChildren(GUIText)[2].GetComponent.<GUIText>().color.a = val;
	options.GetComponentsInChildren(GUIText)[3].GetComponent.<GUIText>().color.a = val;
	selectOption(0);
}

function selectOption (index : int) {
	var anim : Animator = options.GetComponent(Animator);
	anim.SetInteger("NowOption", index);
}

function chooseOption (options : Array) {
	if(options[index_o] == answer[index_a]) {
		index_o = 0;
		index_a ++;
		// progress ++;
		showOptions (false);
		showEnemyStf (true);
		enemySpeak (regular_speech_e[index_e++]);
	}
	else {
		progress --;
		showEnemyStf (true);
		enemySpeak (wrong_speech_e[index_o]);
	}
}

// -------- Dungeon Door Open

function doorOpen () {
	var anim : Animator = bg.GetComponent(Animator);
	anim.SetBool("DoorOpen", true);
}

function walkInside () {
	showEnemyStf(false);
	showPlayerStf(false);
	while(1) {
		GameObject.Find("_MainCamera").GetComponent(Camera).orthographicSize -= .1;
		if(GameObject.Find("_MainCamera").GetComponent(Camera).orthographicSize < 1)break;
		yield WaitForSeconds(.01);
	}
	Application.LoadLevel(6);
}