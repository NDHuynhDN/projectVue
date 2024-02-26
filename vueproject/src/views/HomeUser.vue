<template>
  <div>
    <Header></Header>
    <div class="flex flex-col gap-2 items-center">
      <div class="bg-signup rounded-second w-[200px] mt-3 text-center">
        <button @click="onClick">View Information</button>
        <Modal title="Information about user" v-if="isShowModal" @cancel="onClick">
          <template v-slot:body>
            <div v-if="useAPIAccount.accountUser.length > 0">
              <div
                v-for="(account, index) in useAPIAccount.accountUser"
                :key="index"
                class="flex flex-col"
              >
                <span class="text-[30px]"
                  >ID:
                  <code class="text-[24px] block border-whitereal border-b-2">
                    {{ account.id }}
                  </code>
                </span>
                <span class="text-[30px]"
                  >Name:
                  <code class="text-[24px] block border-whitereal border-b-2">
                    {{ account.name }}
                  </code>
                </span>
                <span class="text-[30px]"
                  >Gender:
                  <code class="text-[24px] block border-whitereal border-b-2">
                    {{ account.gender }}
                  </code>
                </span>
                <span class="text-[30px]"
                  >Identify code:
                  <code class="text-[24px] block border-whitereal border-b-2">
                    {{ account.identify }}
                  </code>
                </span>
                <span class="text-[30px]"
                  >Address:
                  <code class="text-[24px] block border-whitereal border-b-2">
                    {{ account.address }}
                  </code>
                </span>
                <span class="text-[30px]"
                  >Phone:
                  <code class="text-[24px] block border-whitereal border-b-2">
                    {{ account.phone }}
                  </code>
                </span>
              </div>
            </div>
          </template>
        </Modal>
      </div>
      <div class="bg-signup rounded-second w-[200px] text-center">
        <button @click="router.push('/')">Log out</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useApiUserStore } from '@/stores/storeUser'
import { onMounted, ref } from 'vue'
import Modal from '../components/Modal.vue'
import Header from '@/components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const useApiUser = useApiUserStore()
const useAPIAccount = useAuthStore()

const router = useRouter()
// const route = useRoute()
// const user = route.params.username

const isShowModal = ref<boolean>(false)

const onClick = () => {
  isShowModal.value = !isShowModal.value
}
</script>
<style></style>
