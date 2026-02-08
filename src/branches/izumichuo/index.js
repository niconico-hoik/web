import LINKED_DATA_GRAPHS from "../../ld"

export default {
  "name": "ニコニコ保育園 和泉中央園",
  "address": {
    "value": "〒5941105 大阪府和泉市のぞみ野3丁目4-17 Shima.B.L.D 1F",
    "href": "https://maps.app.goo.gl/DD3ZbfVbah9d8foy9"
  },
  "phones": [
    {
      "name": "固定電話",
      "value": "0725563396",
    },
    {
      "name": "携帯電話",
      "value": "09082314457",
    },
  ],
  "links": [
    {
      "name": "Instagram",
      "href": "https://www.instagram.com/evnr_hoik_izumichuo/",
      "text": "日々の保育の様子"
    },
    {
      "name": "Tumblr",
      "href": "https://www.tumblr.com/nicohoi-info",
      "text": "給食メニュー等のお知らせ"
    },
    {
      "name": "Twitter (X)",
      "href": "https://x.com/niconico_hoik",
      "text": "他のSNSの更新を通知等"
    }
  ],
  "head": {
    "description": '生後2か月～小学校高学年を対象に「こどもの多彩な可能性が育まれるようサポート」する認可外保育園です。申込みに限らず見学やお試し保育について等、お気軽にお問い合わせください。',
    "og:description": 'こどもの多彩な可能性が育まれるようサポートする大阪府和泉市の認可外保育園',
    "@graph": {
      "@type": ["LocalBusiness", "ChildCare"],
      "@id": "https://hoik.evnr.ing/campuses/izumichuo/#campus",
      "name": "ニコニコ保育園 和泉中央園",
      "alternateName": [
        "いぶねる保育園 和泉中央園"
      ],
      "url": "https://niconico-hoik.com/",
      "sameAs": [
        "https://www.google.com/maps/place/ニコニコ保育園+和泉中央園/@34.4527993,135.4577143,900m/data=!4m6!3m5!1s0x6000d02d756bc73d:0xc0cc03d243155b11!8m2!3d34.4528701!4d135.4580469!16s%2Fg%2F1tj73gjs",
        "https://www.instagram.com/evnr_hoik_izumichuo/",
        "https://www.facebook.com/nicohoizumi",
        "https://x.com/niconico_hoik",
        "https://www.tumblr.com/nicohoi-info",
      ],
      "parentOrganization": { "@id": LINKED_DATA_GRAPHS.DIVISION['@id'] },

      /* 画像・ロゴ（任意） */
      "logo": "https://niconico-hoik.com/assets/logo.png",
      "image": [
        "https://niconico-hoik.com/assets/hero.jpg"
      ],

      /* 住所（確定している場合だけ残す） */
      "address": {
        "@type": "PostalAddress",
        "postalCode": "594-1105",
        "addressRegion": "大阪府",
        "addressLocality": "和泉市",
        "streetAddress": "のぞみ野3丁目4-17 Shima.B.L.D 1F",
        "addressCountry": "JP"
      },

      /* 電話（確定している場合だけ残す） */
      "telephone": [
        "+81-72-556-3396",
        "+81-90-8231-4457",
      ],

      /* 地図・座標（確定している場合だけ残す） */
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.4528701,
        "longitude": 135.4580469,
      },

      "hasMap": "https://www.google.com/maps/place/ニコニコ保育園+和泉中央園/@34.4527993,135.4577143,900m/data=!4m6!3m5!1s0x6000d02d756bc73d:0xc0cc03d243155b11!8m2!3d34.4528701!4d135.4580469!16s%2Fg%2F1tj73gjs",

      /* 対象地域（任意） */
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "和泉市" },
        "和泉市周辺",
      ],

      /* 料金帯（任意。曖昧なら消す） */
      // "priceRange": "¥¥",

      /* 営業/開園時間（確定している場合だけ残す） */
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "07:00",
          "closes": "23:00"
        }
      ],
    }
  },
  "auths": {
    "line": false,
    "google": false
  },
  "headers": [
    "./image/header_0.jpg",
    "./image/header_1.jpg",
    "./image/header_2.jpg",
    "./image/header_3.jpg",
    "./image/header_4.jpg"
  ],
  "supports": [
    {
      "start": "2026-01-01",
      "values": [
        { "name": "", "icon": "", "description": "" },
        { "name": "", "icon": "", "description": "" },
        { "name": "", "icon": "", "description": "" }
      ]
    }
  ],
  "brings": [
    {
      "name": "連絡ノート",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "",
      "option": null
    },
    {
      "name": "ハンドタオル",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "必要なもの",
      "option": null
    },
    {
      "name": "スタイ（必要な場合）",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "場合によるもの",
      "option": null
    },
    {
      "name": "水筒",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "必要なもの",
      "option": null
    },
    {
      "name": "スプーン・フォーク",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "必要なもの",
      "option": null
    },
    {
      "name": "食事用エプロン",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "必要なもの",
      "option": null
    },
    {
      "name": "昼食",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "必要なもの",
      "option": {
        "value": 450,
        "unit": "食",
        "description": "ご注文・キャンセルは前日17:00（月曜日の分は土曜日の13:00）までにご連絡ください。昼食のメニューはtumblrにて毎週公開中です。"
      }
    },
    {
      "name": "おやつ",
      "in_prepaid": "毎日の持ち物",
      "in_postpaid": "",
      "option": null
    },
    {
      "name": "母子手帳のコピー",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "",
      "option": null
    },
    {
      "name": "健康保険証のコピー",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "必要なもの",
      "option": null
    },
    {
      "name": "着替えの服（１~２セット）",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "必要なもの",
      "option": null
    },
    {
      "name": "ビニール袋（汚れた衣服用）",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "",
      "option": null
    },
    {
      "name": "バスタオル・シーツ（お昼寝用）",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "場合によるもの",
      "option": null
    },
    {
      "name": "歯ブラシ・コップ",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "場合によるもの",
      "option": null
    },
    {
      "name": "哺乳瓶",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "",
      "option": null
    },
    {
      "name": "ミルク",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "",
      "option": {
        "value": 180,
        "unit": "100ml",
        "description": "ミルクに関する何らかの情報"
      }
    },
    {
      "name": "オムツ",
      "in_prepaid": "お預かりする物",
      "in_postpaid": "",
      "option": {
        "value": 90,
        "unit": "枚",
        "description": "後日代わりのオムツを補充いただく場合は無料です"
      }
    }
  ],
  "prices": [
    {
      "start": "2025-01-01",
      "prepaid_conditions": {
        "enrollment": 6000,
        "initial_minimum": 50,
        "additional_minimum": 25
      },
      "hours": [
        {
          "pupil": "1歳以上",
          "periods": [
            {
              "key": "07:00-08:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 640 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1320 }
              ]
            },
            {
              "key": "08:00-18:00",
              "values": [
                { "usage": "月極利用", "min": 156, "max": null, "value": 375 },
                { "usage": "月極利用", "min": 112, "max": 150, "value": 390 },
                { "usage": "月極利用", "min": null, "max": 104, "value": 420 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 600 }
              ]
            },
            {
              "key": "18:00-20:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 640 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1320 }
              ]
            },
            {
              "key": "20:00-23:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 1280 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1920 }
              ]
            }
          ]
        },
        {
          "pupil": "1歳未満",
          "periods": [
            {
              "key": "07:00-08:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 800 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1540 }
              ]
            },
            {
              "key": "08:00-18:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 560 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 750 }
              ]
            },
            {
              "key": "18:00-20:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 800 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1540 }
              ]
            },
            {
              "key": "20:00-23:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 1280 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 2200 }
              ]
            }
          ]
        }
      ]
    },
    {
      "start": "2026-01-01",
      "prepaid_conditions": {
        "enrollment": 6000,
        "initial_minimum": 50,
        "additional_minimum": 25
      },
      "hours": [
        {
          "pupil": "1歳以上",
          "periods": [
            {
              "key": "07:00-08:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 680 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1360 }
              ]
            },
            {
              "key": "08:00-18:00",
              "values": [
                { "usage": "月極利用", "min": 154, "max": null, "value": 390 },
                { "usage": "月極利用", "min": 105, "max": 143, "value": 420 },
                { "usage": "月極利用", "min": null, "max": 98, "value": 450 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 640 }
              ]
            },
            {
              "key": "18:00-20:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 680 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1360 }
              ]
            },
            {
              "key": "20:00-23:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 1320 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 2000 }
              ]
            }
          ]
        },
        {
          "pupil": "1歳未満",
          "periods": [
            {
              "key": "07:00-08:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 880 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1600 }
              ]
            },
            {
              "key": "08:00-18:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 600 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 800 }
              ]
            },
            {
              "key": "18:00-20:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 880 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 1600 }
              ]
            },
            {
              "key": "20:00-23:00",
              "values": [
                { "usage": "月極利用", "min": null, "max": null, "value": 1320 },
                { "usage": "一時預かり", "min": null, "max": null, "value": 2260 }
              ]
            }
          ]
        }
      ]
    }
  ]
}