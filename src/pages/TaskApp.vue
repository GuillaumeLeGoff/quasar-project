<template>
  <div>
    <q-btn
      label=""
      color="primary"
      @click="$router.replace('/List/' + tasks.list._id)"
      >Retour</q-btn
    >
    <h6>Modififier tache</h6>
    <p>title:</p>
    <q-input dense v-model="tasks.title" autofocus />
    <p>description:</p>
    <q-input dense v-model="tasks.description" autofocus />
    <q-btn label="" color="primary" @click="updateTask()">Modifier</q-btn>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getOnetask, updateOneTask1 } from "services/tasks";
import { ref } from "vue";
const route = useRoute();
const tasks = ref([]);

(async () => {
  const { data } = await getOnetask(route.params.id);
  tasks.value = data;
  taskName.value = tasks.value.title;
})();

async function updateTask() {
  console.log("tets");
  await updateOneTask1(tasks.value._id, tasks.value);
}
</script>
