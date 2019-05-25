<template>
  <div>
    <h1>loading...</h1>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import queryString from "query-string";
export default {
  name: "AuthComment",
  mounted() {
    location.replace(
      "http://localhost/drops/oauth2/code/get?" +
        queryString.stringify({
          client_id: "comment-backend",
          response_type: "code",
          state: "http://localhost:4000/upsweep/comment/" + this.$route.params.id,
          redirect_uri: "http://localhost/api/oauth/code"
        })
    );
  }
};
</script>

<style>
</style>