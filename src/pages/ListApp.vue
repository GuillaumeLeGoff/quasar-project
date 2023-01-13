<template>
  <div>
    <q-btn label="" color="primary" @click="$router.replace('/')">Retour</q-btn>
    <h4>{{ list.title }}</h4>
    <h6>tasks</h6>
    {{ number }}
    <div v-for="task in tasks" :key="task">
      <div
        v-if="!task.done"
        class="col list"
        style="
          background: #ebedef;
          padding-top: 2%;
          padding-left: 2%;
          padding-right: 2%;
          padding-bottom: 2%;
          box-shadow: 1px 1px 1px #f3eded;
          margin-bottom: 5%;
        "
        @click="$router.replace('/task/' + task._id)"
      >
        <q-checkbox v-model="task.done" @click="updateTask(task)" />

        {{ task.title }}
        <q-btn label="" color="primary" @click="deleteTask(task._id)"
          >Delete</q-btn
        >
      </div>
    </div>
    <h6>tasks completed</h6>
    <div v-for="task in tasks" :key="task">
      <div
        v-if="task.done"
        class="col list"
        style="
          background: #ebedef;
          padding-top: 2%;
          padding-left: 2%;
          padding-right: 2%;
          padding-bottom: 2%;
          box-shadow: 1px 1px 1px #f3eded;
          margin-bottom: 5%;
        "
        @click="$router.replace('/task/' + task._id)"
      >
        <q-checkbox v-model="task.done" @click="updateTask(task)" />
        {{ task.title }}
        <q-btn label="" color="primary" @click="deleteTask(task._id)"
          >Delete</q-btn
        >
      </div>
    </div>
  </div>
  <q-btn round icon="add" color="primary" @click="prompt = true" />

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New task</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>task name:</p>
        <q-input
          dense
          v-model="taskName"
          autofocus
          @keyup.enter="prompt = false"
        />
        <p>task description:</p>
        <q-input
          dense
          v-model="taskdescription"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Add task"
          v-close-popup
          @click="newTasks(taskName, taskdescription, list._id)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRoute } from "vue-router";

import {
  postTasks,
  getTasksByIdList,
  getOneList,
  delTask,
  updateOneTask,
} from "services/tasks";
import { ref } from "vue";
const prompt = ref(false);
const route = useRoute();
const list = ref([]);
const tasks = ref([]);
const number = ref(0);
const taskName = ref("");
const taskdescription = ref("");

(async () => {
  const { data } = await getOneList(route.params.id);
  list.value = data;
  await getTasksByIdList(list.value._id).then((response) => {
    tasks.value = response.data;
  });
})();

async function newTasks(name, description, laList) {
  await postTasks(name, description, laList);
  const { data } = await getOneList(route.params.id);
  list.value = data;

  await getTasksByIdList(list.value._id).then((response) => {
    tasks.value = response.data;
  });
}

async function deleteTask(id) {
  await delTask(id);
  const { data } = await getOneList(route.params.id);
  list.value = data;

  await getTasksByIdList(list.value._id).then((response) => {
    tasks.value = response.data;
  });
}

function updateTask(task) {
  (async () => {
    await updateOneTask(task._id, task);
  })();
}
</script>
