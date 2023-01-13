<!-- <style lang="sass" scoped>
.list {

}
</style> -->
<template>
  <div>
    <h4>dashboard</h4>
    <h5>List:</h5>
    <div>
      <div
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
        @click="$router.replace('/List/' + list._id)"
        v-for="list in lists"
        :key="list"
      >
        {{ list.title }}
        <q-btn
          label=""
          color="primary"
          @click="(promptsup = true), modal(list._id)"
          >Delete</q-btn
        >
      </div>
    </div>

    <q-btn round icon="add" color="primary" @click="prompt = true" />
  </div>

  <q-dialog v-model="promptsup" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Option</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="delete" v-close-popup @click="deleteList()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New list</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>list name:</p>
        <q-input
          dense
          v-model="listName"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Add address"
          v-close-popup
          @click="newList(listName)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {
  getAllList,
  postList,
  delList,
  delTask,
  getTasksByIdList,
} from "services/tasks";
import { ref } from "vue";
const listName = ref("");
const lists = ref([]);
const list = ref([]);
const promptsup = ref(false);
const prompt = ref(false);
const listId = ref();

(async () => {
  const { data } = await getAllList();
  lists.value = data;
  console.log(lists.value);
  for (list in lists) {
    console.log("list:");
    console.log(list);
  }
})();

function modal(id) {
  listId.value = id;
}
async function newList(name) {
  await postList(name);
  const { data } = await getAllList();
  lists.value = data;
}

async function deleteList() {
  await delList(listId.value);
  const { data } = await getAllList();
  lists.value = data;
}
</script>
