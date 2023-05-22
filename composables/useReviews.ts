import {ref} from "vue";

export default function useReviews() {
    const getAverage = async (pId:number) => {
        let total = 0;
        const config = useRuntimeConfig();
        const { data: reviews, pending, error, refresh } = await useFetch(config.public.BACKEND_API_URL + "/productReview/?format=json&product=" + pId);
        const rev = await reviews;
        const revList = rev.value;
        for (let i = 0; i < revList.length; i++) {
            total += revList[i].rating;
        }
        if (revList.length > 0) {
            return (total/revList.length).toFixed(1);
        } else {
            return total
        }
    }

    return {
        getAverage,
    }
}
