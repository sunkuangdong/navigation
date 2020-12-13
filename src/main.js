import svg from "./publish/*.svg"
import png from "./publish/*.png"
const xObject = JSON.parse(localStorage.getItem('hashMap'))
const hashMap = xObject || [
    { logo: png.juejin, name: '掘金', url: 'https://juejin.cn/' },
    { logo: svg.zhihu, name: '知乎', url: 'https://www.zhihu.com/signin' },
    { logo: png.sifou, name: '思否', url: 'https://segmentfault.com/' },
]
const $siteList = $('.siteList')
const $last = $('.last')
const simplifyUrl = (url) => {
    // 删除 / 后面的所有内容
    // .replace('www.', '').replace(/\/.*/, '')
    return url.replace('https://', '').replace('http://', '').replace('www.', '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">
                        <img src="${node.logo}">
                    </div>
                    <div class="link">${node.name}</div>
                    <div class="close">
                        <img src="${svg.close}">
                    </div>
                </div>
        </li>`).insertBefore($last)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton').on('click', () => {
    // 点击新增按钮，获取新增的网址
    let url = window.prompt('请问您要添加的网址是？？？')
    const text = window.prompt('请问您要添加的名称是？？？')
    if (!url) {
        window.confirm('请填写一个你需要的url哦！')
        return;
    }
    if (url.indexOf('http') !== 0 || url.indexOf('https') !== 0) {
        url = 'https://' + url
    }
    if (!text) {
        window.confirm('请填写一个可爱的text哦！')
        return;
    }
    hashMap.push({
        logo: png.lanqiu,
        name: text,
        url
    })
    render()
})
// 页面离开的时候会存储
window.onbeforeunload = () => {
    localStorage.setItem('hashMap', JSON.stringify(hashMap))
}