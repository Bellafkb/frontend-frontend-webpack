<template>
    <div
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    style="width: 100%" 
    >
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import queryString from 'query-string'
export default {
name : 'AuthComment',
data(){
    loading : true
},
mounted () {
    location.replace("http://localhost/drops/oauth2/code/get?"+ 
    queryString.stringify({client_id: 'comment-backend',
                            response_type:'code',
                            state : 'http://localhost:4000/#/comment/'+this.$route.params.id,
                            redirect_uri: 'http://localhost/api/oauth/code'
    })) 
}

}
</script>

<style>

</style>