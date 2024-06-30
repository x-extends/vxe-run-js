import { defineStore } from 'pinia'
import { VxeUI } from 'vxe-pc-ui'
import i18n from '@/i18n'

const currTheme = (localStorage.getItem('VXE_DOCS_THEME') || 'light') as 'dark' | 'light'
const currLanguage = (localStorage.getItem('VXE_DOCS_LANGUAGE') || 'zh-CN') as 'zh-CN' | 'zh-TC' | 'en-US'

VxeUI.setTheme(currTheme)
VxeUI.setLanguage(currLanguage)

document.documentElement.setAttribute('vxe-docs-theme', currTheme)

export const useAppStore = defineStore('app', {
  state () {
    return {
      theme: currTheme,
      serveTY: new Date().getFullYear(),
      language: currLanguage,
      siteBaseUrl: process.env.VUE_APP_SITE_BASE_URL
    }
  },
  actions: {
    setTheme (name: 'dark' | 'light') {
      this.theme = name || 'light'
      VxeUI.setTheme(name)
      document.documentElement.setAttribute('vxe-run-theme', name)
      localStorage.setItem('VXE_THEME', name)
    },
    setLanguage (language: 'zh-CN' | 'zh-TC' | 'en-US') {
      this.language = language || 'zh-CN'
      VxeUI.setLanguage(language)
      i18n.global.locale = language
      localStorage.setItem('VXE_DOCS_LANGUAGE', language)
    }
  }
})
