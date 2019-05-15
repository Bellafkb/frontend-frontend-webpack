<template>
  <div class="hello">
    <VcAFrame title>
      <VcAColumn size="90%">
        <VcABox title="comments" :first="true">
          <el-card>
            <el-form :model="comment">
              <el-row>
                <el-col :span="1" :offset="0">
                  <img src="https://img.icons8.com/dotty/80/000000/login-as-user.png">
                </el-col>
                <el-col :span="21" :offset="1">
                  <el-row>
                    <span class="userName">{{fullName}}</span>
                  </el-row>
                  <el-row>
                    <el-input
                      type="textarea"
                      placeholder="input comment"
                      v-model="comment.text"
                      :maxLength="240"
                    ></el-input>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3" :offset="20">
                  <el-button
                    v-if="comment.text"
                    class="vca-button-primary"
                    @click.prevent="submit"
                  >comment</el-button>
                  <el-button
                    v-else
                    class="vca-button-primary"
                    @click.prevent="submit"
                    disabled
                  >comment</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <el-row>
            <el-card v-for="comment in comments" :key="comment.id">
              <el-row>
                <el-col :span="1">
                  <img src="https://img.icons8.com/dotty/80/000000/login-as-user.png">
                </el-col>
                <el-col :span="20" :offset="1">
                  <el-row>
                    <span class="userName">{{comment._creator.fullName}}</span>
                    <time-ago
                      class="title"
                      :datetime="comment.createdAt"
                      refresh
                      :locale="locale"
                      :long="longString"
                    ></time-ago>
                  </el-row>
                  <el-row>
                    <span>{{comment.text}}</span>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </VcABox>
      </VcAColumn>
    </VcAFrame>
  </div>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import axios from "axios";
import TimeAgo from "vue2-timeago";

export default {
  name: "Comment",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox,
    VcAInfoBox,
    TimeAgo
  },
  data() {
    return {
      comment: {
        text: "",
        _creator: {
          fullName: "",
          id: ""
        }
      },
      comments: null,
      fullName: null,
      value: new Date(),
      locale: "en",
      longString: false,
      tooltip: true
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/comment/" + this.$route.params.id)
      .then(resp => {
        this.comments = resp.data.data.resp;
        this.fullName = resp.data.data.profile.profiles[0].supporter.fullName;
        this.comment.fullName = resp.data.data.profile.profiles[0].supporter.fullName;
      })
      .catch(err => {
        return err.message;
      });
    //Todo: write axios to get current user.
  },
  methods: {
    submit() {
      axios
        .post("http://localhost:3000/api/comment", this.comment)
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>

<style>
.userName {
  margin-right: 4px;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.8rem;
}
</style>
