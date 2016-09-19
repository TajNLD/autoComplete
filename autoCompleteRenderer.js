({
    afterRender : function(cmp,helper){
        var acctlistInput = cmp.find("atcmplbox").getElement();
        acctlistInput.setAttribute("list","acctlist");
        return this.superAfterRender();
    }
})