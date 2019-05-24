## NOTE

- Userにroleが必要そう
- 新規ユーザ追加のためのtokenとかも必要そう
- ユーザの追加は2通り
  - adminから承認付きで追加
  - 追加にくるけど承認待ち
    - って思ったけど、たぶんダメやね。外部から攻撃できちゃう
- adminから承認付きで追加
  - adminがユーザ追加画面から権限を指定してtokenつきURLを作成(承認確認をする or not)
  - そのURLを共有してsignupする
  - Userが指定された権限で作成される
    - isApprovedがfalse指定のUser Requestなら承認待ちに
      - adminが承認したら完了
    - isApprovedがtrue指定なら即完了

- User / Role / User Request
User Request {
  token: string;
  isApproved: boolean;
  role: roleId;
  expiredAt: boolean;
}

## Role

- Owner
  - 全ての操作が可能
- Editor
  - コンテンツに関する全ての操作編集が可能
- Contributor
  - 公開情報への関与以外が可能

```
mongod --logpath=/data/db/log.txt --dbpath=/data/db --fork
```
