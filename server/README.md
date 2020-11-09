# Sign & Auth

## 회원가입

```js
`Mutation{
    register(name:${name},id:${id},pw:${pw}){
        name
        id
        money
    }
}`;
```

## 로그인

```js
`Query{
    login(id:${id},pw:${pw}){
        token
        refreshToken
    }
}`;
```

## 토큰재발급 (refreshToken 으로 token을 얻음)

```js
`Query{
    refreshLogin(refreshToken:${refreshToken}){
        token
    }
}`;
```

## 로그아웃 (refreshToken db에서 삭제함)

```js
`Mutation{
    logout(refreshToken:${refreshToken})
}
```

# Logic

## 채팅보내기 (채널분리안해서 로비에서만)

```js
`Mutation{
    chat(content:${content}){
        name
        content
    }
}
```

## 채팅 구독
```js
`Subscription{
    newChat{
        name
        content
    }
}
```