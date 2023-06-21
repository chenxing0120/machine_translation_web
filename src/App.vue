<template>
  <div id="app">

    <router-view>
      <Login></Login>
    </router-view>
  </div>
</template>

<script>
import Login from "@/views/Login";
export default {
  components: {Login },
  name: 'App'
}

</script>
