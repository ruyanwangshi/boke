import { ref } from 'vue'

export function useNavbarChange(props: any, context:any): any[] {
    const Page = ref('home')
    function setPage(page: string): void {
        Page.value = page
    }
    return [Page, setPage]
}

export function useInitDay(day: number | string) {
    if(typeof day === 'number') {
        return day < 10 ? `0${day}` : day
    }
    const num = Number(day);
    if(Number.isNaN(num)) return '01'
    return num < 10  ? `0${num}` : num
}