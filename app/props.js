export default ({
  backgroundURL,
  Preloader,
  colors,
  views,
  termStyle,
  recruitStyle
}) => ({
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
      "href": "https://bs.benefit-one.co.jp/bs/pages/bs/srch/menuPrticSrchRslt.faces?menuNo=643630",
      "buttonImage": "./image/benefit.png"
    },
    {
      "href": "pdf/term.pdf",
      "buttonImage": "./image/pdf.mobile.png",
      "coverColor": "rgba(0, 15, 19, 0.48)",
      "description": ["利用規約",termStyle]
    },
    {
      "href": "pdf/recruit.pdf",
      "buttonImage": "./image/pdf.mobile.png",
      "coverColor": "rgba(0, 15, 19, 0.48)",
      "description": ["保育士募集のご案内",recruitStyle]
    }
  ]
})
