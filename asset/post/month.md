<!-- ## 月極預かりの持ち物 🎒 -->

## 月極預かりの持ち物

月極預かりの持ち物は**毎日の持ち物**と**園でお預かりする物**に分けられます。

<!-- ![as?fetch=hast](assets/mobile/svg/content.month.fee.svg) -->

#### 毎日の持ち物

* ハンドタオル
* 食事用エプロン
* スタイ (幼児のみ)
* 連絡ノート (当園が用意)

#### 園でお預かりする物

* 歯ブラシ／コップ
* ミルク／哺乳瓶
* オムツ
* 着替えの服一式
* 母子手帳のコピー
* 健康保険証のコピー
* お昼寝用バスタオル(夏季のみ)

---

<!-- ![as?fetch=bloburl&style=width:30%](assets/common/svg/button.camera.svg)
![as?fetch=hast&style=width:100%](assets/common/svg/button.camera.svg)
![as?style=height:100px;object-fit:contain](assets/common/svg/button.room.svg)
![](https://raw.githubusercontent.com/kthjm/nicohoi-media/master/dist/png/tra/rogo/1300_900_ennavi.png) -->

<!-- ## 月極預かりの料金 👛 -->

## 月極預かりの料金

[tumblr](http://www.tumblr.com/dashboard)
<a href="http://www.tumblr.com/dashboard">dada</a>

1. 入園料 **￥ 5,000**
   <!-- - 割引が発生するケースがございます (後述) -->
2. 諸経費 **￥ 200/月**
   <!-- - オムツ -->
3. 保育料

<!-- ![as?fetch=hast](../../common/svg/animation.rogo.svg) -->

<!-- ![as?fetch=hast](assets/mobile/svg/content.month.fee.svg) -->

* 兄弟／姉妹でのご入園の際には上のお子さまの入園料と保育料を**半額**とさせていただきます 👩‍👧‍👦
* 日曜日 早朝(7:00~8:00) 夜間(18:00 以降) をご利用の場合には追加料金として**￥ 3,000/月**が発生します ⚠

明細な金額については**料金シミュレーター**をぜひご活用ください

また、持ち物/料金体系に関わらず、ご不明な点等がございましたらお気軽にご相談ください

<!-- ![as?fetch=bloburl&class=hoge&style=width:100px;position:relative;top:40px](assets/common/svg/button.simu.svg) -->

<!-- |          |               |
|:-:       |:-             |
|入園料    |￥5,000        |
|諸経費    |￥200/月       |
|保育料    |以下図| -->

<!-- ![assets/mobile/svg/content.month.fee.svg?layout=ghost]() -->

<!-- - 入園料 ￥5,000
- 諸経費 ￥200/月
- 保育料 以下図 -->

<!-- <img src="./svg/test.svg" height="500"></img>
<div>test</div> -->

<!-- ![monthfee](./svg/test.svg)
![ai]()
![Component]() -->

<!-- 画像をblobとして使いたいからuse alt instead src(uais)を使いたいケースもある。
あるいは、ghostを使うか否かは[src,true]でいいのか。
あー、それはDepthComponent側でassetsのkeyを見て判断してもらうか。
そこには`.png`/`.md`等のext情報があるはずなので。(果たしてほんとうにそうか)
keyよりもvalが`blob:`を含むか否かのが確実か。svgを文字列ではなくblobURLとして使いたいケースもあるだろうし。「含む」とかってレベルではなく`value.slice(0,5) === "blob:"`くらいじゃないとパフォーマンス的に悪い。

じゃあまとめると
- uais記法を使ったら、fetchoutのロジックにしたがってdataが作られる(blobURL or string)
- そいつらはfilepathをkeyにassetsに格納される
- `Depth`にて`remark-react`からassetsを使う、それは「srcを持たないimgは、そのaltをkeyにassetsからdataを選ぶ」
- その選ばれたdataの最初の五文字が`blob:`であるならばimg要素を使う。そうでなければ`<Ghost />`のchildrenとして使う。

だから肝は`![filepath,true]()`にあたるところ。ほんとうにこの形で「文字列としてGhostのchildrenとなることを希望する」を主張してもいいのか。どうゆう風に伝えるのがスマートか。

ちょっと待って。blobURLとして使うときもstyleとかを指定したいことはないか。大きさとか。そうゆう拡張性が確保されてない。 -->

<!-- ![alt](filepath)

![filepath]({ghost: true,style: {}})

![alt](filepath,{}) -->

<!-- ```md
![alt](filepath)

![filepath]({ghost: true,style: {}})

![alt](filepath,{})
```

`js`

```javascript
const k = 3;
```

`<Component />`

```javascript
<Component />
``` -->
