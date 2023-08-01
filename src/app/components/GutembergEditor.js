'use client'
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import ContentEditable from 'react-contenteditable';
import { INITIAL_BLOCKS, classByTag, ariaByTag } from '@/app/constants/gutemberg'
import GutembergPopover from "./GutembergPopover";

const parsePastedContent = (content, id, block) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const validTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'span']; // Lista de etiquetas válidas en tu contexto

  const blocksFromTags = Array.from(doc.body.childNodes).reduce((blocks, node, index) => {
    if (node.nodeType === Node.ELEMENT_NODE && validTags.includes(node.tagName.toLowerCase())) {
      const tag = node.tagName.toLowerCase() === 'span' ? block.tag : node.tagName.toLowerCase();
      const value = node.textContent.trim() || block.value;
      if (value !== '') {
        const block = { tag, value, editing: false, id: index === 0 ? id : uuidv4() };
        return [...blocks, block];
      }
    }
    return blocks;
  }, []);

  return blocksFromTags;
};

const wrapText = (str) => {
  let result = str.replace(/&nbsp;/g, ' ');
  let matches = result.match(/(<[^>]+>)/g);
  if (matches) {
    let tag = matches[0];
    result = result.replace(tag, '');
    result = tag + result;
  }
  return result;
}

const getClassName = (value, tag) => `default-field placeholder ${classByTag[tag]} ${value?.length ? `opacity-100` : 'opacity-50'}`

const GutembergEditor = () => {
  const [blocks, setBlocks] = useState([]);
  const inputRef = useRef([]);

  useEffect(() => {
    setBlocks(INITIAL_BLOCKS)
  }, [])

  useEffect(() => {
    console.log('blocks updated')
  }, [blocks])

  const focusElement = (id) => {
    setTimeout(() => {
      const newElement = inputRef.current.find(item => item.el.current.id === id);
      if (newElement) {
        newElement?.el.current?.focus();
      }
    }, 0);
  }

  const getBlockFromId = (id) => blocks.find(item => item.id === id)

  const handleContentChange = (evt, id) => {
    const { target } = evt;
    const { value } = target
    setBlocks((oldData) => oldData.map(item => ({
      ...item,
      value: item.id === id ? value : item.value
    })))
  }

  const handleKeyDown = (event, id, tag, value) => {
    if (event.key === "Enter" && event.shiftKey) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value) {
        const newId = uuidv4()
        if (tag !== 'h1') {
          const newBlock = { tag: 'p', editing: false, id: newId };
          setBlocks(oldData => [...oldData, newBlock]);
        }
        focusElement(newId)
      }
    }
    const hasPosibleLength = blocks?.length > 2 || blocks.some(item => item.value?.length > 0 && item.tag !== 'h1');
    if (event.key === 'Backspace' && event.target.innerHTML.trim() === '' && hasPosibleLength && tag !== 'h1') {
      const currentIndex = blocks.findIndex(item => item.id === id);
      setBlocks(oldData => oldData.filter(item => item.id !== id));
      focusElement(blocks[currentIndex - 1]?.id)
    }
    if (event.key === 'ArrowUp') {
      const elementIndex = inputRef.current.findIndex(item => item.el.current.id === event.currentTarget.id);
      if (elementIndex > 0) {
        const selection = window.getSelection()

        if (selection && selection.anchorOffset === 0 && selection.focusOffset === 0) {
          inputRef.current[elementIndex - 1]?.el.current?.focus();
          return;
        }
      }
    }
    if (event.key === 'ArrowDown') {
      const elementIndex = inputRef.current.findIndex(item => item.el.current.id === event.currentTarget.id);
      if (elementIndex <= blocks?.length) {
        inputRef.current[elementIndex + 1]?.el.current?.focus();
      }
    }
  }

  const handlePaste = (event, id) => {
    setTimeout(() => {
      const block = getBlockFromId(id)
      const pastedContent = wrapText(event.target.innerHTML);
      const blocksFromPastedContent = parsePastedContent(pastedContent, id, block);
      if (blocksFromPastedContent?.length) {
        event.preventDefault()
        const index = blocks.findIndex(item => item.id === id)
        const newBlocks = [...blocks.slice(0, index), ...blocksFromPastedContent, ...blocks.slice(index + 1)]
        setBlocks(newBlocks);
      }
    }, 0)
  }

  const handleFocus = (e) => {
    const currentElement = e.currentTarget;
    const range = document.createRange();
    const selection = window.getSelection();

    // Establecer el rango de selección al final del contenido
    range.selectNodeContents(currentElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handlerChangeType = (initialSelected, id) => {
    const newBlocks = blocks.map((item) => ({
      ...item,
      tag: item.id === id ? initialSelected?.tag : item.tag,
      value: item.id === id ? initialSelected?.value : item.value,
    }))
    setBlocks(newBlocks)
    focusElement(id);
  }

  return <>
    {blocks?.map(({ id, value, tag }, i) => {
      return (
        <div key={id} className="flex items-baseline gap-4">
          <ContentEditable
            className={`flex-1 ${getClassName(value, tag)}`}
            aria-label={ariaByTag[tag]}
            id={id}
            html={value || ''} tagName={tag}
            ref={el => (inputRef.current[i] = el)}
            onChange={(e) => handleContentChange(e, id)}
            onKeyDown={(e) => handleKeyDown(e, id, tag, value)}
            onFocus={handleFocus}
            onPaste={(event) => handlePaste(event, id)}
          />
          {
            i > 0 && !value ? (<GutembergPopover selection={id} handlerChangeType={handlerChangeType} />) : null
          }
        </div>
      )
    })}
    Create New block
  </>
}

export default GutembergEditor;