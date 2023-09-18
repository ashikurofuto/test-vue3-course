<template>
<div class="post">
    <div>
        <div><strong>Название: </strong> {{ newPost.title }}</div>
        <div><strong>Описание: </strong> {{ newPost.body }}</div>
    </div>
    <div class="post__buttons">
        <my-button @click="$router.push(`/posts/${newPost.id}`)">Открыть</my-button>
        <my-button @click="deletePost">Удалить</my-button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        newPost: {
            Type: Object,
            required: true
        }
    },
    methods:{
        deletePost()
        {
            this.$emit("remove", newPost); 
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__buttons {
    display: flex;
}
</style>