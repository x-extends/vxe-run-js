import { defineStore } from 'pinia'
import { VxeUI, VxeGlobalI18nLocale } from 'vxe-pc-ui'
import i18n from '@/i18n'

const currTheme = (localStorage.getItem('VXE_DOCS_THEME') || 'light') as 'dark' | 'light'
const currLanguage = (localStorage.getItem('VXE_DOCS_LANGUAGE') || 'zh-CN') as VxeGlobalI18nLocale

VxeUI.setLanguage(currLanguage)
setTimeout(() => {
  VxeUI.setTheme(currTheme)
})

document.documentElement.setAttribute('vxe-docs-theme', currTheme)

export const useAppStore = defineStore('app', {
  state () {
    return {
      theme: currTheme,
      serveTY: new Date().getFullYear(),
      language: currLanguage,
      siteBaseUrl: process.env.VUE_APP_SITE_BASE_URL,
      cdnBaseUrl: process.env.VUE_APP_CDN_URL,
      vxeVersion: 'v4'
    }
  },
  actions: {
    setTheme (name: 'dark' | 'light') {
      this.theme = name || 'light'
      VxeUI.setTheme(name)
      document.documentElement.setAttribute('vxe-run-theme', name)
      localStorage.setItem('VXE_THEME', name)
    },
    setLanguage (language: VxeGlobalI18nLocale) {
      this.language = language || 'zh-CN'
      VxeUI.setLanguage(language)
      i18n.global.locale = language as 'zh-CN'
      localStorage.setItem('VXE_DOCS_LANGUAGE', language)
    }
  }
})
