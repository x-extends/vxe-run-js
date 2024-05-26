import { defineStore } from 'pinia'
import { VxeUI } from 'vxe-pc-ui'

const currTheme = localStorage.getItem('VXE_THEME') as 'dark' | 'light'

VxeUI.setTheme(currTheme)

document.documentElement.setAttribute('vxe-run-theme', currTheme)

export const useAppStore = defineStore('app', {
  state () {
    return {
      theme: currTheme,
      serveTY: new Date().getFullYear(),
      siteBaseUrl: process.env.VUE_APP_SITE_BASE_URL
    }
  },
  actions: {
    setTheme (name: 'dark' | 'light') {
      this.theme = name || 'light'
      VxeUI.setTheme(name)
      document.documentElement.setAttribute('vxe-run-theme', name)
      localStorage.setItem('VXE_THEME', name)
    }
  }
})
