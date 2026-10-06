/* ゲーム王国 共通UI */
(function(){
  const css=`
  .kit-actions{display:flex;justify-content:center;gap:6px;flex-wrap:nowrap;margin:8px auto 10px;padding:0 6px}
  .kit-btn{border:1px solid #34415a;background:#111827;color:#fff;border-radius:10px;padding:9px 10px;font-size:.78rem;line-height:1.1;font-weight:800;white-space:nowrap;cursor:pointer;touch-action:manipulation}
  .kit-btn.primary{background:#2563eb;border-color:#4f7cff}.kit-btn.start{background:#16a34a;border-color:#4ade80}
  .kit-btn:active{transform:scale(.96)}
  .kit-overlay,.kit-modal{position:fixed;inset:0;background:rgba(2,5,12,.86);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:18px;z-index:10000}
  .kit-panel{width:min(92vw,460px);background:#111827;border:1px solid #33415c;border-radius:22px;padding:24px;box-shadow:0 20px 60px #0009}
  .kit-panel h2{margin:0 0 10px}.kit-panel p{line-height:1.75;color:#cbd5e1;text-align:left}
  .kit-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
  .kit-hidden{display:none!important}
  `;
  const style=document.createElement("style");style.textContent=css;document.head.appendChild(style);
  window.GameKit={
    mount:function(o){
      const actions=document.createElement("div");actions.className="kit-actions";
      const startButton=document.createElement("button");startButton.className="kit-btn start";startButton.textContent="スタート";
      const restart=document.createElement("button");restart.className="kit-btn";restart.textContent="最初から";
      const how=document.createElement("button");how.className="kit-btn";how.textContent="遊び方";
      const back=document.createElement("button");back.className="kit-btn";back.textContent="ゲーム王国";
      actions.append(startButton,restart,how,back);
      document.body.insertBefore(actions,document.body.children[1]||null);
      const overlay=document.createElement("div");overlay.className="kit-overlay";
      overlay.innerHTML='<div class="kit-panel"><h2>🎮 '+(o.title||"ゲーム王国")+'</h2><p>'+(o.intro||"準備ができたらゲーム開始！")+'</p><div class="kit-row"><button class="kit-btn primary" id="kitStart">ゲーム開始</button><button class="kit-btn" id="kitStartHow">遊び方</button></div></div>';
      document.body.appendChild(overlay);
      const modal=document.createElement("div");modal.className="kit-modal kit-hidden";
      modal.innerHTML='<div class="kit-panel"><h2>📖 遊び方</h2><p>'+o.howto+'</p><div class="kit-row"><button class="kit-btn primary" id="kitClose">閉じる</button></div></div>';
      document.body.appendChild(modal);
      const closeHow=()=>modal.classList.add("kit-hidden");
      const openHow=()=>modal.classList.remove("kit-hidden");
      const begin=()=>{closeHow();overlay.classList.add("kit-hidden");if(o.onStart)o.onStart()};
      startButton.onclick=begin;
      restart.onclick=()=>{closeHow();overlay.classList.add("kit-hidden");if(o.onRestart)o.onRestart()};
      how.onclick=openHow;document.getElementById("kitStartHow").onclick=openHow;
      document.getElementById("kitClose").onclick=closeHow;
      back.onclick=()=>location.href="index.html";
      document.getElementById("kitStart").onclick=begin;
      if(o.startHidden)overlay.classList.add("kit-hidden");
      return {overlay,modal,openHow,closeHow,restart};
    }
  };
})();