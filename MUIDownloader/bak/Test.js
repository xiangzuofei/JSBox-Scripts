let link = $detector.link($context.text);
link = link.length > 0 ? link[0] : $context.link ? $context.link : $clipboard.link;

function execScript () {
    function mui () {
        !function(t){function r(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var n={};return r.m=t,r.c=n,r.p="",r(0)}([function(t,r){!function(t){t.hookAjax=function(t){function r(t){return function(){return this.hasOwnProperty(t+"_")?this[t+"_"]:this.xhr[t]}}function n(r){return function(n){var i=this.xhr,o=this;return 0!=r.indexOf("on")?void(this[r+"_"]=n):void(t[r]?i[r]=function(){t[r](o)||n.apply(i,arguments)}:i[r]=n)}}function i(r){return function(){var n=[].slice.call(arguments);if(!t[r]||!t[r].call(this,n,this.xhr))return this.xhr[r].apply(this.xhr,n)}}return window._ahrealxhr=window._ahrealxhr||XMLHttpRequest,XMLHttpRequest=function(){this.xhr=new window._ahrealxhr;for(var t in this.xhr){var o="";try{o=typeof this.xhr[t]}catch(t){}"function"===o?this[t]=i(t):Object.defineProperty(this,t,{get:r(t),set:n(t)})}},window._ahrealxhr},t.unHookAjax=function(){window._ahrealxhr&&(XMLHttpRequest=window._ahrealxhr),window._ahrealxhr=void 0}}(window)}]);
        hookAjax({onload:function(xhr){if (/create/.test(xhr.responseURL)) $notify('debug', JSON.parse(xhr.responseText)); }});
        $('#playlist').prop('checked', false);
        $('input#link').val('{{link}}');
        var $btn = $('button#submit');
        var clearId = setInterval(function () {
            if ($btn.attr('style')) clearInterval(clearId);
            else $btn.click();
        }, 500);
    }
    mui();
}

function convertFunc (func) {
    return func.toString().replace(/^.*?\{|\}$/g, '');
}

$ui.render({
    props: {
        title: "Test"
    },
    views: [{
        type: "web",
        props: {
            url: 'https://video-download.co/'
        },
        layout: $layout.fill,
        events: {
            didFinish (sender, navigation) {
                sender.eval({
                    script: convertFunc(execScript).replace(/{{link}}/, link)
                });
            },
            debug (data) {
                $console.info(JSON.stringify(data, null, 2));
            }
        }
    }]
})