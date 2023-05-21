import {fetchData} from "next-auth/client/_utils";

interface Category {
    id: number;
    name: string;
    imagesrc: string | null;
    imagealt: string | null;
    desc: string;
    parent_category: string | null;
}



export default async function useCategoryCard(categories: any[], catID: number | null): Promise<Category[]> {
    const Categoryout: Category[] = [];
    if (catID == "") {
        catID = null;
    }
    for (const category of categories.value) {
        if (category.parent_category == catID) {
            if (category.image === null) {
                Categoryout.push({
                    id: category.id,
                    name: category.name,
                    imagesrc: null,
                    imagealt: null,
                    desc: category.desc,
                    parent_category: category.parent_category,
                });
            } else {
                Categoryout.push({
                    id: category.id,
                    name: category.name,
                    imagesrc: category["image"].src,
                    imagealt: category["image"].alt,
                    desc: category.desc,
                    parent_category: category.parent_category,
                });
            }
        }
    }
    return Categoryout;
}
