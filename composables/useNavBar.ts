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

type FeaturedList = {
    name: string;
    href: number;
    imageSrc: string;
    imageAlt: string;
    category: number;
};

export default function useNavBar(categories: Category[], FeaturedList: FeaturedList[]): ConvertedCategory[] {
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

    function getProductsByCategory(products: FeaturedList[], category: number): FeaturedList[] {
        return products.filter(product => product.category === category);
    }

    categories.forEach((category) => {
        if (category.parent_category === null) {
            convertedCategories.push({
                id: category.name,
                name: category.name,
                backednid: category.id,
                featured: getProductsByCategory(FeaturedList, category.id),
                sections: findSections(category.id),
            });
        }
    });


    return convertedCategories;
}
