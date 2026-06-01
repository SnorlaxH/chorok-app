export function toDate(ctx: string, fm: string = 'yyyy. MM. dd') {
    const map: { [key: string]: number } = {
        'yyyy': 0,
        'MM': 0,
        'dd': 0,
        'HH': 0,
        'mm': 0,
        'ss': 0,
    };
    fm.replace(/yyyy|MM|dd|HH|mm|ss/g, matched => {
        map[matched] = parseInt(ctx.slice(fm.indexOf(matched), fm.indexOf(matched) + matched.length));
        return matched;
    });
    return new Date(map['yyyy'], map['MM'] - 1, map['dd'], map['HH'], map['mm'], map['ss']);
}

export function getDday(ctx: string, start = 0, reverse: boolean = false, fm: string = 'yyyy. MM. dd') {
    const target = toDate(ctx, fm);
    const today = new Date();

    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = today.getTime() - target.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + start;

    return reverse ? -days : days
}

export function toStr(ctx: Date, fm: string = 'yyyy. MM. dd') {
    const map: { [key: string]: string } = {
        'yyyy': ctx.getFullYear().toString(),
        'MM': (ctx.getMonth() + 1).toString().padStart(2, '0'),
        'dd': ctx.getDate().toString().padStart(2, '0'),
        'HH': ctx.getHours().toString().padStart(2, '0'),
        'mm': ctx.getMinutes().toString().padStart(2, '0'),
        'ss': ctx.getSeconds().toString().padStart(2, '0'),
        'EEE': getDayName(ctx),
        'EEEE' : getDayName(ctx, true),
    };
    return fm.replace(/yyyy|MM|dd|HH|mm|ss|EEEE|EEE/g, matched => map[matched]);
}

export function toDday(ctx: Date, isDday: boolean) {
    const today = new Date();
    const diff = isDday ? ctx.getTime() - today.getTime() : today.getTime() - ctx.getTime();
    const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return (dday).toString();
}

export function getFirstDateOfMonth(ctx: Date) {
    return new Date(ctx.getFullYear(), ctx.getMonth(), 1)
}

export function getLastDateOfMonth(ctx: Date) {
    return new Date(ctx.getFullYear(), ctx.getMonth() + 1, 0)
}

export function getFirstDateOfWeek(ctx: Date) {
    const d = new Date(ctx)

    // 일요일 시작 기준
    const day = d.getDay()
    d.setDate(d.getDate() - day)

    d.setHours(0, 0, 0, 0)

    return d
}

export const getLastDateOfWeek = (date: Date) => {
    const d = new Date(date)

    const day = d.getDay()
    d.setDate(d.getDate() + (6 - day))

    d.setHours(0, 0, 0, 0)

    return d
}

export function addDate(ctx: Date, n: number) {
    const d = new Date(ctx);
    d.setDate(d.getDate() + n);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function getDayName(ctx: Date, isFull: boolean = false) {
    return `${['일', '월', '화', '수', '목', '금', '토'][ctx.getDay()]}${isFull ? '요일' : ''}`
}

/// string extension
export function toChosung(ctx: string) {
    let code, i, j, k, len, result;
    const cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    result = '';
    for (j = k = 0, len = ctx.length; k < len; j = ++k) {
        i = ctx[j];
        code = ctx.charCodeAt(j) - 44032;
        result += code > -1 && code < 11172 ? cho[Math.floor(code / 588)] : i;
    }
    return result;
}