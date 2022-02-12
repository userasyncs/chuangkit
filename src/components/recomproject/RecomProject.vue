<template>
  <div>
      <graph-list :theme="theme" :count="count" v-model:themeExtendId="themeExtendId" v-model:index="index" v-model:pageNum="pageNum" :list="list"></graph-list>
      <back-to-top :top="400"></back-to-top>
  </div>
</template>

<script>
import BackToTop from '../bacototop/BackToTop.vue';
import GraphList from '../graphlist/GraphList.vue';
export default {
  components: { GraphList, BackToTop, },
    created(){
        this.id=this.$route.params.id;
        this.getData(this.$route.params.id)
    },
    methods:{
        async getData(id){
            let res=await fetch("/v2/solutionSubject/themeDetail.do?_dataType=json&_dataClientType=3&client_type=40&themeId="+id+"&templatePageSize=6").then(r=>r.json())
            // console.log(res);
            this.list=res.body.data.theme.themeExtends
            this.theme=res.body.data.theme
        },
        async getNextData(){
            let res=await fetch("/v2/solutionSubject/themeExtend/template.do?_dataType=json&_dataClientType=3&client_type=40&themeExtendId="+this.themeExtendId+"&pageSize=6&pageNum="+this.pageNum).then(r=>r.json());
            this.list[this.index].templates.push(...res.body.data.templates)
            this.count=res.body.data.count;
        }
    },
    data(){
        return {
            list:[],
            theme:{},
            pageNum:1,
            id:"",
            index:"",
            themeExtendId:"",
            count:0
        }
    },
    watch:{
        pageNum(){
            this.getNextData()
        }
    }
}
</script>

<style>

</style>