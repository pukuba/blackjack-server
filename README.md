# blackjack-server
 
## register
- Mutation - register(id:${id}, pw:${pw}) : status code를 반환합니다.

## login
- Query - login(id:${id}, pw:${pw}) : status code와 token을 반환합니다.

## logout
- Mutation - logout : status code를 반환합니다.

## onetime
- Mutation - onetime : status code, 현재 금액, 구매한 금액, 구매 일시, 아이디를 반환합니다.
``` js
amount: Int!                    금액
card_number: String!         카드번호 
expiry: String!              유효기간 
birth: String!               생년월일
pwd_2digit: String!   비밀번호 앞 2자리
buyer_tel: String!           전화번호
buyer_email: String!          이메일


query ex

mutation{
  onetime(input:{
    card_number:"xxxx xxxx xxxx xxxx",
    amount:999999,
    expiry:"yyyymm",
    birth:"yymmdd",
    pwd_2digit:"xx",
    buyer_tel:"010xxxxxxxx",
    buyer_email:"xxxxx@xxxx.xxx"
  }){
    code
  }
}
```