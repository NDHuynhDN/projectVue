<template>
  <div class="relative">
    <input
      type="text"
      name=""
      v-model="inputSearch"
      class="border bg-whitereal text-signup rounded-second w-[300px] pl-1 py-1 mr-10 ml-4"
      placeholder="Search name . . ."
    />

    <table class="mt-1 ml-4 w-[1000px]">
      <thead class="">
        <tr class="bg-login">
          <th class="py-1 px-3 text-center border font-bold capitalize">id</th>
          <th class="py-1 px-3 text-center border font-bold capitalize">name</th>
          <th class="py-1 px-3 text-center border font-bold capitalize">username</th>
          <th class="py-1 px-3 text-center border font-bold capitalize">identify</th>
          <th class="py-1 px-3 text-center border font-bold capitalize">address</th>
          <th class="py-1 px-3 text-center border font-bold capitalize">phone</th>
        </tr>
      </thead>
      <tbody class="" v-if="searchResults.length > 0">
        <tr v-for="(user, index) in searchResults" :key="index">
          <td class="py-1 px-3 text-center border">{{ user.id }}</td>
          <td class="py-1 px-3 text-center border">{{ user.name }}</td>
          <td class="py-1 px-3 text-center border">{{ user.username }}</td>
          <td class="py-1 px-3 text-center border">{{ user.identify }}</td>
          <td class="py-1 px-3 text-center border">{{ user.address }}</td>
          <td class="py-1 px-3 text-center border">{{ user.phone }}</td>
          <td>
            <div class="flex justify-between gap-2 ml-2">
              <button
                class="rounded-primary bg-red py-1 px-3"
                @click="deleteUser(user.id, user.name)"
              >
                Xoa
              </button>
              <button
                class="rounded-primary bg-green py-1 px-3"
                @click="router.push(`/user/${user.id}`)"
              >
                Chi tiết
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <p v-else class="">No result</p>
    </table>
  </div>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { User } from '@/types'
import { useRouter } from 'vue-router'
import { useApiUserStore } from '@/stores/storeUser'

const router = useRouter()

const users = ref<User[]>([])

const useApiUser = useApiUserStore()

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
<style></style>
