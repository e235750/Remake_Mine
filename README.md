# Prog2-Report6をJavaScriptで作り直す

## 概要
タイトルの通り、Prog2-Report6をJavaScriptで作り直した。

JavaScript練習のため、ライブラリなどを一切使わずに生のJavaScriptで作成。

[Prog2-Report6](https://github.com/e235750/Report6 "Prog2-Report6へのリンク")

## 工夫点
### 開発時
* git管理により、ファイルをバックアップ。また、プロジェクトへのアクセスを容易にした。
* クラスを用いることで処理を明確化。

### サービス面
* JSを使用し、HTML・CSSの動的に変更。ページ遷移のロードがない。
* sessionStorageを利用し、セッションを維持。リロードしても初期化されない。

## 課題、実現したいこと
* 冗長なコード記述(JS内のCSS適用、HTMLオブジェクトの作成)
* 処理の明確化(リファクタリングの必要性)
* HTML, CSS, JSの理解
* スコアのランキング機能
* ~~**ロードしたら全てのデータが消える**（cookieを用いたセッション維持、DBへのデータ保存を検討中）~~

## 参考と素材
### 参考
* [Prog2-Report6](https://github.com/e235750/Report6 "Prog2-Report6へのリンク")
* [イベントリスナー](https://www.sejuku.net/blog/57625#index_id4)
* [リロード検知](https://masanyon.com/javascript-reload-event-beforeunload-unload/)
* [テキストファイル読み込み](https://www.pazru.net/html5/File/020.html)
* [セッション維持](https://b-risk.jp/blog/2021/07/sessionstorage/)

### 素材
* [ドットイラスト](https://dot-illust.net/)
* [美咲フォント](https://littlelimit.net/misaki.htm)
* [画像合成](https://www.bannerkoubou.com/photoeditor/composite/)

## 振り返り
元となる資料があったにも関わらず、ここまでたどり着くのにかなりの時間がかかってしまった。

JSのコーディングでリファクタリングをめんどくさがったためかなり冗長なコードになっている。見やすいコードを書けるようになるためにさらに学習が必要だと感じる。（デザインパターンを勉強してみる）

HTML・CSS・JSの理解が浅いと感じる時が開発時に何回もあったため、今後も学習を続けていきたい。

セッション維持を実装するとき、最初はCookieを利用していたが、保存できるデータ量が少ないため、バグが発生した。そのそのため、sessionStorageの使用に切り替えたが、この機会にセッション維持の方法について学習したい。

現在はローカル環境のみでの開発を行なっているから、webサーバー構築の練習も含めて、グローバル環境での開発も行いたい。
