var fundo, fundo_image;
var jogador, jogador_correndo, jogador_morte;
var dinheiro, dinheiro_image, gemas, gemas_image, diamante, diamante_image;
var espada, espada_image;
var gameOver, gameOver_image;
var estadoJogo = 'JOGAR', ENCERRAR;
var grupoDinheiro, grupoGemas, grupoDiamante, grupoEspadas;
var sorteio;
var pontuacao = 0;

function preload(){
  fundo_image = loadImage('Road.png');
  jogador_correndo = loadAnimation('Runner-1.png', 'Runner-2.png');
  dinheiro_image = loadImage('cash.png');
  gemas_image = loadImage('jwell.png');
  diamante_image = loadImage('diamonds.png');
  espada_image = loadImage('sword.png');
  gameOver_image = loadImage('gameOver.png');
  jogador_morte = loadImage('Runner-1.png');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  fundo = createSprite(width/2, 0, 400, 600);
  fundo.addImage('fundo_image', fundo_image);
  jogador = createSprite(width - 200, height - 70, 100, 100);
  jogador.addAnimation('jogador_correndo', jogador_correndo);
  gameOver = createSprite(height - 200, height - 300, 200, 100);
  gameOver.addImage('gameOver_image', gameOver_image);
  gameOver.visible = false;
  
  grupoDinheiro = new Group();
  grupoGemas = new Group();
  grupoDiamante = new Group();
  grupoEspadas = new Group();
}

function draw() {
  background('white');
  jogador.x = mouseX;
  jogador.scale = 0.1;
  fundo.velocityY = 4;
  if(fundo.y > height) {
    fundo.y = 0;
  }
  if(jogador.isTouching(grupoDinheiro)) {
    pontuacao += 100;
    grupoDinheiro.destroyEach();
  }
  if(jogador.isTouching(grupoGemas)) {
    pontuacao += 150;
    grupoGemas.destroyEach();
  }
  if(jogador.isTouching(grupoDiamante)) {
    pontuacao += 300;
    grupoDiamante.destroyEach();
  }
  if(jogador.isTouching(grupoEspadas)) {
    estadoJogo = ENCERRAR;
  }
  if(estadoJogo === ENCERRAR) {
    stop();
  }
  objetos();
  drawSprites();
  fill('black');
  textSize(20);
  text('Pontuação: '+ pontuacao, width - 260, height - 550);
}
function objetos() {
  if(frameCount% 200 === 0) {
    sorteio = Math.round(random(1,4));
    switch(sorteio) {
        case 1: dinheiro = createSprite(Math.round(random(50, width - 50), height - height - 10, 30, 30)); dinheiro.addImage('dinheiro_image', dinheiro_image); dinheiro.scale = 0.1; dinheiro.velocityY = 3; dinheiro.lifetime = height/dinheiro.velocityY + 10; grupoDinheiro.add(dinheiro);
        break;
        case 2: gemas = createSprite(Math.round(random(50, width - 50), height - height - 10, 30, 30)); gemas.addImage('gemas_image', gemas_image); gemas.scale = 0.1; gemas.velocityY = 3; gemas.lifetime = height/gemas.velocityY + 10; grupoGemas.add(gemas);
        break;
        case 3: diamante = createSprite(Math.round(random(50, width - 50), height - height - 10, 30, 30)); diamante.addImage('diamante_image', diamante_image); diamante.scale = 0.03; diamante.velocityY = 3; diamante.lifetime = height/diamante.velocityY + 10; grupoDiamante.add(diamante);
        break;
        case 4: espada = createSprite(Math.round(random(50, width - 50), height - height - 10, 30, 30)); espada.addImage('espada_image', espada_image); espada.scale = 0.1; espada.velocityY = 3; espada.lifetime = height/espada.velocityY + 10; grupoEspadas.add(espada);
        break;
    }
  }
}
function stop() {
    gameOver.visible = true;
    fundo.velocityY = 0;
    grupoDinheiro.setLifetimeEach(-1);
    grupoGemas.setLifetimeEach(-1);
    grupoDiamante.setLifetimeEach(-1);
    grupoEspadas.setLifetimeEach(-1);
    grupoDinheiro.destroyEach();
    grupoGemas.destroyEach();
    grupoDiamante.destroyEach();
    grupoEspadas.destroyEach();
    jogador.visible = false;
    jogador.x = width + 500;
    jogador.y = height + 800;
}