 var num = 0;
    var arr = [];
    var vis = [];
    var mark = [];
    var stringpro = "No.1,No.2,No.3,No.4,No.5,No.6";
    var pro = stringpro.split(',');
    var c = 0;
    var k = 0;
    var t;
    var tt;
    var flag = true;
    //for(var i = 0; i < 19; i++)
    //  vis[i] = i+1;
 
    var cont = 0;
 
    while(true) {
      var tt = parseInt(Math.random() * 6 + 1);
 
      if(!mark[tt]) {
        mark[tt] = 1;
        vis[cont++] = tt;
      }
 
      if(cont === 6) {
        break;
      }
    }
 
    function timedCount() {
      document.getElementById('txt').value = c;
      k = k + 1;
      k = k % (vis.length);
      c = vis[k];
      t = setTimeout("timedCount()",50)
    }
 
    function solve1() {
      if(flag) {
        timedCount();
        flag = false;
      }
    }
 
    function stopCount() {
      clearTimeout(t);
      tt = document.getElementById('txt').value;
    }
 
    function Random() {
      var draw = document.getElementById('display');
 
      num += 1;
      arr.push(tt);
      var tmp = tt;
 
      tmp -= 1;
      draw.innerHTML = draw.innerHTML + '  <h2 class="mdui-text-color-white-text">第' + num + '组抽中：' + pro[tmp] + '<br/></h2>';
      var tmp = [];
 
      tmp.length = 0;
      var cnt = 0;
 
      for(var i = 0, len = vis.length; i < len; i += 1) {
        if(vis[i] != tt) {
          tmp[cnt] = vis[i];
          cnt = cnt+1;
        }
      }
 
      vis.length = 0;
      for(var i = 0, len = tmp.length; i < len; i += 1) {
        vis[i] = tmp[i];
      }
 
      document.getElementById("count").innerHTML = arr.length;
      if(arr.length === 6){
        alert('抽签结束!');
      }
    }
 
    function solve2() {
      if(!flag) {
        stopCount();
        Random();
        flag = true;
      }
    }
 
    function Clear() {
      arr = null;
      arr = [];
 
      mark = [];
      var cont = 0;
 
      while(true) {
        var tt = parseInt(Math.random() * 6 + 1);
 
        if(!mark[tt]) {
          mark[tt] = 1;
          vis[cont++] = tt;
        }
 
        if(cont === 6) {
          break;
        }
      }
 
      k = 0;
      num = 0;
      c = 0;
      clearTimeout(t);
      document.getElementById('txt').value = '0';
      document.getElementById('count').innerHTML = '0';
      document.getElementById('display').innerHTML = '';
    }