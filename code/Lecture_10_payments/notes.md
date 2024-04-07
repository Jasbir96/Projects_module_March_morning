## Challenges in accepting money

### Multiple modes of payment
* netbanking -> RTGS , IMPS
* UPI
* debit
* credit card
* wallets
* crypto
* SWIFT
### follow multiple compliances 
  * You have follow security standards -> 
    * credit crard payment -> (PCI DSS)[Payment Card Insdustry standards]
    * International -> SWIFT
### liceneses and regulation (localization)
* You need to have license to accept the payment
* Every country has different regulation and you need follow them
* Different countries allow different payment modes for ex: UPI and IMPS are only available in India
## Fraud Detetction 
* You should be able to prevent every kind of fraud transaction
* also needs to be reliable to make sure any fraud confirmation are not made to the server

**solution** : a specizilzed service that only deals with payment (payment) and takes cut of every transaction 

## Process of Payment acceptance
  * configs -> API KEYS
            * public key
            * private keys(is only known by server)
        * WEBHOOK_SECRET
            * failure
            * success 
## verification
* webhook -> You need to share a route that your payment gateway can acces to confirm you about status of payment
* You need to expose your server publically so that payment gateway is able to access your webhook route
* 


