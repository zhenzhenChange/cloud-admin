<template>
  <div class="home">
    <a-button type="danger">你好呀</a-button>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";

export default {
  name: "Home",
  components: { [Button.name]: Button }
};
</script>
