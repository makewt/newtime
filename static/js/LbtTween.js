var Tween = {
        linear: function (t, b, c, d){
         return c*t/d + b;
     },
         easeIn: function(t, b, c, d){
            return c*(t/=d)*t + b;
         },
         easeOut: function(t, b, c, d){
             return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){
            if (t === 0) { 
                return b; 
            }
            if ( (t /= d) == 1 ) {
                return b+c; 
            }
           if (!p) {
                p=d*0.3; 
            }
            if (!a || a < Math.abs(c)) {
                a = c; 
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },    
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
         }
            if ( !a || a < Math.abs(c) ) {
                a = c; 
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
               s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 2.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
       }, 
       backBoth: function(t, b, c, d, s){
           if (typeof s == 'undefined') {
               s = 1.70158; 
           }
           if ((t /= d/2 ) < 1) {
               return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
           }
           return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
       },
       bounceIn: function(t, b, c, d){
           return c - Tween['bounceOut'](d-t, 0, c, d) + b;
       },       
       bounceOut: function(t, b, c, d){
           if ((t/=d) < (1/2.75)) {
               return c*(7.5625*t*t) + b;
           } else if (t < (2/2.75)) {
               return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
           } else if (t < (2.5/2.75)) {
               return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
           }
           return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
       },      
       bounceBoth: function(t, b, c, d){
           if (t < d/2) {
               return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
           }
           return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
       }
   };
   function css(el,attr,val){
       if(arguments.length > 2){
           if(attr == "opacity"){
               el.style[attr] = val;
               el.style.filter = "alpha(opacity = "+val*100+")";
           } else {
               el.style[attr] = val + "px";
           }
       } else {
           return el.currentStyle?parseFloat(el.currentStyle[attr]):parseFloat(getComputedStyle(el)[attr]);
       }
   }
   function startMove(el,target,time,type,callBack){
       var t = 0;
       var b = {};//初始值
       var c = {};
       var d = Math.ceil(time/20);
       for(var s in target){
           //console.log(s);
           b[s] = css(el,s);
           c[s] = target[s] - b[s];
       }
       clearInterval(el.timer);
       el.timer = setInterval(function(){
           if(t >= d){
               clearInterval(el.timer);
               callBack&&callBack();
           } else {
               t++;
               for(var s in target){
                   var val = Tween[type](t,b[s],c[s],d); 
                   css(el,s,val);
               }    
           }
       },20); 
   }
  
   window.onload=function(){
    (function(){
        var aBtn=document.querySelectorAll('.main>a');
         var oMain=document.querySelector('.main');
        var oList=document.querySelector('.list');
        var aLi=document.querySelectorAll('.list li');
         var aSpan=document.querySelectorAll('.nav span');
         var aImg=document.querySelectorAll('.list img');
         var iArrImgSrc=['img/gy1.jpg','img/gy2.jpg','img/gy3.jpg','img/gy4.jpg','img/gy5.jpg'];
        var iLiW=css(aLi[0],'width');
        var iCur= 0;
        tab();

       /*定时器*/
        oMain.timer=setInterval(toNext,2000);
        oMain.onmouseover=function(){
            clearInterval(oMain.timer);
        }
        oMain.onmouseout=function(){
           oMain.timer=setInterval(toNext,2000);
        }

        /*鼠标移入导航*/
        for(var i=0;i<aSpan.length;i++){
            (function(index){
                aSpan[index].onmouseover=function(){
                    (index > iCur) && toNext(index);
                    (index < iCur) && toPre(index);
                }
            })(i);
        }

        /*前一张点击事件*/
        aBtn[0].onclick =function(){
            toPre();
        };

       /*后一张点击事件*/
       aBtn[1].onclick=function(){
            toNext();
        };

        var isMove=false;
        /*前一张*/
        function toPre(index) {
           if(isMove){
                return;
            }
            var pre=arguments.length==1?index:(iCur-1+aSpan.length)%aSpan.length;
            aImg[0].src=iArrImgSrc[pre];
            aImg[1].src=iArrImgSrc[iCur];
            css(oList,'margin-left',-iLiW);
           isMove = true;
           startMove(oList, {'margin-left':0},500,'linear',function(){
                isMove = false;
            });
            iCur=pre;
            tab();
        };

        /*后一张*/
        function toNext(index) {
            if(isMove){
                return;
            }
            var next=arguments.length==1?index:(iCur+1)%aSpan.length;
            aImg[0].src=iArrImgSrc[iCur];
            aImg[1].src=iArrImgSrc[next];
            css(oList,'margin-left',0);
            isMove = true;
            startMove(oList, {'margin-left':-iLiW},500,'linear',function(){
                isMove = false;
            });
            iCur=next;
            tab();
        };

        /*下边导航运动*/
        function tab(){
            for(var i=0;i<aSpan.length;i++){
                startMove(aSpan[i], {'height':10},500,'linear');
            }
            startMove(aSpan[iCur], {'height':20},500,'linear');
        }
    })();
}
