<script setup>
import { computed, ref } from "vue";
import { Search, Menu, UserCircle, Bell } from "lucide-vue-next";
import config from "@/lib/config";
import Input from "./ui/input/Input.vue";
import Button from "./ui/button/Button.vue";

const props = defineProps({
  role: {
    type: String,
    required: true,
    default: "student",
    validator: (value) => ["admin", "teacher", "student"].includes(value),
  },
  isAuthenticated: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const isDashboard = ref(false); // TODO: Get from route (starts with /dashboard)
const isMainNavOpen = ref(false);
const isUserNavOpen = ref(false);

const toggleMenu = () => {
  isMainNavOpen.value = !isMainNavOpen.value;
  // Ensure user menu is closed when main menu is opened/closed
  if (isMainNavOpen.value) {
    isUserNavOpen.value = false;
  }
};

const toggleDropdown = () => {
  isUserNavOpen.value = !isUserNavOpen.value;
  // Ensure main menu is closed when user dropdown is opened/closed
  if (isUserNavOpen.value) {
    isMainNavOpen.value = false;
  }
};

const mainNavLinks = [
  {
    name: "Kelas",
    href: "#",
  },
  {
    name: "Sertifikat Terprogram",
    href: "#",
  },
  {
    name: "Tentang",
    href: "#",
  },
];

const userNavLinks = computed(() => {
  switch (props.role) {
    case "student":
      return [
        {
          name: "Dashboard",
          href: "#",
        },
        {
          name: "Profil",
          href: "#",
        },
        {
          name: "Pembelian",
          href: "#",
        },
        {
          name: "Keluar",
          href: "#",
        },
      ];

    default:
      return [
        {
          name: "Dashboard",
          href: "#",
        },
        {
          name: "Profil",
          href: "#",
        },
        {
          name: "Keluar",
          href: "#",
        },
      ];
  }
});
</script>

<template>
  <nav
    class="flex items-center justify-between p-6 md:px-12 md:py-4 bg-green-100 relative"
  >
    <!-- Logo -->
    <div>
      <h1 class="text-xl font-bold select-none">
        {{ config.appName }}
      </h1>
    </div>

    <!-- Main Nav Links -->
    <div v-if="!isDashboard" class="hidden lg:flex items-center gap-x-8">
      <ul class="flex items-center gap-x-8 *:cursor-pointer *:shrink-0">
        <li
          v-for="item in mainNavLinks"
          :key="item.name"
          class="relative group"
        >
          <a :href="item.href">
            <span class="text-foreground/80 hover:text-foreground">
              {{ item.name }}
            </span>
            <span
              class="absolute -bottom-2 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            ></span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Search & User -->
    <div class="hidden lg:flex items-center gap-x-2">
      <template v-if="!isDashboard">
        <div class="relative max-w-xl w-full">
          <Input placeholder="Cari Kelas" class="peer bg-background" />
          <Search
            class="absolute top-1/2 -translate-y-1/2 right-2 peer-focus:text-primary text-foreground/50"
          />
        </div>
      </template>

      <div v-if="isAuthenticated" class="flex items-center gap-x-2 relative">
        <!-- Notification Icon -->
        <Bell class="size-8 cursor-pointer" />

        <!-- User Icon and Dropdown -->
        <div class="relative">
          <UserCircle
            class="size-8 cursor-pointer"
            @click.stop="toggleDropdown"
          />
          <div
            v-if="isUserNavOpen"
            class="absolute top-10 right-0 w-48 bg-background border border-foreground/20 rounded-[var(--radius)] shadow-lg z-50 p-2"
          >
            <ul>
              <li
                v-for="item in userNavLinks"
                :key="item.name"
                class="hover:bg-foreground/5 h-12 mb-1 rounded-[var(--radius)] group relative transition-all duration-200"
              >
                <a :href="item.href" class="h-full flex items-center">
                  <span
                    class="absolute left-0 top-0 h-0 w-1 bg-primary group-hover:h-full transition-all duration-300"
                  ></span>
                  <span
                    class="ps-4 text-foreground/80 transition-colors duration-300 hover:text-primary"
                  >
                    {{ item.name }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else class="flex items-center gap-x-2">
        <Button>Daftar</Button>
        <Button>Masuk</Button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="lg:hidden flex items-center gap-x-2">
      <!-- Authenticated -->
      <template v-if="isAuthenticated">
        <!-- Notification Icon -->
        <Bell class="size-8 self-center cursor-pointer" />

        <!-- User Icon -->
        <UserCircle
          class="size-8 self-center cursor-pointer"
          @click.stop="toggleDropdown"
        />
      </template>

      <!-- Unauthenticated -->
      <template v-else>
        <!-- Auth Buttons -->
        <Button>Daftar</Button>
        <Button>Masuk</Button>
      </template>

      <!-- Menu Button -->
      <button
        v-if="!isDashboard"
        @click="toggleMenu"
        aria-label="Toggle mobile menu"
      >
        <Menu class="size-8" />
      </button>
    </div>

    <!-- User Nav Links -->
    <div
      v-if="isUserNavOpen"
      class="absolute top-full left-0 w-full bg-green-100 shadow-md p-6 flex flex-col items-center space-y-4 lg:hidden z-50"
    >
      <ul class="flex flex-col items-center gap-y-4 w-full">
        <li
          v-for="item in userNavLinks"
          :key="item.name"
          class="w-full text-center py-2 hover:bg-green-200"
          @click="
            isUserNavOpen = false;
            isMainNavOpen = false;
          "
        >
          <a :href="item.href" class="block w-full text-xl">{{ item.name }}</a>
        </li>
      </ul>
    </div>

    <!-- Main Nav Links -->
    <div
      v-if="isMainNavOpen"
      class="absolute top-full left-0 w-full bg-green-100 shadow-md p-6 flex flex-col items-center space-y-4 lg:hidden z-50"
    >
      <ul class="flex flex-col items-center gap-y-4 w-full">
        <li
          v-for="item in mainNavLinks"
          :key="item.name"
          class="w-full text-center py-2 hover:bg-green-200"
          @click="
            isMainNavOpen = false;
            isUserNavOpen = false;
          "
        >
          <a :href="item.href" class="block w-full text-xl">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
