({
    autoComplete: function(cmp) {

        var self = this;

        var keyPresses = Rx.Observable.fromEvent(cmp.find('atcmplbox').getElement(), 'keyup');

        function getAccounts(cmp){

            return Rx.Observable.create(function(observer){
                var cancelled = false;
                var action = cmp.get('c.getAccounts');
                action.setParams({accountname:cmp.find('atcmplbox').getElement().value});

                action.setCallback(this,function(resp){

                    observer.onNext(cmp.set("v.accounts",resp.getReturnValue()));
                    observer.onCompleted();

                });

                if(!cancelled){
                    $A.enqueueAction(action);
                }

            })

            return Rx.Disposable.create(function () {
                cancelled = true;
            });

        }


        var searchResults = keyPresses.
        throttle(250).
        map(function(key){
            return  cmp.find('atcmplbox').getElement().value;
        }).
        distinctUntilChanged().
        filter(function(search){
            return search.trim().length > 0;
        }).
        map(function(search){
            return getAccounts(cmp,search).retry(3)
        }).
        switch();

        searchResults.subscribe(function(results){});

    }
})