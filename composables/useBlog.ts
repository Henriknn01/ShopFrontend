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
    blogPosts: Ref<BlogPost[]>;
    nextPage: () => void;
    visiblePosts: Ref<any[]>;
    prevPage: () => void
}> {
    let pageIndex = 0;
    const pageSize = 2; // Number of blog posts per page
    let blogPosts:Ref<any[]> = ref([]);
    const visiblePosts:Ref<any[]> = ref([]);


    async function init() {
        blogPosts = await getBlogPosts()
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

    async function getBlogPosts(): Promise<BlogPost[]> {
        try {
            const response = await $fetch(
                'http://127.0.0.1:8000/blogpost/?ordering=-created_at'
            );
            const data = await response;
            const blogPost = await Promise.all(
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
            return blogPost;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    }

    const updateVisiblePosts = () => {
        try {
            visiblePosts.value = blogPosts.slice(pageIndex, pageIndex + pageSize);

        } catch (e) {
            console.warn(e);
        }
    };



    function nextPage() {
        pageIndex = Math.min(pageIndex + 1, Math.ceil(blogPosts.length / pageSize) - 1);
    }

    function prevPage() {
        pageIndex = Math.max(pageIndex - 1, 0);
    }

    return {
        init,
        blogPosts,
        nextPage,
        prevPage,
        visiblePosts,

    }
}