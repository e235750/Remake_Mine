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
* JSを使用し、HTML・CSSの動的な変更。ページ遷移のロードがない。
* cookieを利用し、セッションを維持。リロードしても初期化されない。

## 課題、実現したいこと
* 冗長なコード記述(JS内のCSS適用、HTMLオブジェクトの作成)
* 処理の明確化(リファクタリングの必要性)
* HTML, CSS, JSの理解
* スコアのランキングを作りたい。
* ~~**ロードしたら全てのデータが消える**（cookieを用いたセッション維持、DBへのデータ保存を検討中）~~

## 参考と素材
### 参考
* [Prog2-Report6](https://github.com/e235750/Report6 "Prog2-Report6へのリンク")
* [イベントリスナー](https://www.sejuku.net/blog/57625#index_id4)
* [リロード検知](https://masanyon.com/javascript-reload-event-beforeunload-unload/)
* [テキストファイル読み込み](https://www.pazru.net/html5/File/020.html)
* [クッキー関連](https://b-risk.jp/blog/2021/07/sessionstorage/)

### 素材
* [ドットイラスト](https://dot-illust.net/)
* [美咲フォント](https://littlelimit.net/misaki.htm)
* [画像合成](https://www.bannerkoubou.com/photoeditor/composite/)
