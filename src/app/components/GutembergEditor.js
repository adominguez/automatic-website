'use client'
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { INITIAL_BLOCKS } from '@/app/constants/gutemberg'
import GutembergPopover from "./GutembergPopover";
import GutembergContentEditable from "./GutembergContentEditable";
import GutembergPopoverEditing from "./GutembergPopoverEditing";
import { transformAction } from '@/app/libs/clipboard.js'

const parsePastedContent = (content, id, block) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const validTags = ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'span']; // Lista de etiquetas válidas en tu contexto

  const blocksFromTags = Array.from(doc.body.childNodes).reduce((blocks, node, index) => {
    if (node.nodeType === Node.ELEMENT_NODE && validTags.includes(node.tagName.toLowerCase())) {
      const tag = node.tagName.toLowerCase() === 'span' ? block.tag : node.tagName.toLowerCase();
      const value = node.innerHTML.trim() || block.value;
      if (value !== '') {
        const block = { tag, value, id: index === 0 ? id : uuidv4() };
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

const GutembergEditor = () => {
  const [blocks, setBlocks] = useState([]);
  const inputRef = useRef([]);

  useEffect(() => {
    setBlocks(INITIAL_BLOCKS)
  }, [])

  const handleclick = (e) => {
    const currentInput = getRefFromId(e.target.id);
    if (!currentInput) {
      setBlocks((oldData) => oldData.map((item) => ({
        ...item,
        editing: false
      })))
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleclick);
    return () => {
      window.removeEventListener('click', handleclick);
    };
  }, []);

  const focusElement = (id) => {
    setTimeout(() => {
      const newElement = inputRef.current.find(item => item?.el?.current?.id === id);
      if (newElement) {
        newElement?.el.current?.focus();
      }
    }, 0);
  }

  const getBlockFromId = (id) => blocks.find(item => item.id === id)

  const getRefFromId = (id) => inputRef.current.find(item => item?.el?.current?.id === id)

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
          const newBlock = { tag: 'p', id: newId };
          setBlocks(oldData => oldData.reduce((acc, item, index) => {
            const isNode = item.id === id;
            const order = acc.some(block => block.id === newId) ? index + 1 : index
            acc.push({
              ...item,
              order
            })
            if (isNode) {
              acc.push({
                ...newBlock,
                order: index + 1
              })
            }
            return acc
          }, []))
        }
        focusElement(newId)
      }
    }
    const hasPosibleLength = blocks?.length > 2 || blocks.some(item => item.value?.length > 0 && item.tag !== 'h1');
    if (event.key === 'Backspace' && event.target.innerHTML.trim() === '' && hasPosibleLength && tag !== 'h1') {
      const currentIndex = blocks.findIndex(item => item.id === id);
      const blocksToKeep = blocks.filter(item => item.id !== id).map((item, order) => ({
        ...item,
        order
      }));
      setBlocks([...blocksToKeep]);
      focusElement(blocksToKeep[currentIndex - 1]?.id);
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
      const block = getBlockFromId(id);
      const pastedContent = wrapText(event.target.innerHTML);
      const blocksFromPastedContent = parsePastedContent(pastedContent, id, block);
      if (blocksFromPastedContent?.length) {
        event.preventDefault();
        setBlocks((oldData) => oldData.reduce((acc, item, order) => {
          const isNode = item.id === id
          if (isNode) {
            blocksFromPastedContent.forEach((block) => {
              acc.push({
                ...block,
                order: acc?.length
              })
            })
          } else {
            acc.push({
              ...item,
              order: acc?.length
            })
          }
          return acc
        }, []));
      }
    }, 0);
  };

  const handleFocus = (e) => {
    const currentElement = e.currentTarget;
    const { id } = currentElement
    const { value, tag } = getBlockFromId(id)
    const range = document.createRange();
    const selection = window.getSelection();

    // Establecer el rango de selección al final del contenido
    range.selectNodeContents(currentElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    setBlocks((oldData) => oldData.map(item => ({
      ...item,
      editing: tag === 'h1' ? false : item.id === id && !!value
    })))
  };

  const handlerChangeType = (initialSelected, id) => {
    setBlocks((oldData) => oldData.map((item) => ({
      ...item,
      tag: item.id === id ? initialSelected?.tag : item.tag,
      value: item.id === id ? initialSelected?.value : item.value,
    })))
    focusElement(id);
  }

  const handlerEdition = (type, id, tagName) => {
    if (type === 'transform') {
      transformAction(id, tagName);
    }
    setBlocks((oldData) => oldData.map((item) => {
      const currentInput = getRefFromId(item.id)
      const { current } = currentInput?.el
      return ({
        ...item,
        value: current.id === id ? current?.innerHTML : item.value
      })
    }))
  }

  return <>
    {blocks?.map(({ id, value, tag, editing }, i) => {
      return (
        <div key={id} className="relative flex items-baseline gap-4 p-2 transition-colors border border-transparent hover:border-blue-gray-500 focus-within:border-blue-gray-500">
          {
            editing && value ? <GutembergPopoverEditing tag={tag} id={id} handlerEdition={handlerEdition} /> : null
          }
          <GutembergContentEditable value={value}
            id={id} tag={tag} ref={el => (inputRef.current[i] = el)}
            onFocus={handleFocus}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
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