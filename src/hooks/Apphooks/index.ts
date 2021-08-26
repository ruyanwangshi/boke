import { ref } from 'vue'

export function useNavbarChange(props: any, context:any): any[] {
    const Page = ref('home')
    function setPage(page: string): void {
        Page.value = page
    }
    return [Page, setPage]
}