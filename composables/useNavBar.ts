import {fetchData} from "next-auth/client/_utils";

interface Category {
    id: number;
    name: string;
    parent_category: number | null;
}

interface Section {
    id: string;
    name: string;
    items: {
        name: string;
        href: string;
    }[];
}

interface ConvertedCategory {
    id: string;
    name: string;
    backednid: number;
    featured: FeaturedList[];
    sections: Section[];
}

type UnfiltredList = {
    id: number;
    name: string;
    slug: string;
    featured: boolean;
    category: number[];
    image: number[];
    products: number[];
    imagesrc: string | null;
};

type FeaturedList = {
    name: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
}

export default async function useNavBar(categories: Category[], UnfiltredFeatured: UnfiltredList[]): Promise<ConvertedCategory[]> {
    const categoryMap = new Map<number, Category>();
    const convertedCategories: ConvertedCategory[] = [];

    // Create a mapping of categories
    categories.forEach((category) => {
        categoryMap.set(category.id, category);
    });

    function findSections(parentId: number): Section[] {
        const sections: Section[] = [];
        categories.forEach((category) => {
            if (category.parent_category === parentId) {
                sections.push({
                    id: category.name,
                    name: category.name,
                    items: findItems(category.id),
                });
            }
        });
        return sections;
    }

    function findItems(parentId: number): { name: string; href: string }[] {
        const items: { name: string; href: string }[] = [];
        categories.forEach((category) => {
            if (category.parent_category === parentId) {
                items.push({
                    name: category.name,
                    href: `/categories/${category.id}`,
                });
            }
        });
        return items;
    }


    async function getProductListPicture(imageID: number) {
        try {
            const response = await $fetch(config.public.BACKEND_API_URL +`/image/?format=json&id=` + imageID);
            return response[0];
        } catch (e) {
            console.warn(e)
        }
    }

    async function getProductListByCategory(products: UnfiltredList[], category: number): Promise<FeaturedList[]> {

        const foundlist = products.filter(product => product.category[0] === category);
        if(foundlist.length == 0) {
            return []
        }
        const populatedList: FeaturedList[] = [];
        for (const item of foundlist) {
            const imageId = item.image[0]; // Assuming only one image ID per item, adjust accordingly if needed
            const imageData = await getProductListPicture(imageId)
            populatedList.push({
                name: item.name,
                href: "#",
                imageSrc: imageData.src,
                imageAlt: imageData.alt
            });
        }
        return populatedList;
    }

    for (const category of categories) {
        if (category.parent_category === null) {
            convertedCategories.push({
                id: category.name,
                name: category.name,
                backednid: category.id,
                featured: await getProductListByCategory(UnfiltredFeatured, category.id),
                sections: findSections(category.id),
            });
        }
    }


    return convertedCategories;
}
