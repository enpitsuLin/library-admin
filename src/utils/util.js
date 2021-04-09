export function timeFix() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 4 ? '凌晨好' : hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
    const arr = ['休息一会儿吧', '准备吃点什么呢?', '我猜你可能累了', '摸一会鱼如何?']
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}