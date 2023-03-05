<template>
  <div
    class="w-screen h-screen overflow-hidden bg-slate-800 flex items-center justify-center"
  >
    <div class="bg-white rounded-md shadow-lg p-10 min-w-[40vw]">
      <div class="mb-10">
        <h1 class="text-2xl text-center font-bold capitalize mb-4">
          sample nestjs chat
        </h1>
        <hr />
      </div>
      <slot />
    </div>
  </div>
</template>
