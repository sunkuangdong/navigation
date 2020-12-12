const xObject = JSON.parse(localStorage.getItem('hashMap'))
const hashMap = xObject || [
    { logo: './publish/juejin.png', name: '掘金', url: 'https://juejin.cn/' },
    { logo: './publish/zhihu.svg', name: '知乎', url: 'https://www.zhihu.com/signin' },
    { logo: './publish/sifou.png', name: '思否', url: 'https://segmentfault.com/' },
]
const $siteList = $('.siteList')
const $last = $('.last')
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(node => {
        const $li = $(`<li>
            <a href="${node.url}"> 
                <div class="site">
                    <div class="logo">
                        <img src="${node.logo}" alt="">
                    </div>
                    <div class="link">${node.name}</div>
                </div>
            </a>
        </li>`).insertBefore($last)
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
    hashMap.push({ logo: '', name: text, url })
    render()
})
// 页面离开的时候会存储
window.onbeforeunload = () => {
    localStorage.setItem('hashMap', JSON.stringify(hashMap))
}