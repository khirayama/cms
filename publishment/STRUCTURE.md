- things
  - id
  - attributes(person / team / company / custom / food / craft / activity / shopping / life ...)
  - name
  - description
  - created_at
  - updated_at

- facilities
  - id
  - attributes(cafe / restraunt / musium / park ...)
  - name
  - description
  - position
    - lat
    - lng
  - created_at
  - updated_at

- events
  - id
  - attributes(music / sport / exhibition / market / ceremony / seminar / recital)
  - name
  - description
  - period
    - start_at
    - start_time
    - end_at
    - end_time
  - created_at
  - updated_at

- relations
  - id
  - resource1
  - resource1_id
  - resource2
  - resource2_id

## 考え方

- モノ・コトをthingsと考える
- それに対して時間が加わったものがevents
- それに対して場所が加わったものがfacilities
- 全てのモノはrelationsで結ぶことができる

- 具体的な日付があるものはevents
- 具体的な座標があるものはfacilities
- それ以外はすべてthings

## 具体例

- 長崎観光(メディア)
- 観葉植物(メディア)
- コーヒーショップ(店舗)
- 電機メーカ(コーポレート)

### 長崎観光(メディア)

- おくんち(things:culture)
  - 2019年おくんち(events)
    - 諏訪神社(facilities)
- カステラ(thins:food)
  - 文明堂(things:organization)
    - 文明堂本店(facilities)
- 諏訪神社(facilities)
  - おくんち(things:culture)
  - 2019年おくんち(events)
- 大浦天主堂(facilities)
- 文明堂(things:organization)
  - 文明堂本店(facilities)
  - カステラ(things:food)
- 県立美術館(facilities)
- 歴史博物館(facilities)
- 水辺の森公園(facilities)

### 観葉植物(メディア)

- パキラ(things:plant)

### コーヒーショップ(店舗)

- コーヒー豆(things:food)
  - コロンビア(things:food)

### 電機メーカ(コーポレート)

## NOTE

- 間接的な呼び出しができたほうがコンテンツにはいい？
  - 例えば、諏訪神社の記事を書いているときに諏訪神社に関連するeventsとか
- カスタムスキーマが必要かも
  - 観葉植物の比較表みたいなのしたいと思った時に決まったスキーマで引ける必要はありあそう
- 例えば育て方。とかレシピ。みたいなのはどう紐付ける？
  - コンテンツからデータへのアクセスを考えてたけど、データからコンテンツもありそう
  - コンテンツもデータも「特性」みたいなので、データテーブル持つのがいいのかも？
    - レシピの材料: コンテンツのデータテーブル
    - 仕様: データのデータテーブル
- コンテンツの寿命が長いもの（知識みたいなのとか）と短いもの（今流行りの！）みたいなのはどう分ける？
  - フローとストックで考える？
