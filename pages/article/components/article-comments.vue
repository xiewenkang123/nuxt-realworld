<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="sendComment">
        <div class="card-block">
          <textarea
            v-model="commentToSend"
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            required
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="article.author.image" class="comment-author-img" />
          <button type="submit" class="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>

      <div v-for="comment in comments" :key="comment.id" class="card">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
            class="comment-author"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
            class="comment-author"
            >{{ comment.author.username }}</nuxt-link
          >
          <span class="date-posted">{{
            comment.createdAt | date("MMM DD, YYYY")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments, createArticleComment } from "@/api/article";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 评论列表
      commentToSend: "",
    };
  },
  async mounted() {
    this.getComments();
  },
  methods: {
    async sendComment() {
      const body = this.commentToSend.trim();
      if (body === "") {
        return;
      }
      await createArticleComment(this.article.slug, body);
      this.resetForm();
      this.getComments();
    },

    async getComments() {
      const { data } = await getArticleComments(this.article.slug);
      this.comments = data.comments;
    },

    resetForm() {
      this.commentToSend = "";
    },
  },
};
</script>

<style></style>
