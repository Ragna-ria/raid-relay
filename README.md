# raid-relay　管理システム

## 概要

Twitchレイドイベントを管理するシステムです。

管理画面からイベント情報を編集し、
イベントサイトへリアルタイムに反映します。

将来的にはEventSubと連携し、
レイド成功時に自動で次の走者へ進みます。

---

## ディレクトリ構成

```
admin/
    index.html
    css/
    js/

event/
    index.html
    css/
    js/

data/
    events.json
    schedule/
        2026_raid_relay.json

worker/
    worker.js
```

---

## API

### GET

```
/events
```

イベント一覧取得

```
/event?id=2026_raid_relay
```

イベント取得

### POST

```
/event
```

イベント保存

```
/advance
```

現在走者を次へ進める

```
/previous
```

現在走者を一つ戻す

---

## データ構造

### events.json

```json
[
  {
    "eventId": "2026_raid_relay",
    "title": "レイドでつなぐ生誕祭"
  }
]
```

### schedule/2026_raid_relay.json

```json
{
  "eventId": "2026_raid_relay",
  "title": "レイドでつなぐ生誕祭",
  "description": "",
  "startTime": "",
  "currentRunner": 0,
  "runners": []
}
```

---

## 開発方針

- WorkerはAPIのみ担当
- 管理画面は編集のみ担当
- イベントサイトは表示のみ担当
- EventSubはWorker APIを利用する

---

## バージョン

### v0.1

- 管理画面
- 保存
- イベントサイト
- Twitchプレイヤー

### v0.2

- EventSub
- 自動進行
- ログ

### v1.0

実運用版
