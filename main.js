"use strict"

const CHRHEIGHT  = 32;                      // キャラの高さ
const CHRWIDTH   = 32;                      // キャラの幅
const FONT       = "36px monospace";        // 使用フォント
const FONTSTYLE  = "#ffffff"                // 文字色
const HEIGHT     = 640;                     // 仮装画面サイズ。高さ
const WIDTH      = 960;                     // 仮装画面サイズ。幅
const MAP_HEIGHT = 32;                      // マップ高さ
const MAP_WIDTH  = 32;                      // マップ幅
const SMOOTH     = 0;                       // 補間処理
const START_X    = 1;                       // 開始位置X
const START_Y    = 5;                       // 開始位置Y
const TILECOLUMN = 8;                       // タイル桁数
const TILEROW    = 41;                      // タイル行数
const TILESIZE   = 32;                      // タイルサイズ（ドット）
const WNDSTYLE   = "rgba( 0, 0, 0, 0.75 )"; // ウィンドウの色

let gFrame = 0;                    // 内部カウンタ
let gHeight;                       // 実画面の高さ
let gWidth;                        // 実画面の幅
let gImgMap;                       // 画像。マップ
let gImgPlayer;                    // 画像。プレイヤー
let gPlayerX = START_X * TILESIZE; // プレイヤー座標X
let gPlayerY = START_Y * TILESIZE; // プレイヤー座標Y
let gScreen;                       // 仮想画面

const gFileMap    = "img/map.png";
const gFilePlayer = "img/player.png";

// マップ
const gMap1 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

const gMap2 = [
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', 6, 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', 6, 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', 6, 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', 6, 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', 6, 6, 6, 6, 6, 6, 6, 6, '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', 6, 6, 6, 6, 6, 6, 6, 6, '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
];

function DrawMain(){

  const g = gScreen.getContext("2d");          // 仮想画面の2D描画コンテキストを取得

  let mx = Math.floor( gPlayerX / TILESIZE );  // X軸方向に1タイル分移動した際のプレイヤー位置
  let my = Math.floor( gPlayerY / TILESIZE );  // Y軸方向に1タイル分移動した際のプレイヤー位置

  for( let dy = -10; dy <= 10 ; dy++ ){        // Y軸方向にタイルを敷き詰めるための繰り返し処理(画面中央が基準)
    let y  = dy + 10;                          // 画面中央を基準としてタイルを敷き詰めた際、左上を原点とするためのY座標調整
    let ty = my + dy;                          // タイル座標Y
    let py = ( ty + MAP_HEIGHT ) % MAP_HEIGHT; // ループ後タイル座標Y
    for( let dx = -15; dx <= 15; dx++ ){       // X軸方向にタイルを敷き詰めるための繰り返し処理(画面中央が基準)
      let x  = dx + 15;                        // 画面中央を基準としてタイルを敷き詰めた際、左上を原点とするためのX座標調整
      let tx = mx + dx;                        // タイル座標X
      let px = ( tx + MAP_WIDTH ) % MAP_WIDTH; // ループ後タイル座標X
      
      DrawTile( g, x * TILESIZE - TILESIZE / 2, 
                y * TILESIZE - TILESIZE / 2, gMap1[ py * MAP_WIDTH + px ]);
      DrawTile( g, x * TILESIZE - TILESIZE / 2, 
                y * TILESIZE - TILESIZE / 2, gMap2[ py * MAP_WIDTH + px ]); 
    } 
  }
  
  g.fillStyle = "#ff0000";                  // 基準線の色
  g.fillRect(0, HEIGHT / 2 - 1, WIDTH, 2);  // Y座標基準線
  g.fillRect(WIDTH / 2 - 1, 0, 2, HEIGHT);  // X座標基準線

  g.drawImage(gImgPlayer,
              0, 0, CHRWIDTH, CHRHEIGHT,
              WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT / 2, CHRWIDTH, CHRHEIGHT);
  
  g.fillStyle = WNDSTYLE                           // ウィンドウの色
  g.fillRect( WIDTH / 8, HEIGHT - (HEIGHT / 6),    // ウィンドウの座標
              WIDTH - WIDTH / 4, HEIGHT / 8 );     // ウィンドウの大きさ
  g.font = FONT;                                   // 文字フォントwp設定
  g.fillStyle = FONTSTYLE;                         // 文字色
  g.fillText("x=" + gPlayerX + " y=" + gPlayerY +  // X座標、Y座標
             " m=" + gMap2[ my * MAP_WIDTH + mx],  // プレイヤー座標のブロック番号
             WIDTH / 6, HEIGHT - (HEIGHT / 12));   // デバッグテキスト座標
}

function DrawTile(g, x, y, idx){

  const ix = (idx % TILECOLUMN) * TILESIZE;
  const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
  g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE );
}

function LoadImage(){

  gImgMap    = new Image();　gImgMap.src    = gFileMap;     // マップ画像読み込み
  gImgPlayer = new Image();　gImgPlayer.src = gFilePlayer;  // プレイヤー画像読み込み
}

function WmPaint(){

  DrawMain();

  const ca = document.getElementById("main"); // mainキャンバスの要素を取得
  const g = ca.getContext("2d");              // 2D描画コンテキストを取得
  g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH; // 補間処理
 
   // 仮想画面のイメージを実画面へ転送
   // →元イメージの座標(0, 0)から幅gScreen高さgScreenの範囲を使用して、
   //  座標(0, 0)の位置にサイズca.width * ca.heightでイメージを表示
  g.drawImage( gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight );
  

}
// ブラウザサイズ変更イベント
function WmSize(){

  const ca = document.getElementById("main"); // mainキャンバスの要素を取得
  ca.width = window.innerWidth;               // キャンバスの幅をブラウザの幅へ変更
  ca.height = window.innerHeight;             // キャンバスの高さをブラウザの高さへ変更

  // 実画面を計測。ドットのアスペクト比を維持したままでの最大サイズを計測する。
  gWidth =  ca.width;
  gHeight =  ca.height;
  if( gWidth / WIDTH < gHeight / HEIGHT){
    gHeight = gWidth * HEIGHT / WIDTH;
  }else{
    gWidth = gHeight * WIDTH / HEIGHT;
  }
}


// タイマーイベント発生時の処理
function WmTimer(){

  gFrame++;  // 内部カウンタを加算
  WmPaint();
}

// キー入力（DOWN）イベント
window.onkeydown = function( ev ){
  let c = ev.keyCode;       // キーコード取得

  if( c == 37 ) gPlayerX--; // 左
  if( c == 38 ) gPlayerY--; // 上
  if( c == 39 ) gPlayerX++; // 右
  if( c == 40 ) gPlayerY++; // 下

  // マップループ処理
  gPlayerX += ( MAP_WIDTH  * TILESIZE );   // 座標がマイナスされたらマップ幅分プラスする
  gPlayerX %= ( MAP_WIDTH  * TILESIZE );   // 座標がプラスされたらマップ幅に対しての余りを代入する
  gPlayerY += ( MAP_HEIGHT * TILESIZE );   // 座標がマイナスされたらマップ高さ分プラスする
  gPlayerY %= ( MAP_HEIGHT * TILESIZE );   // 座標がプラスされたらマップ高さに対しての余りを代入する

}

// ブラウザ起動イベント
window.onload = function(){

  LoadImage();
  
  gScreen = document.createElement( "canvas" );         // 仮想画面を作成
  gScreen.width = WIDTH;                                // 仮想画面の幅を設定
  gScreen.height = HEIGHT;                              // 仮想画面の高さを設定
  
  WmSize();                                             // 画面サイズ初期化
  window.addEventListener( "resize", function(){ WmSize() }); // ブラウザサイズ変更時、WmSize()が呼ばれるよう指示
  setInterval( function(){WmTimer(), 33});    // 33ms間隔で、WmTimer()を呼び出すよう指示（約30.3fps）
}