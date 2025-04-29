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
	"Hello.",
	"Ah, I am sorry.",
	"The shell on your back, it looks heavy.",
	"Time to go."
];

var index_e : int = 0; // enemy speech index
var regular_speech_e : Array = [
	"(Sea turtle stare at Roro)",
	"Hi, your face makes me feel uncomfortable.",
	"It is my home and my shield.",
	"Enemy can't touch me when I squeeze myself \ninto the shell.",
	"(Sea turtle enjoys the moment in the \nshell)",
	"Hey boy, it is not safe here, be careful!",
	"(the room shakes very hard, it sounds \nlike vocano blast)"
];

var wrong_speech_e : Array = [
	"I don't like your face.",
	"",
	"Not cool.",
	"???"
];

// --------- options
var index_o : int = 0; // option index
var options1 : Array = [">:(", "8-)", "8-|", ":3"];

// --------- answer
var index_a : int = 0;
var answer : Array = ["8-)"];

var anim : Animator;
function Start () {
	anim = enemy.GetComponent(Animator);
	anim.SetBool("InShell", false);
	
	showPlayerStf (false);
	showEnemyStf (false);
	showOptions (false);
	// first step
	playerIcon(true);
	showEnemyStf(true);
	enemySpk();
}

function shakeCamera () {
	GameObject.Find("_MainCamera").transform.position.x *= -1;
}

function Update () {
	if(Input.GetKeyDown("return")) {
		switch (progress) {
			case 1: showPlayerStf(true); playerSpk(); break;
			case 2: showEnemyStf(true); enemySpk(); break;
			case 3: playerSpk(); break;
			case 4: playerSpk(); break;
			case 5: enemySpk(); break;
			case 6: enemySpk(); anim.SetBool("InShell", true); break;
			
			case 7: setOptions(options1); showOptions(true); break;
			case 8: chooseOption(options1); break;
			
			case 9: enemySpk(); break;
			case 10: GameObject.Find("_MainCamera").transform.position.x = .5; break;
			case 11: GameObject.Find("_MainCamera").transform.position.x = 0; break;
			case 12: enemySpk(); break;
			case 13: playerSpk(); break;
			
			case 14: doorOpen(); break;
			case 15: walkInside(); break;

			default:
				break;
		}
		progress++;
	}
	shakeCamera ();
	
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
	Application.LoadLevel(11);
}