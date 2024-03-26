<template>
  <div class="relative">
    <input
      type="text"
      name=""
      v-model="inputSearch"
      class="shadow-2xl text-whitereal rounded-second w-[300px] pl-2 py-2 mb-3 border border-header"
      placeholder="Search name . . ."
    />
    <div class="w-full">
      <table class="mt-1 w-full rounded-primary">
        <thead class="">
          <tr class="text-whitereal">
            <th class="p-2 text-center font-bold capitalize bg-header">id</th>
            <th class="p-2 text-center font-bold capitalize bg-header">name</th>
            <th class="p-2 text-center font-bold capitalize bg-header">username</th>
            <th class="p-2 text-center font-bold capitalize bg-header">identify</th>
            <th class="p-2 text-center font-bold capitalize bg-header">address</th>
            <th class="p-2 text-center font-bold capitalize bg-header">phone</th>
          </tr>
        </thead>
        <tbody class="" v-if="searchResults.length > 0">
          <tr
            v-for="(user, index) in searchResults"
            :key="index"
            class="h-[50px] hover:cursor-pointer"
          >
            <td class="text-center border-header text-whitereal border">
              {{ user.id }}
            </td>
            <td class="text-center border-header text-whitereal border">
              {{ user.name }}
            </td>
            <td class="text-center border-header text-whitereal border">
              {{ user.username }}
            </td>
            <td class="text-center border-header text-whitereal border">
              {{ user.identify }}
            </td>
            <td class="text-center border-header text-whitereal border">
              {{ user.address }}
            </td>
            <td class="text-center border-header text-whitereal border">
              {{ user.phone }}
            </td>
            <td class="overflow-y-hidden">
              <button
                class="rounded-primary ml-1 py-2 px-3 hover:bg-red mr-1"
                @click="deleteUser(user.id, user.name)"
              >
                <img src="../../assets/image/trash3.svg" alt="" class="w-[25px] h-[25px]" />
              </button>
              <button class="rounded-primary py-2 px-3 hover:bg-blue" @click="onClickUser(user)">
                <img src="../../assets/image/eye-fill.svg" alt="" class="w-[25px] h-[25px]" />
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
        <p v-else class="text-whitereal text-[30px]">No result</p>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { User } from '@/types'
import DetailUser from './DetailUser.vue'
import axios from 'axios'
import { useApiUserStore } from '@/stores/storeUser'

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
const deleteUser = async (id: number | string, name: string) => {
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
<style scoped>
/* Góc trên bên phải */
table tr:first-child th:first-child {
  border-top-left-radius: 10px;
}

/* Góc trên bên trái */
table tr:first-child th:last-child {
  border-top-right-radius: 10px;
}
</style>
