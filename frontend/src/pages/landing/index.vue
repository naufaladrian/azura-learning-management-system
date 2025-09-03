<script setup>
import {
  Framer,
  ChevronDownCircle,
  UserRound,
  Newspaper,
  Clock,
} from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const image =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
</script>

<template>
  <Navbar />
  <main class="lg:max-w-4/5 mx-auto">
    <section id="hero" class="flex flex-col items-center justify-center h-44">
      <!-- Section Title -->
      <h1 class="text-2xl md:text-3xl font-bold text-center mb-4">
        Bangun Keterampilan Pertama Anda
      </h1>

      <!-- Description -->
      <p class="text-center max-w-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        repellendus non obcaecati?
      </p>
    </section>

    <section
      id="why-us"
      class="flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-x-24 py-12 px-4"
    >
      <div class="max-w-sm lg:max-w-xs">
        <!-- Section Title -->
        <h2
          class="text-2xl md:text-3xl font-bold text-center lg:text-start mb-4 uppercase"
        >
          Kenapa harus FE Open Course?
        </h2>

        <!-- Description -->
        <p class="text-center lg:text-start">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          repellendus non obcaecati?
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="item in 6">
          <!-- Card -->
          <div
            class="flex flex-col items-center justify-center bg-yellow-100/50 max-w-xs p-4 gap-y-4 *:text-foreground/70"
          >
            <Framer class="size-12 text-inherit" />
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </template>
      </div>
    </section>

    <section
      id="classlist"
      class="flex flex-col items-center justify-center gap-y-12 py-12"
    >
      <div>
        <!-- Section Title -->
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-4">
          Semua kelas
        </h2>

        <!-- Description -->
        <p class="text-center max-w-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
          corporis?
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="item in 6">
          <!-- Class Card -->
          <div class="max-w-xs">
            <img :src="image" alt="placeholder" loading="lazy" class="w-full" />
            <h3 class="text-xl font-bold">Manajemen Keuangan Pribadi</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div class="flex flex-col justify-between w-full mb-1">
              <div class="flex items-center gap-x-2">
                <UserRound class="size-4" />
                <span class="font-semibold">prof. dr. hello</span>
              </div>
              <div class="flex items-center gap-x-2">
                <Newspaper class="size-4" />
                <span class="font-semibold">kelas satuan</span>
              </div>
              <div class="flex items-start justify-between w-full">
                <div class="flex items-center gap-x-2">
                  <Clock class="size-4" />
                  <span class="font-semibold">4 Minggu</span>
                </div>
                <p class="text-lg font-bold">Rp. 100.000</p>
              </div>
            </div>
            <Button class="w-full py-6 text-xl">Daftar</Button>
          </div>
        </template>
      </div>

      <a href="#all" class="text-center font-bold text-primary text-xl"
        >Selengkapnya</a
      >
    </section>

    <section
      id="partner"
      class="flex flex-col lg:flex-row-reverse items-center justify-around gap-y-12 gap-x-24 py-12"
    >
      <div class="max-w-sm lg:max-w-xs">
        <!-- Section Title -->
        <h2 class="text-center lg:text-end text-2xl md:text-3xl font-bold mb-4">
          Kerja Sama Kami
        </h2>

        <!-- Description -->
        <p class="text-center lg:text-end">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          architecto et laborum accusamus rerum.
        </p>
      </div>

      <div class="flex items-center space-x-4">
        <!-- arrow left -->
        <ChevronDownCircle class="size-8 rotate-90" />

        <div class="flex items-center gap-x-4 overflow-auto">
          <template v-for="value in 2">
            <!-- Card -->
            <div
              class="flex items-center bg-yellow-100/50 max-w-xs py-12 px-24 *:text-foreground/70"
            >
              <Framer class="size-12 text-inherit" />
            </div>
          </template>
        </div>

        <!-- arrow right -->
        <ChevronDownCircle class="size-8 -rotate-90" />
      </div>
    </section>

    <section class="flex items-center justify-center py-6 md:py-12">
      <div
        class="flex flex-col items-center lg:items-start justify-start p-6 md:p-12 bg-blue-100 w-full"
      >
        <!-- Section Title -->
        <h2
          class="text-center lg:text-start text-2xl md:text-3xl font-bold mb-4"
        >
          Tulis Email Anda untuk Mendapat Informasi Kelas Terbaru dari Kami
        </h2>

        <!-- Email Field -->
        <div class="relative w-full md:w-3/5 *:py-6">
          <Input
            type="email"
            class="w-full text-base md:text-xl font-semibold bg-background"
            placeholder="Tuliskan email anda"
          />
          <Button
            class="absolute rounded-l-none top-1/2 -translate-y-1/2 right-0"
            >Subscribe</Button
          >
        </div>
      </div>
    </section>
  </main>

  <Footer />
</template>

<style scoped>
section + section {
  border-top: 2px solid #898a8c;
}
</style>
