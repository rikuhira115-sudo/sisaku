/* ゲーム王国 共通UI：勝敗は盤面を覆わず、ステータス欄に表示 */
(function(){
 const css = `
 .kit-actions{display:flex;justify-content:center;gap:6px;flex-wrap:nowrap;margin:8px auto 10px;padding:0 6px}
 .kit-btn{border:1px solid #34415a;background:#111827;color:#fff;border-radius:10px;padding:9px 10px;font-size:.78rem;line-height:1.1;font-weight:800;white-space:nowrap;cursor:pointer;touch-action:manipulation}
 .kit-btn.primary{background:#2563eb;border-color:#4f7cff}.kit-btn:active{transform:scale(.96)}
 .kit-modal{position:fixed;inset:0;background:rgba(2,5,12,.86);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px;z-index:10000}
 .kit-panel{width:min(92vw,460px);background:#111827;border:1px solid #33415c;border-radius:22px;padding:24px;box-shadow:0 20px 60px #0009}
 .kit-panel h2{margin:0 0 10px}.kit-panel p{line-height:1.75;color:#cbd5e1;text-align:left}
 .kit-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
 .kit-status-result,#info.kit-status-result,#status.kit-status-result,#stat.kit-status-result,#msg.kit-status-result,#over.kit-status-result{display:block;box-sizing:border-box;width:fit-content;max-width:94vw;margin:8px auto;padding:9px 14px;border:1px solid #60a5fa;border-radius:12px;background:linear-gradient(135deg,#102b48,#102019);color:#f8fafc!important;text-align:center;font-weight:900;line-height:1.45;box-shadow:0 4px 14px #0005}
 .kit-hidden{display:none!important}
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
   const statusSelector="#info, #status, #stat, #msg, #over";
   let fallback=null;
   const getStatus=()=>document.querySelector(statusSelector);
   const showResult=(text)=>{
    let target=getStatus();
    if(!target){
     if(!fallback){fallback=document.createElement("div");fallback.className="kit-status-result";fallback.setAttribute("role","status");fallback.setAttribute("aria-live","polite");actions.insertAdjacentElement("afterend",fallback)}
     target=fallback;
    }
    target.textContent=text||"ゲーム終了";
    target.classList.add("kit-status-result");
   };
   const clearResult=()=>{
    document.querySelectorAll(".kit-status-result").forEach(el=>el.classList.remove("kit-status-result"));
    if(fallback){fallback.remove();fallback=null}
   };
   const finish=(text)=>showResult(text);
   GameKit.finish=finish;
   const closeHow=()=>modal.classList.add("kit-hidden"),openHow=()=>modal.classList.remove("kit-hidden");
   // Games that update their own status directly (without GameKit.finish) get the same compact result styling.
   const watchStatus=()=>{
    const target=getStatus();if(!target)return;
    const paint=()=>{
     const t=(target.textContent||"").trim();
     if(/ゲームオーバー|勝ち|負け|引き分け|クリア|フライング|タイムアウト|時間切れ|失敗|終了|新記録|盤面制覇|詰み/.test(t))target.classList.add("kit-status-result");
    };
    paint();
    new MutationObserver(paint).observe(target,{childList:true,subtree:true,characterData:true});
   };
   watchStatus();
   restart.onclick=()=>{closeHow();clearResult();if(o.onRestart)o.onRestart()};
   how.onclick=openHow;document.getElementById("kitClose").onclick=closeHow;
   back.onclick=()=>location.href="index.html";
   return {modal,openHow,closeHow,restart,finish};
  }
 };
})();