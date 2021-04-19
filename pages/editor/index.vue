<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags(split by ;)"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";

export default {
  name: "editor",
  // 路由匹配组件前先执行中间件
  middleware: "authenticated",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log(this.article);
      const params = {
        ...this.article,
        tagList: this.processTags(this.article.tagList),
      };
      const { data } = await createArticle(params);
      this.$router.push({
        name: "article",
        params: {
          slug: data.article.slug,
        },
      });
    },
    processTags(tags) {
      const tagList = tags.split(";").filter((item) => item.trim() !== "");
      return Array.from(new Set(tagList));
    },
  },
};
</script>

<style></style>
