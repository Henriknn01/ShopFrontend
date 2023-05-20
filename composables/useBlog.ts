interface BlogPost {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    date: string;
    href: string;
}

export default async function useBlog(): Promise<{
    init: () => Promise<void>;
    getPageNumberRender: () => ({ link: string; id: number; label: string; isActive: boolean } | {
        link: string;
        id: number;
        label: string;
        isActive: boolean
    } | { link: string; id: number; label: string; isActive: boolean })[];
    blogPosts: Ref<any[]>;
    getTotalLength: () => number;
    nextPage: () => void;
    goToPage: (toPage: number) => void;
    pageSize: number;
    visiblePosts: Ref<any[]>;
    prevPage: () => void;
    getPageIndex: () => number
}> {
    let pageIndex = 0;
    const pageSize = 2; // Number of blog posts per page
    let blogPosts:Ref<any[]> = ref([]);
    let visiblePosts:Ref<any[]> = ref([]);
    let totalLength:number = 0;


    async function init() {
        await getBlogPosts()
        updateVisiblePosts()
    }
    async function getProductListPicture(imageID: number) {
        try {
            const response = await $fetch(
                `http://127.0.0.1:8000/Image/?format=json&id=` + imageID
            );
            return response[0].src;
        } catch (e) {
            console.warn(e);
        }
    }

    async function getAuthorName(imageID: number) {
        try {
            const response = await $fetch(
                `http://127.0.0.1:8000/Image/?format=json&id=` + imageID
            );
            return response[0].src;
        } catch (e) {
            console.warn(e);
        }
    }

    async function getBlogPosts(): Promise<void>{
        try {
            const response = await $fetch(
                'http://127.0.0.1:8000/blogpost/?ordering=-created_at'
            );
            const data = await response;
            blogPosts = await Promise.all(
                data.map(
                    async (post: any) => ({
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        imageUrl: await getProductListPicture(post.banner_image),
                        author: post.author,
                        date: post.created_at,
                        href: "",
                    })
                )
            );


        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    function getTotalLength(): number {
        totalLength = blogPosts.length
        return totalLength
    }

    const updateVisiblePosts = () => {
        try {
            visiblePosts.value = blogPosts.slice(pageIndex, pageIndex + pageSize);

        } catch (e) {
            console.warn(e);
        }
    };



    function nextPage() {
        if (pageIndex + pageSize < getTotalLength()) {
            pageIndex += pageSize;
            updateVisiblePosts();
        }
    }

    function prevPage() {
        if (pageIndex - pageSize >= 0) {
            pageIndex -= pageSize;
            updateVisiblePosts();
        }
    }

    function goToPage(toPage:number) {
        pageIndex = (toPage-1)*pageSize;
        updateVisiblePosts()
    }

    function getPageIndex() {
        return pageIndex
    }

    function getPageNumberRender() {
        let pageNumberRender = []
        for (let i = 0; i < getTotalLength()/pageSize; i++) {
            if (getPageIndex()/pageSize == i) {
                let obj = {
                    id: i + 1,
                    label: String(i + 1),
                    link: '#',
                    isActive: true
                };
                pageNumberRender.push(obj);
            } else {
            let obj = {
                id: i + 1,
                label: String(i + 1),
                link: '#',
                isActive: false
            };
                pageNumberRender.push(obj);}

        }
        return pageNumberRender;
    }

    return {
        init,
        getTotalLength,
        getPageIndex,
        pageSize,
        blogPosts,
        nextPage,
        prevPage,
        visiblePosts,
        goToPage,
        getPageNumberRender,

    }
}