const pages=[
 ["assets/spread-01.png","Welcome"],
 ["assets/spread-02.png","About Miyu and My Favorites"],
 ["assets/spread-03.png","Mood Collection"],
 ["assets/spread-04.png","My Dreamy World"],
 ["assets/spread-05.png","My Dream World and My Secret Letter"]
];
const spread=document.getElementById("spread");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const progress=document.getElementById("progress");
const sheet=document.getElementById("turnSheet");
const status=document.getElementById("status");
let current=0,busy=false;
pages.forEach(([src,name],i)=>{
 const preload=new Image();preload.src=src;
 const button=document.createElement("button");
 button.type="button";button.style.left=`${([680,735,790,845,900][i]/1536)*100}%`;
 button.setAttribute("aria-label",`Open ${name}`);
 button.addEventListener("click",()=>turn(i));
 progress.appendChild(button);
});
function render(){
 spread.src=pages[current][0];
 spread.alt=`Miyu's Little Diary: ${pages[current][1]}`;
 prev.disabled=current===0;next.disabled=current===pages.length-1;
 [...progress.children].forEach((b,i)=>{
   b.setAttribute("aria-current",i===current?"page":"false");
 });
 status.textContent=`${pages[current][1]}, spread ${current+1} of ${pages.length}`;
}
function turn(target){
 if(busy||target===current||target<0||target>=pages.length)return;
 busy=true;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const cls=target>current?"forward":"backward";
 sheet.classList.remove("forward","backward");
 void sheet.offsetWidth;
 if(!reduced)sheet.classList.add(cls);
 setTimeout(()=>{current=target;render()},reduced?0:275);
 setTimeout(()=>{sheet.classList.remove(cls);busy=false},reduced?0:575);
}
prev.addEventListener("click",()=>turn(current-1));
next.addEventListener("click",()=>turn(current+1));
window.addEventListener("keydown",e=>{
 if(e.key==="ArrowLeft"){e.preventDefault();turn(current-1)}
 if(e.key==="ArrowRight"){e.preventDefault();turn(current+1)}
});
render();
