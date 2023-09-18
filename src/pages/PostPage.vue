<template>
    <div>
        <h1>Cтраница с постами</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Найти пост" />
        <div class="app__buttons">
            <my-button @click="showDialogue">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"
            />
        </div>
        
        <my-dialogue v-model:show="dialogueVisible">
            <post-form @create="createPost"/>
        </my-dialogue>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
        <div v-else>Идет загрузка</div>
        <!-- <div class="page__wrapped">
            <div v-for="pageNumber in totalPages" :key="page" class="page" :class="{
               'current-page': page === pageNumber
            }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div> -->
        <div v-intersection="loadMorePosts"  class="observer"></div>
    </div>
    </template>
    
    
    <script>
    import PostForm from '@/Components/PostForm.vue';
    import PostList from '@/Components/PostList.vue';
    import axios from 'axios';
    
    export default {
        components:{
           PostList,
           PostForm  
        },
        data() {
            return {
                posts:[],
                dialogueVisible: false,
                isPostLoading: false,
                selectedSort: '',
                sortOptions: [
                    {value: 'title', name: 'По названию' },
                    {value: 'body', name: 'По описанию' }
                ],
                searchQuery: "",
                page: 1,
                limit: 10,
                totalPages: 0,
            }
        },
        methods:{
            createPost(post) {
                this.posts.unshift(post);
                this.dialogueVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(x=> x.id !== post.id);
            },
            showDialogue()
            {
                this.dialogueVisible = true;
            },
            //changePage(pageNumber) {
              //  this.page = pageNumber;
            //},
            async fetchPosts(){
                try {
                    this.isPostLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    { params : {
                        _page: this.page,
                        _limit: this.limit 
                    }});
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    this.posts = response.data;
                    
                } catch(e) {
                    alert('Error'+ e);
                } finally {
                    this.isPostLoading = false;
                }
            },
            async loadMorePosts(){
                try {
                    this.page += 1;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    { params : {
                        _page: this.page,
                        _limit: this.limit 
                    }});
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                    this.posts = [...this.posts,...response.data];
                    
                } catch(e) {
                    alert('Error'+ e);
                }
            }
        },
        mounted() {
            this.fetchPosts();/* 
            const options = {
                rootMargin:'0px',
                threshold: 1.0
            }
            const callback = (entries, observer) => {
                if(entries[0].isIntersecting && this.page < this.totalPages) {
                    this.loadMorePosts();
                }
            };
            const observer = new IntersectionObserver(callback,options);
            observer.observe(this.$refs.observer); */
        },
        watch: {
            /* page() {
                this.fetchPosts();
            } */
        },
        computed: {
                sortedPost()
                {
                    return [...this.posts].sort((post1,post2) => {post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);});
                },
                sortedAndSearchedPosts()
                {
                    return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
                }
        }
    }
    </script>
    
    <style>
    .app__buttons {
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }
    .page {
        border: 1px solid black;
        padding: 10px;
    }
    .current-page {
        border: 2px solid teal;
    }
    .observer {
        height: 30px;
        background-color: gray;
    }
    </style>