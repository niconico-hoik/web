export default ({
  backgroundURL,
  Preloader,
  colors,
  views
}) => ({
  // firstIndex: 3,
  "background": [backgroundURL, {
    "backgroundRepeat": "no-repeat",
    "backgroundSize": "cover",
    "backgroundPosition": "center"
  }],
  colors,
  Preloader,
  views,
  "sides": [
    {
      "buttonImage":
        "https://lh3.googleusercontent.com/l-ZZOFGyeKYz3stUbxTECHYnXcRD66C9g0tjiWA_okVIxZyb0E7_esU8LRpq_0LFCu8Y=w300",
      "coverColor": "rgba(243, 243, 243, 0.6)",
      "description": [
        "Coming soon...",
        {
          "top": -144,
          "color": "rgb(170, 170, 170)",
          "fontWeight": "bold"
        }
      ]
    },
    {
      "href": "pdf/term.pdf",
      "coverColor": "rgba(0, 29, 36, 0.48)",
      "buttonImage": "./image/pdf.mobile.png",
      "description": [
        "利用規約",
        {
          "top": -132
        }
      ]
    },
    {
      "href": "pdf/recruit.pdf",
      "buttonImage": "./image/pdf.mobile.png",
      "coverColor": "rgba(0, 29, 36, 0.48)",
      "description": [
        "保育士募集のご案内",
        {
          "top": -150
        }
      ]
    },
    {
      "href": "https://goo.gl/C6ccKd",
      "buttonImage": "./image/facebook.png",
      "coverColor": "rgba(0, 29, 36, 0.48)",
      "description": [
        "職場日誌",
        {
          "top": -132
        }
      ]
    }
  ]
})
