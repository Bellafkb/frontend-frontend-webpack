<template>
  <div class="hello">
    <VcAFrame title>
      <VcAColumn size="90%">
        <VcABox title="Comments" :first="true">
          <el-card>
            <el-form :model="newComment">
              <el-row type="flex" class="row-bg">
                <el-col :span="1">
                  <img src="https://img.icons8.com/dotty/80/000000/login-as-user.png">
                </el-col>
                <el-col :span="20" :offset="1">
                  <el-row>
                    <span class="userName">{{currentSession}}</span>
                  </el-row>
                  <el-row>
                    <el-input type="textarea" placeholder="input comment" v-model="newComment.text" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
                  </el-row>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="3" :offset="20">
                  <el-button
                    v-if="newComment.text"
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
                  <a target="_blank">
                    <img src="https://img.icons8.com/dotty/80/000000/login-as-user.png">
                  </a>
                </el-col>
                <el-col :span="20" :offset="1">
                  <el-row>
                    <span class="userName">{{comment._creator.fullName}}</span>
                    <time-ago
                      class="time-ago"
                      :datetime="comment.createdAt"
                      refresh
                      :locale="locale"
                      :long="longString"
                    ></time-ago>
                  </el-row>
                  <el-row>
                    <span>{{comment.text}}</span>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form ref="vote" :model="vote">
                        <div class="like-container">
                          <el-badge
                            v-if="isLiked(comment._votes)"
                            :value="comment._votes.length"
                            class="like-button"
                            type="primary"
                          >
                            <input
                              type="image"
                              class="heart"
                              :id="comment._id"
                              src="https://img.icons8.com/office/32/000000/hearts.png"
                              @click.prevent="dislikeButtonHandler(comment)"
                            >
                          </el-badge>
                          <el-badge
                            class="like-button"
                            :value="comment._votes.length"
                            v-else-if="!isLiked(comment._votes) && comment._votes.length!==0"
                          >
                            <input
                              type="image"
                              :id="comment._id"
                              @click.prevent="likeButtonHandler($event)"
                              src="https://img.icons8.com/ios/34/000000/hearts.png"
                            >
                          </el-badge>
                          <input
                            type="image"
                            :id="comment._id"
                            v-else
                            @click.prevent="likeButtonHandler($event)"
                            class="like-button"
                            src="https://img.icons8.com/ios/34/000000/hearts.png"
                          >
                        </div>
                      </el-form>
                    </el-col>
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
import route from "./../router/index";
import axios from "axios";
import TimeAgo from "vue2-timeago";
import VueStar from "vue-star";
import { mapstate } from "vuex";

axios.defaults.withCredentials = true;

export default {
  name: "Comment",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox,
    VcAInfoBox,
    TimeAgo,
    VueStar
  },
  data() {
    return {
      profileId: "",
      currentSession: "",
      newComment: {
        text: "",
        _poolEvent: "",
        _creator: {
          fullName: "",
          id: ""
        }
      },
      fullName: null,
      value: new Date(),
      locale: "en",
      longString: false,
      tooltip: true,
      user: undefined,
      vote: {
        commentId: "",
        _creator: {
          id: "",
          fullName: ""
        }
      },
      test: ""
    };
  },
  mounted() {
    this.$store.dispatch("GET_COMMENTS_BY_POOLEVENT_ID", this.$route.params.id);
    this.newComment._poolEvent = this.$route.params.id;
    axios
      .get("http://localhost/api/currentsession")
      .then(resp => {
        this.profileId = resp.data.profile.id;
        this.currentSession = resp.data.profile.profiles[0].supporter.fullName;
        this.newComment._creator.id = resp.data.profile.id;
        this.newComment._creator.fullName =
          resp.data.profile.profiles[0].supporter.fullName;
        this.vote._creator.id = resp.data.profile.id;
        this.vote._creator.fullName =
          resp.data.profile.profiles[0].supporter.fullName;
      })
      .catch(err => {
        return err.message;
      });
  },
  methods: {
    submit() {
      this.$store.dispatch("POST_COMMENT", this.newComment);
      setTimeout(() => {
        this.$store.dispatch(
          "GET_COMMENTS_BY_POOLEVENT_ID",
          this.$route.params.id
        );
        this.newComment.text = "";
      }, 100);
    },
    likeButtonHandler(event) {
      this.vote.commentId = event.currentTarget.id;
      axios
        .post("http://localhost/api/vote", this.vote)
        .then(resp => {
          this.$store.dispatch(
            "GET_COMMENTS_BY_POOLEVENT_ID",
            this.$route.params.id
          );
        })
        .catch(err => {});
    },
    dislikeButtonHandler(comment) {
      let voteId = this.findCurrentUserVoteId(comment._votes);
      if (voteId) {
        axios
          .delete("http://localhost/api/vote/" + voteId)
          .then(resp => {
            this.$store.dispatch(
              "GET_COMMENTS_BY_POOLEVENT_ID",
              this.$route.params.id
            );
          })
          .catch(err => {});
      }
    },
    isLiked(votes) {
      let result = votes.find(vote => {
        return vote._creator.id === this.profileId;
      });
      return result !== undefined;
    },
    findCurrentUserVoteId(votes) {
      let result = votes.find(vote => {
        return vote._creator.id === this.profileId;
      });
      return result._id;
    }
  },
  computed: {
    comments() {
      return this.$store.getters.getComments;
    }
  }
};
</script>

<style>
.userName {
  margin-right: 4px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.8rem;
}

.time-ago {
  color: dimgrey;
}

.like-button {
  margin-top: 10px;
}
.like-container:hover {
}
</style>
