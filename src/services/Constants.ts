/*DIFICULTADES*/
export const DIF_EASY = 'easy';
export const DIF_MEDIUM = 'medium';
export const DIF_HARD = 'hard';
/*TIME INTERVALS*/
export const EASY_INTERVAL = 6;
export const MEDIUM_INTERVAL = 4;
export const HARD_INTERVAL = 2;
export const TOTAL_TURN_BAR = 100;
/*STARTING GAMES MSJS */
export const MSJ_1 = 'Are you good enough?';
export const MSJ_2 = 'Ready';
export const MSJ_3 = 'GO!';
/*ROUND COUNT */
export const SHORT_GAME = 1;
export const NORMAL_GAME = 3;
export const LONG_GAME = 5;

/*POINTS TO WIN*/
export const SHORT_GAME_WINS = 1;
export const NORMAL_GAME_WINS = 2;
export const LONG_GAME_WINS = 3;

/*GameType*/
export const GT_SINGLEPLAYER = 'singleplayer';
export const GT_LOCAL_MULTYPLAYER = 'local-multiplayer';
export const GT_ONLINE = 'online-multiplayer';

/*GameplayConstants */
export const PlAYER_ONE_WR = 'Player One Wins Round';
export const PlAYER_TWO_WR = 'Player Two Wins Round';
export const ROBOT_WR = 'Robot wins the round';
export const ROUND_TIE = 'Round Draw!';

export const PlAYER_ONE_WG = 'Player One Wins the game!';
export const PlAYER_TWO_WG = 'Player Two Wins!';
export const ROBOT_WG = 'Robot The Wins Game!';
export const TIE = 'Its A Draw!!!';

export const PLAYER_ONE_STARTS = 'Player One Starts Game';
export const PLAYER_TWO_STARTS = 'Player Two Starts Game';
export const ROBOT_STARTS = 'Robot Starts The Game';
/*Portrait Uris */
export const PORTRAIT_URIS :string[]  = 
[
  'assets/imgs/enojado.png',
  'assets/imgs/cansado.png',
  'assets/imgs/enamorado.png',
  'assets/imgs/escondido.png',
  'assets/imgs/like.png',
  'assets/imgs/upps.png',
  'assets/imgs/sorprendido.png',
  'assets/imgs/lol.png',
];

/*TOKENS URIS */
export const TOKENS_URIS = 
[
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/tic_tac_toe-mockup-red.png',
  'assets/imgs/tic-tac-toep-mouckup-3.png',
  'assets/imgs/tic-tac-toe-mockup-4.png',
  'assets/imgs/tic-tac-toe-mockyp-5.png',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
  'assets/imgs/Tic-Tac-Toe-icon-mockup.ico'
];

/*CURRENCIES ICONS */
export const COIN_URI = 'assets/imgs/coins.png';
export const EOLA_URI = 'assets/imgs/eolas.png';
/*IA ODDS */
export const MEDIUM_ODD = 0.5;
export const HARD_ODD = 0.85;

/*API URIS*/

export const  API_VR_URI = 'http://jugadorapi-dev.us-west-2.elasticbeanstalk.com/api/jugadores/';
export const API_VR_URI_REGISTER = '/register';
export const API_VR_URI_AUTH = '/authenticate';

/*Contact state */
export const GAME_INVITE_PENDING = 'Game Invitation Pending"';
export const GAME_INVITE_SENT = 'Game Invitation Sent';

/*AD MOB IDS */
export const IOS_INTER_ID = 'ca-app-pub-2497464044902615/8130698049';
export const ANDROID_INTER_ID = 'ca-app-pub-2497464044902615/3469398308';

export const IOS_VIDEO_ID = 'ca-app-pub-2497464044902615/1296151797';
export const ANDROID_VIDEO_ID='ca-app-pub-2497464044902615/2902970831';

/*AD ODD*/
export const AD_ODD = 0.80;

/*Premios Ruleta */
export const REWARD_INDEXES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const ROULETTE_REWARDS = [
  "5 Eola", "5 Crystals", "10 Crystals", "5 Crystals", "1 Eola",
  "5 Crystals", "20 Crystals", "5 Crystals", "1 Eola", "5 Crystals"
];

export const CRYSTALS = 'Crystals';
export const EOLA = 'Eola';

export const ROULETE_STARTING_ANGLES = [0, 10, 56, 96, 142, 167, 213, 243, 289, 314];

/*main menu svg resources*/
export const BTN_1_PLAYER_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_1_Player_Normal.svg';
export const BTN_1_PLAYER_PUSHED = 'assets/imgs/svg/MainMenuPage/Btn_1_Player_Pushed.svg';
export const BTN_2_PLAYERS_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_2_Players_Normal.svg';
export const BTN_2_PLAYERS_PUSHED = 'assets/imgs/svg/MainMenuPage/Btn_2_Players_Pushed.svg';
export const BTN_MULTIPLAYER_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_Multiplayer_Normal.svg';
export const BTN_MULTIPLAYERS_PUSHED = 'assets/imgs/svg/MainMenuPage/Btn_Multiplayer_Pushed.svg';
export const BTN_VIDEO_REWARDS_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_Video_Rewards_Normal.svg';
export const BTN_SETTINGS_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_Settings_Normal.svg';
export const BTN_USER_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_User_Normal.svg';
export const BTN_FRIENDS_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_Friends_Normal.svg';
export const BTN_STORE_NORMAL = 'assets/imgs/svg/MainMenuPage/Btn_Store_Normal.svg';