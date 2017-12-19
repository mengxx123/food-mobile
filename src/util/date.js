const zerofill = (value) => value >= 10 ? value : '0' + value

/*
 * format date
 * @param {number} time 时间戳
 * @param {String} format 格式 'yyyy-mm-dd hh:mm:ss'
 */
const formatDate = (time, format) => {
    if (!time) return ''

    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let second = date.getSeconds()

    switch (format) {
        case 'MM-dd':
            return `${zerofill(month)}-${zerofill(day)}`
        case 'hh:mm':
            return `${zerofill(hours)}:${zerofill(minutes)}`
        case 'yyyy-MM-dd hh:mm:ss':
            return `${year}-${zerofill(month)}-${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
        case 'yyyy/MM/dd':
            return `${year}/${zerofill(month)}/${zerofill(day)}`
        case 'yyyy-MM-dd hh:mm':
            return `${year}-${zerofill(month)}-${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
        case 'yyyy/MM/dd hh:mm':
            return `${year}/${zerofill(month)}/${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
        default:
            return `${year}.${zerofill(month)}.${zerofill(day)}`
    }
}

export default formatDate
