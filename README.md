# blackjack-server
 
## register 회원가입
- Mutation - register(id:${id}, pw:${pw}) : status code를 반환합니다. 
- 401 : 토큰확인, 411 : 조건제한, 409 : 중복, 200 : 성공

## login 로그인
- Query - login(id:${id}, pw:${pw}) : status code와 token을 반환합니다.
- 401 : 토큰확인, 404 : 실패, 200 : 성공

## logout 로그아웃
- Mutation - logout : status code를 반환합니다.
- 401 : 불가능한요청, 200 : 성공

## onetime 결제
- Mutation - onetime : status code, 현재 금액, 구매한 금액, 구매 일시, 아이디를 반환합니다.
- 401 : 토큰확인, 412 : 사전조건 실패, 200 : 성공

## order 주문내역
- Query - order : 코드, 토큰, 배열을 반환함(id, code, amount, gold, date)
- 401 : 토큰확인, 200 : 성공 

## chat 채팅

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

