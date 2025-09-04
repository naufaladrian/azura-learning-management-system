<script setup>
import { Facebook, Twitter, Youtube, Mail, Map, Phone } from "lucide-vue-next";
import config from "@/lib/config";
</script>

<template>
  <footer
    class="bg-green-100/30 text-neutral-800 flex flex-col py-12 px-6 sm:px-12 md:px-24"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-between md:items-start md:justify-around"
    >
      <div
        class="max-w-md w-full space-y-8 mb-8 md:mb-0 text-center md:text-left"
      >
        <h2 class="text-4xl font-bold text-foreground">
          {{ config.appName }}
        </h2>

        <!-- Social -->
        <div class="flex flex-col gap-y-4 items-center md:items-start">
          <p class="font-normal text-xl text-foreground">
            Informasi Lebih Lanjut:
          </p>
          <ul class="flex items-center gap-x-4 text-foreground">
            <li><Facebook class="size-8" /></li>
            <li><Youtube class="size-8" /></li>
            <li><Twitter class="size-8" /></li>
            <li><Mail class="size-8" /></li>
            <li><Mail class="size-8" /></li>
          </ul>
        </div>
      </div>

      <!-- Contact -->
      <div class="max-w-md w-full space-y-4 text-center md:text-left">
        <h2 class="text-2xl font-normal text-foreground">Kontak Kami:</h2>
        <ul class="space-y-4 pt-4">
          <li
            class="flex flex-col md:flex-row items-center md:items-start text-foreground"
          >
            <Map class="size-8 md:mr-2 mb-2 md:mb-0" />
            <span class="text-xl font-normal text-center md:text-left"
              >: Jl. Raya Kaligawe Km.4 Semarang 50112</span
            >
          </li>
          <li
            class="flex flex-col md:flex-row items-center md:items-start text-foreground"
          >
            <Phone class="size-8 md:mr-2 mb-2 md:mb-0" />
            <span class="text-xl font-normal text-center md:text-left"
              >: (024) 6583584 ext 537</span
            >
          </li>
          <li
            class="flex flex-col md:flex-row items-center md:items-start text-foreground"
          >
            <Phone class="size-8 md:mr-2 mb-2 md:mb-0" />
            <span class="text-xl font-normal text-center md:text-left"
              >: 081329262505</span
            >
          </li>
          <li
            class="flex flex-col md:flex-row items-center md:items-start text-foreground"
          >
            <Mail class="size-8 md:mr-2 mb-2 md:mb-0" />
            <span class="text-xl font-normal text-center md:text-left"
              >: fe@unissula.ac.id</span
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <span class="block w-8/9 h-1 bg-foreground my-12 self-center"></span>

    <!-- Copyright -->
    <div
      class="flex flex-col md:flex-row items-center justify-between text-base md:px-24 pb-8 text-center md:text-left"
    >
      <span class="font-bold text-xl text-foreground mb-4 md:mb-0"
        >copyright@2020</span
      >
      <span class="font-bold text-xl text-foreground text-center"
        >Dibuat penuh dengan ❤️ oleh Azuralabs</span
      >
    </div>
  </footer>
</template>
