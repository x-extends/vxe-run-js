export async function parseV4OptionCode (optionId: string) {
  let template = ''
  let script = ''
  let style = ''
  try {
    if (optionId) {
      const codeUrl = atob(decodeURIComponent(optionId))
      const text = await fetch(`${import.meta.env.VITE_APP_SITE_BASE_URL}${codeUrl}?v=${import.meta.env.VITE_APP_DATE_NOW}`).then(res => res.text())
      if (text) {
        template = ''
        script = ''
        style = ''
      }
    }
  } catch (e) {
  }
  return {
    template,
    script,
    style
  }
}
