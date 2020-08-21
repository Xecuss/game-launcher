<template>
    <h1>{{ test }}</h1>
</template>
<script lang="ts">
import { ref } from 'vue';

export default {
    setup(){
        let test = ref('Hello!');

        return { test }
    }
}
</script>