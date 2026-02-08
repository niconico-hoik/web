export default {...{
  COMPANY: {
    "@type": "Organization",
    "@id": "https://evnr.ing/#org",
    "name": "合同会社EVNR",
    "alternateName": ["イブネル", "EVNR（イブネル）"],
    // "url": "https://www.evnr.ing/",
    // "logo": "https://niconico-hoik.com/assets/logo-evnr.png",
    // "sameAs": [
    //   "https://example.com/evnr-official",
    //   "https://social.example.com/evnr"
    // ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "general inquiry",
        // "telephone": "+81-90-8239-1813",
        "email": "contact@evnr.ing",
        // "url": "https://niconico-hoik.com/contact/",
        "availableLanguage": ["ja"]
      }
    ],
  },

  get DIVISION() { return {
    "@type": "Organization",
    "@id": "https://hoik.evnr.ing/#division",
    "name": "保育総合事業部",
    "alternateName": ["いぶねる保育園"],
    "parentOrganization": { "@id": this.COMPANY['@id'] },
    // "url": "https://hoik.evnr.ing/",
    // "logo": "https://niconico-hoik.com/assets/logo-evnr.png",
    // "sameAs": [
    //   "https://example.com/hoik-division"
    // ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "general inquiry",
        // "telephone": "+81-90-8239-1813",
        "email": "branch.hoik@evnr.ing",
        // "url": "https://niconico-hoik.com/contact/",
        "availableLanguage": ["ja"]
      }
    ],
    /* 店舗が増えて“一覧を維持できる”段階になったら subOrganization を足す
    "subOrganization": [
      { "@id": "https://hoik.evnr.ing/campuses/izumichuo/#campus" }
    ]
    */
  }},

  get WEBSITE() { return {
    "@type": "WebSite",
    "@id": "https://niconico-hoik.com/#website",
    "url": "https://niconico-hoik.com/",
    "name": "ニコニコ保育園 和泉中央園",
    "inLanguage": "ja",
    "description": "ニコニコ保育園 和泉中央園の公式サイトです。",
    "publisher": { "@id": this.COMPANY['@id'] },
    /* サイト内検索がある場合のみ（無いなら入れない）
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://niconico-hoik.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
    */
  }}
}}

export const generateLinkedData = ({ LocalBusiness, WebPage } = {}) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      LINKED_DATA['COMPANY'],
      LINKED_DATA['DIVISION'],
      ...(LocalBusiness ? [LocalBusiness] : []),
      LINKED_DATA['WEBSITE'],
      ...(WebPage ? [WebPage] : []),
    ],
  }
}