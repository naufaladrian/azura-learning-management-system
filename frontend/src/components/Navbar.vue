<template>
  <nav
    class="flex items-center justify-between p-6 md:px-12 md:py-4 bg-green-100 relative"
  >
    <!-- Logo -->
    <div>
      <h1 class="text-xl font-bold select-none">FE Open Course</h1>
    </div>

    <!-- Menu -->
    <div class="hidden md:flex items-center gap-x-8">
      <ul class="flex items-center gap-x-8 *:cursor-pointer *:shrink-0">
        <li v-for="menu in menus" :key="menu.name" class="relative group">
          <a :href="menu.href">
            <span class="text-foreground/80 hover:text-foreground">{{
              menu.name
            }}</span>
            <span
              class="absolute -bottom-2 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            ></span>
          </a>
        </li>
      </ul>
    </div>

    <!-- Search & User -->
    <div class="hidden md:flex items-center gap-x-2">
      <div class="relative max-w-xl w-full">
        <Input placeholder="Cari Kelas" class="peer bg-background" />
        <Search
          class="absolute top-1/2 -translate-y-1/2 right-2 peer-focus:text-primary text-foreground/50"
        />
      </div>

      <div v-if="authenticated" class="flex items-center gap-x-2 relative">
        <Bell class="size-8 cursor-pointer" />
        <div class="relative">
          <UserCircle
            class="size-8 cursor-pointer"
            @click.stop="toggleDropdown"
          />
          <div
            v-if="isDropdownOpen"
            class="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-[var(--radius)] shadow-lg z-50 p-2"
          >
            <ul>
              <li
                v-for="item in dropdownItems"
                :key="item.name"
                class="hover:bg-gray-100 h-12 mb-1 rounded-[var(--radius)] group relative transition-all duration-200"
              >
                <a :href="item.href" class="h-full flex items-center">
                  <span
                    class="absolute left-0 top-0 h-0 w-1 bg-primary group-hover:h-full transition-all duration-300"
                  ></span>
                  <span
                    :class="{
                      'ps-4 text-gray-700 transition-colors duration-300': true,
                      'text-primary': item.name === 'Dashboard',
                    }"
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
    <div class="md:hidden">
      <button @click="toggleMenu" aria-label="Toggle mobile menu">
        <Menu class="size-8" />
      </button>
    </div>

    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 w-full bg-green-100 shadow-md p-6 flex flex-col items-center space-y-4 md:hidden z-50"
    >
      <div class="relative w-full">
        <Input placeholder="Cari Kelas" class="peer bg-background w-full" />
        <Search
          class="absolute top-1/2 -translate-y-1/2 right-2 peer-focus:text-primary text-foreground/50"
        />
      </div>

      <ul class="flex flex-col items-center gap-y-4 w-full">
        <li
          v-for="menu in menus"
          :key="menu.name"
          class="w-full text-center py-2 hover:bg-green-200"
          @click="toggleMenu"
        >
          <a :href="menu.href" class="block w-full text-xl">{{ menu.name }}</a>
        </li>
      </ul>

      <div
        v-if="authenticated"
        class="flex items-center justify-center gap-x-2 w-full"
      >
        <Bell class="size-8 self-center cursor-pointer" />
        <UserCircle class="size-8 self-center cursor-pointer" />
      </div>
      <div v-else class="flex flex-col space-y-2 w-full">
        <Button>Daftar</Button>
        <Button>Masuk</Button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { Search, Menu, UserCircle, Bell } from "lucide-vue-next";
import Input from "./ui/input/Input.vue";
import Button from "./ui/button/Button.vue";

const props = defineProps({
  role: {
    type: String,
    required: true,
    default: "student",
    validator: (value) => ["admin", "teacher", "student"].includes(value),
  },
  authenticated: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    isDropdownOpen.value = false;
  }
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    isMenuOpen.value = false;
  }
};

const closeDropdown = (event) => {
  const dropdownContainer = document.querySelector(
    ".relative > div:last-child"
  );
  if (dropdownContainer && !dropdownContainer.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

const menus = [
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

const dropdownItems = computed(() =>
  props.role === "student"
    ? [
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
      ]
    : [
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
      ]
);
</script>
