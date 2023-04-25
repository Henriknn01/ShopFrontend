import {Ref, ref} from "vue";

export default function useCarousel(query:number|0, productsPerPage:number|4) {
    const products:Ref<any[]> = ref([]);
    const visibleProducts:Ref<any[]> = ref([]);
    const pageIndex:Ref<number> = ref(0);
    const queryset:Ref<number> = ref(query);
    const ppp:Ref<number> = ref(productsPerPage); // products visible per page

    const init = async () => {
        await getProducts();
        await updateVisibleProducts()
    }

    const getProducts = async () => {
        try {
            products.value = await $fetch(process.env.BACKEND_API_URL + '/productcategory/' + queryset.value + '/?format=json');
        } catch (e) {
            console.warn(e);
        }
    }

    const updateVisibleProducts = () => {
        try {
            visibleProducts.value = products.value["products"].slice(pageIndex.value, pageIndex.value + ppp.value);
        } catch (e) {
            console.warn(e);
        }
    };

    const getLength = () => {
        return products.value.length;
    }

    const scrollNext = () => {
        if (pageIndex.value + ppp.value < getLength()) {
            pageIndex.value += ppp.value;
            updateVisibleProducts();
        }
    };
    const scrollPrev = () => {
        if (pageIndex.value - ppp.value >= 0) {
            pageIndex.value -= ppp.value;
            updateVisibleProducts();
        }
    };

    return {
        init,
        products,
        visibleProducts,
        pageIndex,
        getLength,
        getProducts,
        scrollNext,
        scrollPrev,
    }
}
