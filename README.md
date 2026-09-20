# kobayashi-cooking

小林恵大・唯花夫婦が作った料理を記録する身内向けサイト「小林の台所」。

- GitHub Pagesで公開する静的サイト（ビルドツールなし。素のHTML/CSS/JavaScript）
- 料理データは `data/dishes.json` に集約し、画像もリポジトリ内 `images/` で管理
- 要件定義は [`docs/PRD.md`](docs/PRD.md) を参照

## 構成

```
index.html          トップページ
about.html           サイトについて
dishes/index.html    料理一覧（作った人・カテゴリでフィルタ）
dishes/detail.html   料理詳細（?id=<dish id> で表示）
data/dishes.json     料理データ
images/dishes/       料理写真（dish id ごとのフォルダを想定）
css/style.css        共通スタイル
js/                  各ページのロジック
```

## 料理の追加方法

1. `data/dishes.json` に1エントリ追加する

   ```json
   {
     "id": "一意なID（英数字とハイフン）",
     "name": "料理名",
     "cook": "keita または yuika",
     "categories": ["washoku" | "yoshoku" | "chuka" | "dessert" | "other" から1つ以上],
     "date": "YYYY-MM-DD",
     "memo": "ひとことメモ（任意）",
     "photos": ["images/dishes/<id>/1.jpg" のような相対パスの配列。省略可]
   }
   ```

2. 写真がある場合は `images/dishes/<id>/` に配置し、`photos` にパスを追加する
3. コミット・プッシュすれば反映される

## ローカルでの確認

fetch でJSONを読み込むため `file://` では動かない。リポジトリ直下で簡易サーバーを立てて確認する。

```sh
python3 -m http.server 8000
```

`http://localhost:8000/` を開く。
