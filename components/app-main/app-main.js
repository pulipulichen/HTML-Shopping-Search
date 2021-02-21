/* global ClipboardUtils */

let appMain = {
  data () {
    let websitesList = [
      'Shopee',
      'Ruten',
      'Yahoo Bid',
      'Yahoo Buy',
      'Yahoo Mall',
      'Momo',
      'Momo Mall',
      'PChome Shopping'
    ]
    
    return {
      cacheKey: 'HTML-Shopping-Search',
      cacheAttrs: ['keyword', 'websites'],
      init: false,
      
      websitesList,
      tableContent: `網址	品項	價位(含運費)	備註`,
      
      keyword: 'Android 電子紙',
      websites: websitesList,
    }
  },
  mounted () {
    this.dataLoad()
    
    this.inited = true
  },
  watch: {
    keyword () {
      this.dataSave()
    },
    websites () {
      this.dataSave()
    },
  },
  computed: {
    computedFilename () {
      return (new Date()).yyyymmdd() + ' ' + this.keyword
    },
    encodeKeyword () {
      return encodeURIComponent(this.keyword)
    },
    computedShopeeURL () {
      return `https://shopee.tw/search/?keyword=${this.encodeKeyword}&order=asc&page=0&sortBy=price`
    },
    computedRutenURL () {
      return `https://find.ruten.com.tw/s/?q=${this.encodeKeyword}&sort=prc%2Fac`
    },
    computedYahooBidURL () {
      return `https://tw.bid.yahoo.com/search/auction/product?p=${this.encodeKeyword}&sort=curp`
    },
    computedYahooBuyURL () {
      return `https://tw.buy.yahoo.com/search/product?p=${this.encodeKeyword}&sort=price`
    },
    computedYahooMallURL () {
      return `https://tw.mall.yahoo.com/search/product?p=${this.encodeKeyword}&sort=p`
    },
    computedMomoURL () {
      return `https://www.momoshop.com.tw/search/searchShop.jsp?keyword=${this.encodeKeyword}&searchType=2&curPage=1&_isFuzzy=0&showType=chessboardType`
    },
    computedMomMalloURL () {
      return `https://www.momomall.com.tw/mmlsearch/${this.encodeKeyword}.html`
    },
    computedPChomeShoppingURL () {
      return `https://ecshweb.pchome.com.tw/search/v3.3/?q=${this.encodeKeyword}&scope=all&sortParm=prc&sortOrder=ac`
    },
    websiteURLMapping () {
      return {
        'Shopee': this.computedShopeeURL,
        'Ruten': this.computedRutenURL,
        'Yahoo Bid': this.computedYahooBidURL,
        'Yahoo Buy': this.computedYahooBuyURL,
        'Yahoo Mall': this.computedYahooMallURL,
        'Momo': this.computedMomoURL,
        'Momo Mall': this.computedMomMalloURL,
        'PChome Shopping': this.computedPChomeShoppingURL
      }
    },
    urlList () {
      let list = []
      
      this.websites.forEach(website => {
        list.push(this.websiteURLMapping[website])
      })
      
      return list
    },
    disabelSelectAllWebsites () {
      return (this.websites.length === this.websitesList.length)
    },
    disabelDeselectAllWebsites () {
      return (this.websites.length === 0)
    }
  },
  methods: {
    dataLoad () {
      let projectFileListData = localStorage.getItem(this.cacheKey)
      if (!projectFileListData) {
        return false
      }
      
      projectFileListData = JSON.parse(projectFileListData)
      for (let key in projectFileListData) {
        this[key] = projectFileListData[key]
      }
    },
    dataSave () {
      if (this.inited === false) {
        return false
      }
      
      let keys = this.cacheAttrs
      
      let data = {}
      keys.forEach(key => {
        data[key] = this[key]
      })
      
      data = JSON.stringify(data)
      localStorage.setItem(this.cacheKey, data)
    },
    searchShoppingWebsite () {
      
      this.urlList.forEach(url => {
        window.open(url, (new URL(url)).host)
      })
    },
    copyFilename () {
      ClipboardUtils.copyPlainString(this.computedFilename)
    },
    copyTable () {
      ClipboardUtils.copyPlainString(this.tableContent)
    },
    selectAllWebsites () {
      this.websites = this.websitesList
    },
    deselectAllWebsites () {
      this.websites = []
    }
  }
}

module.exports = appMain