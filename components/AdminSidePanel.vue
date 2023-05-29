<script setup>
const {data, status, signOut} = useAuth();
const props = defineProps({
    active: String,
});
</script>
<template>
    <div class="md:col-span-1 col-span-full bg-gray-50 rounded p-2 shadow-xl h-fit">
        <AdminPanelLink :active="props.active" name="dashboard" text="Dashboard" link="#">
            <ChartPieIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="orders" text="New orders" link="/admin">
            <TruckIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="history" text="Order history" link="/admin/order/history">
            <TruckIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="products" text="Products" link="#">
            <ShoppingCartIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="users" text="Users" link="/admin/users">
            <UsersIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="images" text="Images" link="/admin/images">
            <PhotoIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="blog" text="Blog" link="#">
            <PencilSquareIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <AdminPanelLink :active="props.active" name="settings" text="Settings" link="#">
            <Cog6ToothIcon class="h-6 w-6 text-gray-500" />
        </AdminPanelLink>
        <div class="rounded p-2.5 hover:bg-gray-100 cursor-pointer">
            <h3 class="text-md inline-flex gap-2" @click="signOut()"><ArrowRightOnRectangleIcon class="h-6 w-6 text-gray-500" />Sign out</h3>
        </div>
    </div>
</template>

<script>
import {
    ArrowRightOnRectangleIcon,
    ChartPieIcon,
    Cog6ToothIcon, PencilSquareIcon,
    PhotoIcon,
    ShoppingCartIcon,
    TruckIcon,
    UsersIcon
} from "@heroicons/vue/24/outline";

export default {
    name: "AdminSidePanel",
    components: {
        PencilSquareIcon,
        ArrowRightOnRectangleIcon,
        UsersIcon,
        ShoppingCartIcon,
        TruckIcon,
        ChartPieIcon,
        Cog6ToothIcon,
        PhotoIcon
    }
}
</script>

<style scoped>

</style>