import { v4 as uuidv4 } from 'uuid'

const REGEX_BY_TAG = {
  b: {
    regex: /^<b[^>]*>(.*?)<\/b>$/,
    regexContent: /<b[^>]*>(.*?)<\/b>/g
  },
  i: {
    regex: /^<i[^>]*>(.*?)<\/i>$/,
    regexContent: /<i[^>]*>(.*?)<\/i>/g
  },
  u: {
    regex: /^<u[^>]*>(.*?)<\/u>$/,
    regexContent: /<u[^>]*>(.*?)<\/u>/g
  },
  a: {
    regex: /^<a[^>]*>(.*?)<\/a>$/,
    regexContent: /<a[^>]*>(.*?)<\/a>/g
  }
}

export const transformAction = ({ id, tagName, link }) => {
  const editor = document.getElementById(id)
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)

  // Verificar si hay texto seleccionado
  if (!selection.isCollapsed) {
    // Obtener el elemento más cercano que envuelve al texto seleccionado
    const commonAncestor = range.commonAncestorContainer.parentElement

    // Verificar si el elemento más cercano es <b> (negrita)
    if (commonAncestor.tagName?.toLowerCase() === tagName) {
      // Si el texto seleccionado ya está en negrita, quitar el estilo
      commonAncestor.outerHTML = commonAncestor.innerHTML
    } else {
      // Si el texto seleccionado no está en negrita, envolverlo con <b> para aplicar el estilo
      const boldElement = document.createElement(tagName)
      boldElement.appendChild(range.extractContents())
      range.insertNode(boldElement)
    }
  } else {
    const regex = REGEX_BY_TAG[tagName].regex
    // Si no hay texto seleccionado, envolver todo el contenido con <b> para aplicar el estilo
    const allContent = editor.innerHTML
    if (regex.test(allContent)) {
      editor.innerHTML = `${allContent.replace(REGEX_BY_TAG[tagName].regexContent, '$1')}`
    }
    editor.innerHTML = `<${tagName}>${allContent.replace(REGEX_BY_TAG[tagName].regexContent, '$1')}</${tagName}>`
  }
}

const createLink = ({ url, rel, newTab, textLink }) => {
  const linkElement = document.createElement('a')
  linkElement.href = url
  if (rel) {
    linkElement.rel = rel
  }
  if (newTab) {
    linkElement.target = '_blank'
  }
  linkElement.alt = url
  linkElement.innerHTML = textLink
  return linkElement
}

export const linkAction = ({ id, tagName, link, range }) => {
  const editor = document.getElementById(id)
  const { textLink, url, noFollow, sponsored, newTab, isSelectedText } = link
  const rel = `${noFollow ? 'noFollow' : ''}${sponsored ? ' sponsored' : ''}`
  // Verificar si hay texto seleccionado
  const linkElement = createLink({ url, rel, newTab, textLink })
  if (isSelectedText) {
    // Obtener el elemento más cercano que envuelve al texto seleccionado
    const commonAncestor = range.commonAncestorContainer.parentElement

    // Verificar si el elemento más cercano es <b> (negrita)
    if (commonAncestor.tagName?.toLowerCase() === tagName) {
      // Si el texto seleccionado ya está en negrita, quitar el estilo
      commonAncestor.outerHTML = linkElement.outerHTML
    } else {
      // Si el texto seleccionado no está en negrita, envolverlo con <b> para aplicar el estilo
      range.extractContents()
      range.insertNode(linkElement)
    }
  } else {
    // Si no hay texto seleccionado, envolver todo el contenido con <b> para aplicar el estilo
    const allContent = editor.innerHTML
    editor.innerHTML = `${allContent}${linkElement.outerHTML}`
  }
}

export const parsePastedContent = (content, id, block) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const validTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'span'] // Lista de etiquetas válidas en tu contexto

  const blocksFromTags = Array.from(doc.body.childNodes).reduce((blocks, node, index) => {
    if (node.nodeType === Node.ELEMENT_NODE && validTags.includes(node.tagName.toLowerCase())) {
      const tag = node.tagName.toLowerCase() === 'span' ? block.tag : node.tagName.toLowerCase()
      const value = node.innerHTML.trim() || block.value
      if (value !== '') {
        const block = { tag, value, id: index === 0 ? id : uuidv4() }
        return [...blocks, block]
      }
    }
    return blocks
  }, [])

  return blocksFromTags
}

export const wrapText = (str) => {
  let result = str.replace(/&nbsp;/g, ' ')
  const matches = result.match(/(<[^>]+>)/g)
  if (matches) {
    const tag = matches[0]
    result = result.replace(tag, '')
    result = tag + result
  }
  return result
}

export const isList = (tagName) => tagName?.toLowerCase() === 'li' || tagName?.toLowerCase() === 'ul' || tagName?.toLowerCase() === 'ol'

export const isH1 = (tagName) => tagName?.toLowerCase() === 'h1'

export const getListValues = (value) => {
  const regex = /<li[^>]*>(.*?)<\/li>/gi
  const matches = []
  let match

  while ((match = regex.exec(value)) !== null) {
    matches.push(match[1])
  }
  return matches
}
