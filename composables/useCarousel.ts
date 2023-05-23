import {Ref, ref} from "vue";

export default function useCarousel(query:number|0, productsPerPage:number|4) {
    const products:Ref<any[]> = ref([]);
    const visibleProducts:Ref<any[]> = ref([]);
    const pageIndex:Ref<number> = ref(0);
    const queryset:Ref<number> = ref(query);
    const ppp:Ref<number> = ref(productsPerPage); // products visible per page

    const init = async () => {
        await getProductList();
        updateVisibleProducts()
    }

    async function getProduct(productID: number) {
        try {
            const responseProduct = await $fetch('http://127.0.0.1:8000/product/?format=json&id=' + productID);
            //const responseImage = await $fetch(process.env.BACKEND_API_URL + 'Image/?format=json&id=' + responseProduct[0].image[0]);
            console.log(responseProduct[0])
            return {id: responseProduct[0].id ,name: responseProduct[0].name, price: responseProduct[0].price, imagesrc: responseProduct[0].image[0].src, imagealt: responseProduct[0].image[0].alt}
        } catch (e) {
            console.warn(e)
        }

    }

    const getProductList = async () => {
        try {
            const productListOut = await $fetch('http://127.0.0.1:8000/productlist/?format=json&id=' + queryset.value);
            let product;
            for(product in productListOut[0]["products"]) {
                const productID = productListOut[0]["products"][product]
                products.value.push(await getProduct(productID))
            }
        } catch (e) {
            console.warn(e)
        }
    }

    const updateVisibleProducts = () => {
        try {
            visibleProducts.value = products.value.slice(pageIndex.value, pageIndex.value + ppp.value);
        } catch (e) {
            console.warn(e);
        }
    };

    const getLength = () => {

        return products.value.length;
    }

    function scrollNext() {

        if (pageIndex.value + ppp.value < getLength()) {
            pageIndex.value += ppp.value;
            updateVisibleProducts();
        }
    };

    function scrollPrev() {
        if (pageIndex.value - ppp.value >= 0) {
            pageIndex.value -= ppp.value;
            updateVisibleProducts();
        }
    };

    return {
        init,
        products,
        updateVisibleProducts,
        visibleProducts,
        pageIndex,
        getLength,
        getProductList,
        scrollNext,
        scrollPrev,
    }
}
