public with sharing class AccountController {

    @auraEnabled
    public static List<Account> getAccounts(String accountname){

        String fnd = accountname + '%';

        return [ select name FROM Account where name like:fnd];
    }

}