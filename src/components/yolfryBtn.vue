<script lang="js" setup>

import { defineProps } from 'vue';

defineProps({
    title: String
})

</script>



<template>
    <h1>
        {{ title }}
    </h1>

    <p>
        <slot S></slot>
    </p>

    <h6>
        <slot name="title3"></slot>
    </h6>
</template>