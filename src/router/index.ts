import { createRouter, createWebHistory } from 'vue-router'
import Cards from '../views/Cards.vue'
import Checklist from '../views/Checklist.vue'
import ApiKey from '../views/ApiKey.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/trello-utils/',
      name: 'cards',
      component: Cards
    },
    {
      path: '/trello-utils/checklist',
      name: 'checklist',
      component: Checklist
    },
    {
      path: '/trello-utils/api-key',
      name: 'api-key',
      component: ApiKey
    }
  ]
})

export default router
