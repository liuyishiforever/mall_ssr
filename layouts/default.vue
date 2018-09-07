<template>
  <div>
    <v-header :seller="seller"></v-header>
    <bar></bar>
    <nuxt/>
  </div>

</template>
<script>
  import VHeader from '~/components/vheader/vheader'
  import Bar from '~/components/bar/bar'

  import axios from 'axios'

  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      axios.get('https://api.myjson.com/bins/b7324').then((res) => {
        this.seller = res.data;
      })
    },
    components: {
      VHeader: VHeader,
      Bar: Bar
    }
  }
</script>

