/* ゲーム王国 共通UI */
(function(){
 const css=`
 .kit-actions{display:flex;justify-content:center;gap:6px;flex-wrap:nowrap;margin:8px auto 10px;padding:0 6px}
 .kit-btn{border:1px solid #34415a;background:#111827;color:#fff;border-radius:10px;padding:9px 10px;font-size:.78rem;line-height:1.1;font-weight:800;white-space:nowrap;cursor:pointer;touch-action:manipulation}
 .kit-btn.primary{background:#2563eb;border-color:#4f7cff}.kit-btn:active{transform:scale(.96)}
 .kit-modal{position:fixed;inset:0;background:rgba(2,5,12,.86);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px;z-index:10000}
 .kit-panel{width:min(92vw,460px);background:#111827;border:1px solid #33415c;border-radius:22px;padding:24px;box-shadow:0 20px 60px #0009}
 .kit-panel h2{margin:0 0 10px}.kit-panel p{line-height:1.75;color:#cbd5e1;text-align:left}
 .kit-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.kit-hidden{display:none!important}
 `;
 const style=document.createElement("style");style.textContent=css;document.head.appendChild(style);
 window.GameKit={
  mount:function(o){
   const actions=document.createElement("div");actions.className="kit-actions";
   const restart=document.createElement("button");restart.className="kit-btn";restart.textContent="最初から";
   const how=document.createElement("button");how.className="kit-btn";how.textContent="遊び方";
   const back=document.createElement("button");back.className="kit-btn";back.textContent="ゲーム王国";
   actions.append(restart,how,back);
   document.body.insertBefore(actions,document.body.children[1]||null);
   const modal=document.createElement("div");modal.className="kit-modal kit-hidden";
   modal.innerHTML='<div class="kit-panel"><h2>📖 遊び方</h2><p>'+(o.howto||"画面の指示に従って遊んでください。")+'</p><div class="kit-row"><button class="kit-btn primary" id="kitClose">閉じる</button></div></div>';
   document.body.appendChild(modal);
   const finishLayer=document.createElement("div");finishLayer.className="kit-modal kit-hidden";finishLayer.id="kitFinish";
   finishLayer.innerHTML='<div class="kit-panel" style="text-align:center"><div style="font-size:2.8rem">🏁</div><h2 id="kitFinishTitle">ゲーム終了</h2><p id="kitFinishText" style="text-align:center"></p><div class="kit-row"><button class="kit-btn primary" id="kitAgain">もう一回</button><button class="kit-btn" id="kitBack">ゲーム王国へ戻る</button></div></div>';
   document.body.appendChild(finishLayer);
   const closeHow=()=>modal.classList.add("kit-hidden"),openHow=()=>modal.classList.remove("kit-hidden");
   const finish=(text)=>{if(finishLayer.classList.contains("kit-hidden")){document.getElementById("kitFinishText").textContent=text||"";finishLayer.classList.remove("kit-hidden")}};
   const closeFinish=()=>finishLayer.classList.add("kit-hidden");
   GameKit.finish=finish;
   document.getElementById("kitAgain").onclick=()=>{closeFinish();if(o.onRestart)o.onRestart()};
   document.getElementById("kitBack").onclick=()=>location.href="index.html";
   const infoEl=document.getElementById("info");
   if(infoEl){let ready=true;const observer=new MutationObserver(()=>{if(!ready)return;const t=(infoEl.textContent||"").trim();if(/ゲームオーバー|勝ち|負け|引き分け|クリア|クリア！|全ブロック破壊|フライング|記録を保存|タイムアウト|終了/.test(t))finish(t)});observer.observe(infoEl,{childList:true,subtree:true,characterData:true})}
   restart.onclick=()=>{closeHow();closeFinish();if(o.onRestart)o.onRestart()};
   how.onclick=openHow;document.getElementById("kitClose").onclick=closeHow;
   back.onclick=()=>location.href="index.html";
   return {modal,openHow,closeHow,restart,finish};
  }
 };
})();