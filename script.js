// CURSOR
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();

// STAR CANVAS
const canvas=document.getElementById('space-canvas');
const ctx=canvas.getContext('2d');
let W,H,stars=[],shoots=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
window.addEventListener('resize',resize);resize();
for(let i=0;i<280;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+0.2,alpha:Math.random()*0.7+0.3,speed:Math.random()*0.015+0.005,tw:Math.random()*Math.PI*2});
function spawnShoot(){if(shoots.length>4)return;shoots.push({x:Math.random()*W*0.7,y:Math.random()*H*0.4,len:Math.random()*140+80,speed:Math.random()*8+6,angle:Math.PI/4+(Math.random()-0.5)*0.3,life:1});}
setInterval(spawnShoot,3200);
let t=0;
function draw(){
  ctx.clearRect(0,0,W,H);t+=0.008;
  stars.forEach(s=>{const tw=Math.sin(t*s.speed*30+s.tw)*0.3+0.7;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,230,255,${s.alpha*tw})`;ctx.fill();});
  shoots=shoots.filter(s=>s.life>0);
  shoots.forEach(s=>{
    s.life-=0.022;
    const ex=s.x+Math.cos(s.angle)*s.len,ey=s.y+Math.sin(s.angle)*s.len;
    const g=ctx.createLinearGradient(s.x,s.y,ex,ey);
    g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(0.4,`rgba(180,230,255,${s.life*0.9})`);g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(ex,ey);ctx.strokeStyle=g;ctx.lineWidth=1.5;ctx.stroke();
    s.x+=Math.cos(s.angle)*s.speed;s.y+=Math.sin(s.angle)*s.speed;
  });
  requestAnimationFrame(draw);
}
draw();

// PARALLAX
document.addEventListener('mousemove',e=>{
  const px=(e.clientX/W-0.5)*30,py=(e.clientY/H-0.5)*20;
  document.querySelector('.nebula-1').style.transform=`translate(${px*0.5}px,${py*0.5}px)`;
  document.querySelector('.nebula-2').style.transform=`translate(${-px*0.3}px,${-py*0.3}px)`;
});

// SCROLL REVEAL
const obs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*80);});},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// SKILL BARS
const bobs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.skill-bar-fill').forEach(b=>b.style.width=b.dataset.width+'%');});},{threshold:0.3});
document.querySelectorAll('.skill-card').forEach(c=>bobs.observe(c));

// PROJECT CARD GLOW
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mouse-x',(e.clientX-r.left)+'px');card.style.setProperty('--mouse-y',(e.clientY-r.top)+'px');});
});

// NAV SCROLL
window.addEventListener('scroll',()=>{document.getElementById('navbar').style.background=window.scrollY>50?'rgba(2,4,8,0.92)':'rgba(2,4,8,0.7)';});

// FORM SUBMIT
function handleSubmit(e){
  e.preventDefault();
  const btn=document.getElementById('msg-btn');
  const status=document.getElementById('msg-status');
  const name=document.getElementById('msg-name').value;
  const email=document.getElementById('msg-email').value;
  const subject=document.getElementById('msg-subject').value||'Message from Portfolio';
  const body=document.getElementById('msg-body').value;
  const mailto=`mailto:karandhikale06@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: '+name+' ('+email+')\n\n'+body)}`;
  window.location.href=mailto;
  btn.classList.add('sent');
  btn.innerHTML='<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Transmitted!';
  status.classList.add('show');
  setTimeout(()=>{btn.classList.remove('sent');btn.innerHTML='<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Transmit Message';status.classList.remove('show');},4000);
}
