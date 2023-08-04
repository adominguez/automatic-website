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
};

export const transformAction = (id, tag) => {
  const editor = document.getElementById(id);
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  // Verificar si hay texto seleccionado
  if (!selection.isCollapsed) {
    // Obtener el elemento más cercano que envuelve al texto seleccionado
    const commonAncestor = range.commonAncestorContainer.parentElement;

    // Verificar si el elemento más cercano es <b> (negrita)
    if (commonAncestor.tagName?.toLowerCase() === tag) {
      // Si el texto seleccionado ya está en negrita, quitar el estilo
      commonAncestor.outerHTML = commonAncestor.innerHTML;
    } else {
      // Si el texto seleccionado no está en negrita, envolverlo con <b> para aplicar el estilo
      const boldElement = document.createElement(tag);
      boldElement.appendChild(range.extractContents());
      range.insertNode(boldElement);
    }
  } else {
    const regex = REGEX_BY_TAG[tag].regex;
    // Si no hay texto seleccionado, envolver todo el contenido con <b> para aplicar el estilo
    const allContent = editor.innerHTML;
    if (regex.test(allContent)) {
      editor.innerHTML = `${allContent.replace(REGEX_BY_TAG[tag].regexContent, '$1')}`
    }
    editor.innerHTML = `<${tag}>${allContent.replace(REGEX_BY_TAG[tag].regexContent, '$1')}</${tag}>`;
  }
}
