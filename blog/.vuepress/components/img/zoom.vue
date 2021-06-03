<template>
    <div class="imgCon">
        <img :src="src" alt="" srcset="" class="zoom-img" />
        <p class="imgTitle">{{ title }}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        src: String,
    },
};
</script>

<style>
.imgCon {
    padding: 10px 0;
}
.imgTitle {
    font-weight: 600;
    text-align: center;
    margin: 10px;
}
</style>