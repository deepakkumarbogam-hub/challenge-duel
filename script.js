const MAIN_TASKS = [
"🎤 Sing the chorus of your favorite song","💃 Dance without music for 30 seconds","🎬 Say a famous movie dialogue dramatically",
"😂 Make the other player laugh in 20 seconds","🕺 Do your best dance move","🎭 Imitate a famous actor",
"🎵 Sing a song chosen by the other player","🗣️ Speak in a different accent for 1 minute","😎 Give yourself a funny celebrity-style introduction",
"🎬 Recreate a movie scene using only expressions","🐒 Imitate an animal until the other player guesses it","🎤 Sing a song without using the letter A",
"💪 Do 15 squats","😂 Tell your worst joke with a completely serious face","🎭 Act like a strict teacher for 30 seconds",
"🧠 Name 10 movies in 20 seconds","🎵 Hum a song until the other player guesses it","📢 Give a dramatic advertisement for a random object nearby",
"🕺 Do a slow-motion dance for 30 seconds","🎬 Act out a movie title without speaking","😈 Give the other player a funny nickname",
"🎤 Sing a song in a completely different style","🧑‍🏫 Explain how to make tea like you're teaching a class","😂 Laugh continuously for 20 seconds without stopping",
"🎭 Pretend you're receiving an award and give a speech","🗣️ Speak only in questions for 1 minute","🎬 Recreate a famous movie character",
"💃 Make up your own dance move and name it","🧠 Name 10 foods in 15 seconds","🎤 Sing Happy Birthday like an opera singer",
"📺 Act like a news reporter reporting breaking news","😂 Make a funny face and hold it for 20 seconds","🕺 Dance like nobody is watching for 45 seconds",
"🎭 Pretend you're a villain explaining your evil plan","🎤 Sing the first song that comes to your mind","🧠 Name 10 countries in 20 seconds",
"📱 Pretend you're a famous influencer recording a video","🎬 Perform a dramatic breakup scene with an imaginary person","🐔 Walk and act like a chicken for 20 seconds",
"😂 Tell a joke using three random words chosen by the other player","🎤 Sing a song while doing a silly dance","🗣️ Say a tongue twister three times quickly",
"🎭 Pretend you're a waiter dealing with the world's worst customer","🧠 Name 10 things that start with the letter S","🎬 Act like a superhero who has completely useless powers",
"💃 Create a 15-second dance routine","🎤 Sing a song using only la la la","😂 Give a motivational speech about something completely ridiculous",
"🎭 Imitate the other player until they guess what you're doing","🏆 Give a 30-second speech explaining why you deserve to win this game"
];

const PUNISHMENTS = [
"Do 10 jumping jacks","Hold a funny pose for 30 seconds","Speak like a robot for 1 minute","Do 10 squats",
"Sing one line of a song chosen by the other player","Do your funniest dance for 20 seconds","Talk without moving your lips for 30 seconds","Do 5 push-ups",
"Walk like a penguin for 30 seconds","Make 3 different animal sounds","Balance on one leg for 30 seconds","Say the alphabet backwards as far as you can",
"Do a dramatic slow-motion walk","Pretend you're a chicken for 30 seconds","Do 15 jumping jacks","Speak in a baby voice for 1 minute",
"Do your best evil laugh","Hold a plank for 20 seconds","Dance without moving your feet","Pretend you're stuck in an invisible box",
"Do 10 lunges","Talk like a news reporter for 30 seconds","Make your funniest face","Do 10 high knees",
"Sing using only la la la","Walk backwards for 30 seconds","Do a celebrity impression","Freeze like a statue for 45 seconds",
"Do 10 mountain climbers","Pretend to be a waiter serving an imaginary customer","Say a tongue twister 3 times","Dance in slow motion for 30 seconds",
"Do 10 sit-ups","Give yourself a ridiculous nickname","Pretend you're accepting an Oscar","Make 5 different facial expressions",
"Act like a superhero for 30 seconds","Do 10 calf raises","Speak with a fake accent for 1 minute","Pretend you're being interviewed on TV",
"Do your best runway walk","Hold a ridiculous pose for 30 seconds","Imitate an animal chosen by the other player","Do 10 squats while counting dramatically",
"Pretend you're a villain for 30 seconds","Dance like a robot for 30 seconds","Do 10 alternating lunges","Give a motivational speech to an imaginary potato",
"Perform a dramatic movie death scene","Let the other player choose a harmless 30-second challenge"
];

let state = {
  players:["",""], scores:[0,0], round:0, starter:0, currentPlayer:0,
  remainingTasks:[], remainingPunishments:[], assignments:[], usedTasks:new Set(),
  usedPunishments:new Set(), completedNumbers:new Set(), phase:"setup",
  roundsData:[]
};

const $ = id => document.getElementById(id);
const main = $("appMain");

function shuffle(a){ a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function initPools(){ state.remainingTasks = [...Array(50).keys()]; state.remainingPunishments=[...Array(50).keys()]; state.assignments=[]; state.completedNumbers=new Set(); }
function taskAssignment(){
  const nums = shuffle(state.remainingTasks);
  state.assignments = nums.slice(0, state.remainingTasks.length).map((taskIndex,i)=>({num:i+1,taskIndex}));
}
function toast(msg){const d=document.createElement("div");d.className="toast";d.innerHTML=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
function updateTop(){ $("roundPill").textContent=`ROUND ${state.round} / 20`; }
function render(){
  updateTop();
  if(state.phase==="setup") return renderSetup();
  if(state.phase==="start") return renderStarter();
  if(state.phase==="spin") return renderSpin();
  if(state.phase==="task") return renderTask();
  if(state.phase==="punishChoice") return renderPunishChoice();
  if(state.phase==="punishResult") return renderPunishResult();
  if(state.phase==="final") return renderFinal();
}
function renderSetup(){
 main.innerHTML=`<section class="screen hero"><h1>Challenge Duel</h1><p>20 rounds • 50 shuffled challenges • risk, luck & punishment</p>
 <div class="card form-grid"><div class="field"><label>PLAYER A</label><input id="p1" placeholder="Enter first player name"></div>
 <div class="field"><label>PLAYER B</label><input id="p2" placeholder="Enter second player name"></div>
 <button class="primary" id="begin">Start the Duel →</button></div></section>`;
 $("begin").onclick=()=>{let a=$("p1").value.trim(),b=$("p2").value.trim();if(!a||!b){toast("Please enter both player names.");return}
 state.players=[a,b];state.scores=[0,0];state.round=0;state.currentPlayer=0;initPools();state.phase="start";render();};
}
function renderScores(){
 return `<div class="scoreboard">${state.players.map((p,i)=>`<div class="score"><div class="name">${i===state.currentPlayer?"🎯 ":""}${p}</div><div class="pts">${state.scores[i]} ⭐</div></div>`).join("")}</div>`;
}
function renderStarter(){
 main.innerHTML=`<section class="screen"><div class="hero"><div class="big-icon">🎡</div><h1>Who Starts?</h1><p>Fate chooses the first challenger.</p>
 <div class="card start-card center"><div class="spinner" id="starterSpinner"><span>?</span></div><button class="gold" id="startSpin">SPIN FOR STARTER</button></div></div></section>`;
 $("startSpin").onclick=()=>{
   $("startSpin").disabled=true;let s=$("starterSpinner"),sp=s.querySelector("span");s.classList.add("spinning");
   let t=0;const iv=setInterval(()=>{sp.textContent=Math.random()<.5?"A":"B";t+=100;if(t>2800){clearInterval(iv);s.classList.remove("spinning");state.starter=Math.random()<.5?0:1;state.currentPlayer=state.starter;sp.textContent=state.players[state.starter][0].toUpperCase();toast(`<strong>${state.players[state.starter]}</strong> starts!`);setTimeout(nextRound,900)}},100);
 };
}
function nextRound(){
 state.round++; taskAssignment(); state.phase="spin"; render();
}
function renderBoard(){
 const tiles=[]; for(let n=1;n<=50;n++){const done=state.completedNumbers.has(n);const available=state.remainingTasks.length>0;tiles.push(`<div class="tile ${done?"done":available?"available":""}"><span>${n<10?"0":""}${n}</span></div>`)}
 return `<div class="card"><div class="remaining">🔐 <strong>${state.remainingTasks.length} / 50</strong> challenges remaining</div><div class="board">${tiles.join("")}</div></div>`;
}
function renderSpin(){
 main.innerHTML=`<section class="screen">${renderScores()}<div class="hero"><div class="turn">${state.players[state.currentPlayer]}'S TURN</div><div class="big-icon">🎡</div><h1>Spin the Vault</h1><p>Round ${state.round} of 20 • Every remaining task is shuffled.</p>
 <div class="card start-card center"><div class="spinner" id="spinner"><span>?</span></div><button class="gold" id="spinBtn">SPIN</button></div></div>${renderBoard()}</section>`;
 $("spinBtn").onclick=()=>{
   $("spinBtn").disabled=true;let s=$("spinner"),sp=s.querySelector("span");s.classList.add("spinning");
   let t=0;const iv=setInterval(()=>{sp.textContent=Math.floor(Math.random()*50)+1;t+=100;if(t>3200){clearInterval(iv);s.classList.remove("spinning");let availableNums=state.assignments.filter(x=>!state.completedNumbers.has(x.num));let pick=availableNums[Math.floor(Math.random()*availableNums.length)];state.selected=pick;sp.textContent=pick.num;state.phase="task";setTimeout(render,900)}},100);
 };
}
function renderTask(){
 const task=MAIN_TASKS[state.selected.taskIndex];
 main.innerHTML=`<section class="screen">${renderScores()}<div class="task-card card"><div class="task-number">🔓 TASK #${state.selected.num}</div>
 <div class="task-text">${task}</div><p>Complete it for <strong>100 points</strong>, or choose punishment for <strong>60 points</strong>.</p>
 <div class="actions"><button class="success" id="complete">✓ I DID IT +100</button><button class="punish" id="punish">😈 PUNISHMENT</button></div></div>${renderBoard()}</section>`;
 $("complete").onclick=()=>completeMain();
 $("punish").onclick=()=>{state.phase="punishChoice";render()};
}
function completeMain(){
 state.scores[state.currentPlayer]+=100;
 state.remainingTasks=state.remainingTasks.filter(x=>x!==state.selected.taskIndex);
 state.completedNumbers.add(state.selected.num);
 state.roundsData.push({player:state.currentPlayer,type:"main",points:100});
 toast(`<strong>+100 ⭐</strong> ${state.players[state.currentPlayer]} completed the task!`);
 finishRound();
}
function renderPunishChoice(){
 main.innerHTML=`<section class="screen">${renderScores()}<div class="hero"><div class="big-icon">😈</div><h1>Punishment Mode</h1><p>Choose your fate. Luck or control?</p>
 <div class="choice-grid"><div class="choice"><h3>🎲 LUCK</h3><p>Let the punishment number be randomly selected.</p><button class="gold" id="randomPunish">RANDOM PUNISHMENT</button></div>
 <div class="choice"><h3>🔢 CONTROL</h3><p>You choose a number from 1 to 50.</p><input class="number-input" id="punNum" type="number" min="1" max="50" placeholder="1–50"><button class="primary" id="customPunish">REVEAL NUMBER</button></div></div></div></section>`;
 $("randomPunish").onclick=()=>revealPunishment(null);
 $("customPunish").onclick=()=>{let n=Number($("punNum").value);if(!n||n<1||n>50){toast("Choose a number from 1 to 50.");return} revealPunishment(n)};
}
function revealPunishment(custom){
 let available=[...state.remainingPunishments];
 let idx;
 if(custom){idx=custom-1;if(!available.includes(idx)){idx=available[Math.floor(Math.random()*available.length)];toast("That punishment was already used, so fate picked another one.");}}
 else idx=available[Math.floor(Math.random()*available.length)];
 state.punishmentIndex=idx; state.remainingPunishments=available.filter(x=>x!==idx);
 state.phase="punishResult";render();
}
function renderPunishResult(){
 main.innerHTML=`<section class="screen">${renderScores()}<div class="task-card card"><div class="task-number">😈 PUNISHMENT #${state.punishmentIndex+1}</div>
 <div class="task-text">${PUNISHMENTS[state.punishmentIndex]}</div><p>Complete the punishment to earn <strong>60 points</strong>.</p>
 <div class="actions"><button class="success" id="punDone">✓ COMPLETED +60</button></div></div></section>`;
 $("punDone").onclick=()=>{state.scores[state.currentPlayer]+=60;state.roundsData.push({player:state.currentPlayer,type:"punishment",points:60});toast(`<strong>+60 ⭐</strong> Punishment completed!`);finishRound()};
}
function finishRound(){
 state.completedNumbers.add(state.selected.num);
 if(state.round>=20){state.phase="final";setTimeout(render,700);return}
 state.currentPlayer=state.currentPlayer===0?1:0;
 state.phase="spin";setTimeout(render,700);
}
function renderFinal(){
 const a=state.scores[0],b=state.scores[1], winner=a===b?null:(a>b?0:1);
 const stats=i=>{let rows=state.roundsData.filter(x=>x.player===i);return {main:rows.filter(x=>x.type==="main").length,pun:rows.filter(x=>x.type==="punishment").length}};
 const sa=stats(0),sb=stats(1);
 main.innerHTML=`<section class="screen final"><div class="hero"><div class="big-icon">🏆</div><h1>20 ROUNDS COMPLETE</h1>
 <p>${winner===null?"It's a perfect tie!":`The final winner is ${state.players[winner]}.`}</p>
 <div class="card">${winner===null?`<div class="winner">DRAW 🤝</div>`:`<div class="winner">${state.players[winner]} 👑</div>`}
 <div class="stats"><div class="statbox"><h3>${state.players[0]}</h3><div class="big">${a} / 2000</div><p>🎯 Main: ${sa.main} &nbsp; 😈 Punishments: ${sa.pun}</p></div>
 <div class="statbox"><h3>${state.players[1]}</h3><div class="big">${b} / 2000</div><p>🎯 Main: ${sb.main} &nbsp; 😈 Punishments: ${sb.pun}</p></div></div>
 <p style="color:var(--muted);margin-top:25px">Every completed main task was permanently removed from the 50-task pool. Numbers were reusable; tasks were not.</p>
 <button class="primary" id="again">↻ PLAY AGAIN</button></div></div></section>`;
 $("again").onclick=()=>{state={players:["",""],scores:[0,0],round:0,starter:0,currentPlayer:0,remainingTasks:[],remainingPunishments:[],assignments:[],usedTasks:new Set(),usedPunishments:new Set(),completedNumbers:new Set(),phase:"setup",roundsData:[]};render()};
}
$("resetBtn").onclick=()=>$("confirmModal").classList.remove("hidden");
$("cancelReset").onclick=()=>$("confirmModal").classList.add("hidden");
$("confirmReset").onclick=()=>{location.reload()};
render();
