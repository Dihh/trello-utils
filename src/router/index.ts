import { createRouter, createWebHistory } from "vue-router";
import Cards from "../views/Cards.vue";
import Checklist from "../views/Checklist.vue";
import ApiKey from "../views/ApiKey.vue";
import CreateCards from "@/views/CreateCards.vue";
import Recurrents from "@/views/Recurrents.vue";
import Dashboard from "@/views/Dashboard.vue";
import AnalisesVue from "@/views/Analises.vue";
import AnalisesForm from "@/views/Analises-form.vue";

const publicPath = "/trello-utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `${publicPath}/`,
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: `${publicPath}/cards`,
      name: "cards",
      component: Cards,
    },
    {
      path: `${publicPath}/checklist`,
      name: "checklist",
      component: Checklist,
    },
    {
      path: `${publicPath}/api-key`,
      name: "api-key",
      component: ApiKey,
    },
    {
      path: `${publicPath}/create-cards`,
      name: "create-cards",
      component: CreateCards,
    },
    {
      path: `${publicPath}/recurrents`,
      name: "recurrents-cards",
      component: Recurrents,
    },
    {
      path: `${publicPath}/analises`,
      name: "analises",
      component: AnalisesVue,
    },
    {
      path: `${publicPath}/analises-form`,
      name: "analises-form",
      component: AnalisesForm,
    },
  ],
});

export default router;
