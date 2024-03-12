<template>
  <div class="relative">
    <input
      type="text"
      name=""
      v-model="inputSearch"
      class="border bg-whitereal text-signup rounded-second w-[300px] pl-1 py-1"
      placeholder="Search name . . ."
    />
    <div class="w-full">
      <table class="mt-1 w-full rounded-primary">
        <thead class="">
          <tr class="bg-login">
            <th class="p-2 text-center font-bold capitalize">id</th>
            <th class="p-2 text-center font-bold capitalize">name</th>
            <th class="p-2 text-center font-bold capitalize">username</th>
            <th class="p-2 text-center font-bold capitalize">identify</th>
            <th class="p-2 text-center font-bold capitalize">address</th>
            <th class="p-2 text-center font-bold capitalize">phone</th>
          </tr>
        </thead>
        <tbody class="" v-if="searchResults.length > 0">
          <tr v-for="(user, index) in searchResults" :key="index">
            <td class="text-center mb-[]">{{ user.id }}</td>
            <td class="text-center">{{ user.name }}</td>
            <td class="text-center">{{ user.username }}</td>
            <td class="text-center">{{ user.identify }}</td>
            <td class="text-center">{{ user.address }}</td>
            <td class="text-center">{{ user.phone }}</td>
            <td class="overflow-y-hidden">
              <button
                class="rounded-primary bg-red py-1 px-3 mr-3"
                @click="deleteUser(user.id, user.name)"
              >
                Delete
              </button>
              <button class="rounded-primary bg-green py-1 px-3" @click="onClickUser(user)">
                Detail
              </button>
              <DetailUser
                v-if="selectedUser && selectedUser.id === user.id"
                @cancel="onCancel()"
                @save="onSave(user.id, user)"
                :user="user"
              ></DetailUser>
            </td>
          </tr>
        </tbody>
        <p v-else class="">No result</p>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { User } from '@/types'
import { useRouter } from 'vue-router'
import { useApiUserStore } from '@/stores/storeUser'
import DetailUser from './DetailUser.vue'
import axios from 'axios'

const useApiUser = useApiUserStore()
// click modal
const selectedUser = ref<User | null>(null)
const onCancel = () => {
  selectedUser.value = null
}
const onClickUser = (user: User) => {
  selectedUser.value = user
}
// fetch API
const users = ref<User[]>([])
const fetchAllUser = async () => {
  try {
    setTimeout(async () => {
      const res = await useApiUser.fetchDataUser()
      if (res) {
        users.value = res.data
        searchResults.value = users.value.slice()
      } else {
        console.log('Error')
      }
    }, 500)
  } catch (error) {
    console.log('Errror', error)
  }
}

onMounted(() => {
  try {
    fetchAllUser()
  } catch (error) {
    console.log('Error', error)
  }
})

// Delete User
const deleteUser = async (id: number, name: string) => {
  const message = confirm(`Ban co muon xoa user ${name} nay khong?`)
  if (message == true) {
    await useApiUser.delDataUser(id).then(() => fetchAllUser())
  } else {
    return
  }
}

const onSave = async (id: number | string, infor: User) => {
  try {
    await axios.put(`http://localhost:3000/users/${id}`, infor).then(async () => {
      alert('Edit Succesful !!!')
    })
    selectedUser.value = null
  } catch (error) {
    alert('Error updating user info')
  }
}
// Search User
const inputSearch = ref<string>('')
const searchResults = ref<User[]>([])
watch(inputSearch, (newValue) => {
  if (!inputSearch.value) {
    searchResults.value = users.value.slice()
  } else {
    searchResults.value = users.value.filter((u) =>
      u.name.toLowerCase().includes(newValue.toLowerCase())
    )
  }
})
</script>
<style>
th:first-child,
td:first-child {
  border-top-left-radius: 10px;
}

th:last-child,
td:last-child {
  border-top-right-radius: 10px;
}

tr:last-child th:first-child,
tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

tr:last-child th:last-child,
tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}
</style>
