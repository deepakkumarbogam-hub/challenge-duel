// ============================================================
// ✏️ EDIT ONLY THIS LIST.
// Replace the 70 placeholders with your real tasks.
// Keep each task inside quotes and separate tasks with commas.
// ============================================================
const MAIN_TASKS = [
  "Whisper something which you wanna do it for me right now",
"Hold my hand and drive me somewhere private",
"Pick a body part and start giving wet kisses",
"Show me how you like to be touched in specific part",
"Get blindfolded for next three games",
"Nutella on waist and have a snack",
"A slow and subtle lick on my both thighs",
"Eat my ear atleast for 2 minutes",
"Undress a single peice of cloth for atleast next three games",
"Show a deep craving mouth to mouth kiss",
"Make me moan with only lips",
"A 5 minute lick on my waist",
"Stay only on inner",
"Kiss on my back of knee until i say stop",
"Make me beg you to stop while u only use ice cubes",
"Can i get my nutella fingres get cleaned ?",
"Need obsessed treatment with my nipples.",
"Ordering you to pretend asif your hands are tied and let me take what is mine....",
"Kiss ur favourite part in my body with as long as you can",
"Eat my both ears until i say i am done",
"Please be blindfolded and let me decide where to make you feel comfort.",
"Reveal a guilty pleasure and let me do it.",
"Take me as your toy and do what pleases you",
"Take out your tongue out so that i can put my choice of body part on it",
"Treat my feet as your only desire part and do what you can until i stop so",
"Skip for now and repeat next challenge twice",
"Choose between getting blindfolded nd getting dominated or blindfold me and dominate me ----7 minutes",
"I want your lips talking with my  groin until i say to stop",
"Kiss and lick my 3 moles and repeat it until a favourite song of mine is completed",
"Stand towards the wall and become statue until next 10 minutes",
"Hey, can I get my back body kissed from neck to toe every inch in a single line on all three sections left right mid",
"Talk to my nipple for atleast 7 minutes",
"Lets have a 1 minute video footage which even we feel shy to see it",
"Lets take 3 intimacy photo which is too much of body",
"Can I get my part licked until I say to stop while I sit and relax u take it from your knees without touching it.",
"Bite my nipples please",
"Do what you want with my part but only condition is u get access only from side of my pantie",
"I want you to be stuck like a blindfolded idol for next 5 mins",
"Do something with my butt as you like, tickle/kiss/bite …… anything u like",
"Blindfold the other partner and check their accuracy level can they reach their 3 parts even in blind fold only with tongue",
"Lets check can we hear moan even our partners mouth is closed with a piece of cloth, challenge time is 4 minutes.",
"Please let me know how Nutella and my foot together taste like",
"Can I get my tongue hold with your teeth and see how I moan when u hit my part of  ur choice",
"I want my area between my part and ass to be licked kissed and tasted",
"Can I get a longest lick from my belly button to my part\"s lick (wet kiss only)",
"Punish me for something as you like but condition is use only foot",
"Can I get my part eaten while eyes of the other one is closed and a Nutella flavor topic",
"Can I get slave treatment with passionate love effect",
"Sit on my face with you part’s tip on my lips",
"Eat my neck please with both the hands on other parts",
"Proper body massage on cold floor",
"Cover my face and use me like a toy for what ever you want",
"slap me and my part with a slow range of motion with feet",
"stay in a standardize position for next 4minutes",
"stay in a attention position for next 4 minutes",
"remove you phant try to touch your feet and stay for that position in 5 minutes and let you partner eat your thighs part",
"keep my part in ur mouth with no moment of lips or tongue for a favourite song of mine gets completed",
"may be I deserve ice cubes on my nipples for minimum of 4 minutes",
"can I eat nutella with your tongue",
"right now create a foreplay story and tell me which we are gonna porform when ever we can",
"pretend you are robber and rob me while I refuse for it",
"make me wear any of your cloth for next three games"

];

// 😈 You can also edit this punishment list.
const PUNISHMENTS = [
"Blindfolded and tickled for 3 minutes",
"Blindfolded and kissed for 3 minutes",
"Blindfolded and licked for 3 minutes",
"Blindfolded and teased for 3 minutes",
"Blindfolded and spanked for 3 minutes",
"Blindfolded and massaged for 3 minutes",
"Blindfolded and held in a position for 3 minutes",
"Blindfolded and whispered to for 3 minutes",
"Blindfolded and made to beg for 3 minutes",
"Blindfolded and made to perform a task for 3 minutes",
"pushup 5 naked",
"situp 5 naked",
"jumping jack 5 naked",
"hold a plank for 30 seconds naked",
"hold a wall sit for 30 seconds naked",
"do a single leg stand for 10 seconds naked",
"show my how you can lick your own body part for 30 seconds",
"show me how can your tits bounce for 30 seconds",
"show me how can your ass bounce for 30 seconds",
"show me how can your tongue touch your my choice of body part for 30 seconds",
];

const TOTAL_ROUNDS=20, MAIN_POINTS=100, PUNISHMENT_POINTS=60;
let state={players:["",""],scores:[0,0],round:0,currentPlayer:0,remainingTasks:[],remainingPunishments:[],assignments:[],doneNums:new Set(),selected:null,punishmentIndex:null,roundsData:[],phase:"setup"};
const $=id=>document.getElementById(id), main=$("appMain");
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function toast(x){let d=document.createElement("div");d.className="toast";d.innerHTML=x;document.body.appendChild(d);setTimeout(()=>d.remove(),2500)}
function render(){ $("roundPill").textContent=`ROUND ${state.round} / ${TOTAL_ROUNDS}`; ({setup:setup,start:starter,spin:spin,task:task,punish:punish,presult:presult,final:final}[state.phase])() }
function setup(){main.innerHTML=`<section class="screen hero"><div class="big">❤️</div><h1>Challenge Duel</h1><p>20 rounds • ${MAIN_TASKS.length} challenges • love, luck & chaos ✨</p><div class="card form"><div class="field"><label>PLAYER A 💗</label><input id="a" placeholder="First player"></div><div class="field"><label>PLAYER B 💕</label><input id="b" placeholder="Second player"></div><button class="primary" id="go">Start the Duel ❤️</button></div></section>`;$("go").onclick=()=>{let a=$("a").value.trim(),b=$("b").value.trim();if(!a||!b)return toast("💗 Enter both names.");state.players=[a,b];state.scores=[0,0];state.round=0;state.currentPlayer=0;state.roundsData=[];state.remainingTasks=[...Array(MAIN_TASKS.length).keys()];state.remainingPunishments=[...Array(PUNISHMENTS.length).keys()];state.doneNums=new Set();state.phase="start";render()}}
function scores(){return `<div class="scoreboard">${state.players.map((p,i)=>`<div class="score ${i===state.currentPlayer?"active":""}"><b>${i===state.currentPlayer?"🎯 ":""}${p}</b><div class="pts">${state.scores[i]} ⭐</div></div>`).join("")}</div>`}
function starter(){main.innerHTML=`<section class="screen hero"><div class="big">💞</div><h1>Who Starts?</h1><p>Let the heart decide.</p><div class="card"><div class="spinner" id="ss"><span>❤️</span></div><button class="gold" id="sb">💘 Spin for Starter</button></div></section>`;$("sb").onclick=()=>{let s=$("ss"),x=s.querySelector("span"),t=0;$("sb").disabled=true;s.classList.add("spinning");let iv=setInterval(()=>{x.textContent=Math.random()<.5?"💗":"💖";t+=100;if(t>2800){clearInterval(iv);s.classList.remove("spinning");state.currentPlayer=Math.random()<.5?0:1;x.textContent="❤️";toast(`🎉 <strong>${state.players[state.currentPlayer]}</strong> starts!`);setTimeout(nextRound,800)}},100)}}
function nextRound(){state.round++;state.assignments=shuffle(state.remainingTasks).map((taskIndex,i)=>({num:i+1,taskIndex}));state.phase="spin";render()}
function board(){let out="";for(let n=1;n<=MAIN_TASKS.length;n++)out+=`<div class="tile ${state.doneNums.has(n)?"done":""}">${n}</div>`;return `<div class="card"><div class="remaining">🔐 <strong>${state.remainingTasks.length} / ${MAIN_TASKS.length}</strong> challenges remaining</div><div class="board">${out}</div></div>`}
function spin(){main.innerHTML=`<section class="screen">${scores()}<div class="hero"><b>🎯 ${state.players[state.currentPlayer]}'S TURN</b><h1>Spin the Vault</h1><p>Round ${state.round} of ${TOTAL_ROUNDS}</p><div class="card"><div class="spinner" id="sp"><span>?</span></div><button class="gold" id="goSpin">🎡 SPIN</button></div></div>${board()}</section>`;$("goSpin").onclick=()=>{let sp=$("sp"),x=sp.querySelector("span"),t=0;$("goSpin").disabled=true;sp.classList.add("spinning");let iv=setInterval(()=>{x.textContent=Math.floor(Math.random()*state.assignments.length)+1;t+=100;if(t>3300){clearInterval(iv);sp.classList.remove("spinning");let avail=state.assignments.filter(v=>!state.doneNums.has(v.num));state.selected=avail[Math.floor(Math.random()*avail.length)];x.textContent=state.selected.num;state.phase="task";setTimeout(render,800)}},100)}}
function task(){let text=MAIN_TASKS[state.selected.taskIndex];main.innerHTML=`<section class="screen">${scores()}<div class="card task"><div class="tasknum">🔓 TASK #${state.selected.num}</div><div class="tasktext">${text}</div><p>Complete: <b>+${MAIN_POINTS}</b> ⭐ &nbsp; | &nbsp; Punishment: <b>+${PUNISHMENT_POINTS}</b> ⭐</p><div class="actions"><button class="success" id="done">🎉 I DID IT +${MAIN_POINTS}</button><button class="punish" id="p">😈 Punishment</button></div></div>${board()}</section>`;$("done").onclick=complete;$("p").onclick=()=>{state.phase="punish";render()}}
function celebration(points,emoji){state.scores[state.currentPlayer]+=points;toast(`${emoji} <strong>+${points} POINTS!</strong> ${state.players[state.currentPlayer]} completed it! 🎉❤️`);for(let i=0;i<16;i++)setTimeout(()=>spawn(true),i*40)}
function complete(){celebration(MAIN_POINTS,"🎉");state.remainingTasks=state.remainingTasks.filter(x=>x!==state.selected.taskIndex);state.doneNums.add(state.selected.num);state.roundsData.push({player:state.currentPlayer,type:"main"});finish()}
function punish(){main.innerHTML=`<section class="screen">${scores()}<div class="hero"><div class="big">😈</div><h1>Punishment Mode</h1><p>Choose <b>Luck</b> or <b>Control</b>.</p><div class="choicegrid"><div class="choice"><h2>🎲 LUCK</h2><p>Random unused punishment.</p><button class="gold" id="rand">🎲 Random</button></div><div class="choice"><h2>🔢 CONTROL</h2><p>Choose a number.</p><input class="number" id="pn" type="number" min="1" max="${PUNISHMENTS.length}" placeholder="1–${PUNISHMENTS.length}"><br><button class="primary" id="custom">🔓 Reveal</button></div></div></div></section>`;$("rand").onclick=()=>reveal(null);$("custom").onclick=()=>{let n=+$("pn").value;if(n<1||n>PUNISHMENTS.length)return toast(`Choose 1–${PUNISHMENTS.length}.`);reveal(n)}}
function reveal(n){let a=state.remainingPunishments;if(!a.length)return toast("All punishments have been used.");let idx=n?n-1:a[Math.floor(Math.random()*a.length)];if(!a.includes(idx))idx=a[Math.floor(Math.random()*a.length)];state.punishmentIndex=idx;state.remainingPunishments=a.filter(x=>x!==idx);state.phase="presult";render()}
function presult(){main.innerHTML=`<section class="screen">${scores()}<div class="card task"><div class="tasknum">😈 PUNISHMENT #${state.punishmentIndex+1}</div><div class="tasktext">${PUNISHMENTS[state.punishmentIndex]}</div><p>Complete it for <b>+${PUNISHMENT_POINTS}</b> ⭐</p><button class="success" id="pd">🔥 COMPLETED +${PUNISHMENT_POINTS}</button></div></section>`;$("pd").onclick=()=>{celebration(PUNISHMENT_POINTS,"😈");state.remainingTasks=state.remainingTasks.filter(x=>x!==state.selected.taskIndex);state.doneNums.add(state.selected.num);state.roundsData.push({player:state.currentPlayer,type:"punishment"});finish()}}
function finish(){if(state.round>=TOTAL_ROUNDS){state.phase="final";return setTimeout(render,700)}state.currentPlayer=1-state.currentPlayer;state.phase="spin";setTimeout(render,700)}
function final(){let a=state.scores[0],b=state.scores[1],w=a===b?-1:a>b?0:1;let st=i=>{let r=state.roundsData.filter(x=>x.player===i);return [r.filter(x=>x.type==="main").length,r.filter(x=>x.type==="punishment").length]};let sa=st(0),sb=st(1);main.innerHTML=`<section class="screen hero"><div class="big">🏆❤️</div><h1>20 ROUNDS COMPLETE!</h1><div class="card"><div class="winner">${w<0?"DRAW 🤝":state.players[w]+" 👑"}</div><div class="stats"><div class="stat"><h2>${state.players[0]}</h2><div class="pts">${a} ⭐</div><p>🎯 Main ${sa[0]} • 😈 Punishments ${sa[1]}</p></div><div class="stat"><h2>${state.players[1]}</h2><div class="pts">${b} ⭐</div><p>🎯 Main ${sb[0]} • 😈 Punishments ${sb[1]}</p></div></div><p style="color:var(--muted)">Completed tasks are permanently removed. Numbers may repeat, tasks may not. ❤️</p><button class="primary" id="again">❤️ Play Again</button></div></section>`;for(let i=0;i<25;i++)setTimeout(()=>spawn(true),i*40);$("again").onclick=resetGame}
function resetGame(){state={players:["",""],scores:[0,0],round:0,currentPlayer:0,remainingTasks:[],remainingPunishments:[],assignments:[],doneNums:new Set(),selected:null,punishmentIndex:null,roundsData:[],phase:"setup"};render()}
$("resetBtn").onclick=()=>$("confirmModal").classList.remove("hidden");$("cancelReset").onclick=()=>$("confirmModal").classList.add("hidden");$("confirmReset").onclick=()=>{$("confirmModal").classList.add("hidden");resetGame()};

// Timer with generated browser audio: no external music file required.
let secs=0,interval=null,running=false,minutes=3,audio=null;
function audioOn(){try{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==="suspended")audio.resume()}catch(e){}}
function tone(freq,d=.06,vol=.025){try{audioOn();let o=audio.createOscillator(),g=audio.createGain();o.frequency.value=freq;g.gain.value=vol;o.connect(g);g.connect(audio.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+d);o.stop(audio.currentTime+d)}catch(e){}}
function melody(){let sets=[[523,659,784,1047],[392,523,659,784],[659,784,988,1319],[440,554,659,880]],n=sets[Math.floor(Math.random()*sets.length)];n.forEach((f,i)=>setTimeout(()=>tone(f,.22,.05),i*170));setTimeout(()=>tone(n[3]*1.5,.4,.04),750)}
function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function showTimer(){$("timerDisplay").textContent=fmt(secs)}
document.querySelectorAll(".timer-options button").forEach(b=>b.onclick=()=>{minutes=+b.dataset.min;secs=minutes*60;showTimer();document.querySelectorAll(".timer-options button").forEach(x=>x.classList.remove("active"));b.classList.add("active")});
$("timerFab").onclick=()=>$("timerPanel").classList.toggle("hidden");$("closeTimer").onclick=()=>$("timerPanel").classList.add("hidden");
$("startTimer").onclick=()=>{audioOn();if(!secs){secs=minutes*60;showTimer()}if(running)return;running=true;tone(900);interval=setInterval(()=>{secs--;showTimer();if(secs>0)tone(700,.045,.018);if(secs<=0){clearInterval(interval);interval=null;running=false;melody();toast("⏰ <strong>TIME'S UP!</strong> 🎉❤️")}},1000)};
$("pauseTimer").onclick=()=>{clearInterval(interval);interval=null;running=false};$("stopTimer").onclick=()=>{clearInterval(interval);interval=null;running=false;secs=0;showTimer()};

// Continuous love/party art
const symbols=["❤️","💖","💕","💗","💓","💘","💝","✨","🌟","💫","🌹"];
function spawn(extra=false){let d=document.createElement("div");d.className="heart";d.textContent=symbols[Math.floor(Math.random()*symbols.length)];d.style.left=Math.random()*100+"%";d.style.fontSize=(16+Math.random()*28)+"px";d.style.animationDuration=(extra?2.5:5+Math.random()*8)+"s";$("hearts").appendChild(d);setTimeout(()=>d.remove(),15000)}
setInterval(()=>spawn(),550);for(let i=0;i<12;i++)setTimeout(spawn,i*200);
render();
