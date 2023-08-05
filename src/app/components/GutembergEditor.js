'use client'
import { useRef, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useBlocks, useFocus } from '@/app/hooks/Gutemberg'
import GutembergPopover from "./GutembergPopover";
import GutembergContentEditable from "./GutembergContentEditable";
import GutembergPopoverEditing from "./GutembergPopoverEditing";
import { transformAction, parsePastedContent, wrapText, isList, isH1, getListValues } from '@/app/libs/clipboard'

const GutembergEditor = () => {
  const {blocks, removeAllPopover, getBlockFromId, updateValue, createNewBlock, removeBlock, createSeveralBlocks, editingField, changeTypeBlock} = useBlocks();
  const inputRef = useRef([]);
  const { getRefFromId, focusElement } = useFocus(inputRef)

  const handleclick = (e) => {
    const currentInput = getRefFromId(e.target.id);
    if (!currentInput) {
      removeAllPopover()
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleclick);
    return () => {
      window.removeEventListener('click', handleclick);
    };
  }, []);

  const handleContentChange = (evt, id) => {
    const { target, currentTarget } = evt;
    const isList = currentTarget.tagName === 'LI'
    const { value, innerHTML } = isList ? currentTarget.parentElement : target
    const newValue = isList ? innerHTML : value
    updateValue(id, newValue)
  }

  const handleKeyDown = (event, id, tag, value) => {
    const currentIndex = blocks.findIndex(item => item.id === id);
    if (event.key === "Enter" && event.shiftKey) {
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value) {
        const newId = uuidv4()
        if (tag !== 'h1') {
          createNewBlock(id, getRefFromId(id), newId)
        }
        focusElement(isList(tag) && getListValues(getRefFromId(id)?.innerHTML).slice(-1)?.[0] !== '' ? id : newId)
      }
    }
    const hasPosibleLength = blocks?.length > 2 || blocks.some(item => item.value?.length > 0 && !isH1(item.tag));
    if (event.key === 'Backspace' && event.target.innerHTML.trim() === '' && hasPosibleLength && !isH1(tag)) {
      removeBlock(id, inputRef.current[currentIndex])
      if (isList(inputRef.current[currentIndex].tagName)) {
        focusElement(id)
      } else {
        focusElement(inputRef.current[currentIndex - 1].el.current.id);
      }
    }
    if (event.key === 'ArrowUp') {
      if (currentIndex > 0) {
        const selection = window.getSelection()

        if (selection && selection.anchorOffset === 0 && selection.focusOffset === 0) {
          const focusId = inputRef.current[currentIndex - 1]?.id || inputRef.current[currentIndex - 1]?.el?.current?.id
          focusElement(focusId)
          return;
        }
      }
    }
    if (event.key === 'ArrowDown') {
      if (currentIndex <= inputRef.current?.length) {
        const focusId = inputRef.current[currentIndex + 1]?.id || inputRef.current[currentIndex + 1]?.el?.current?.id
        focusElement(focusId)
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
        createSeveralBlocks(id, blocksFromPastedContent)
      }
    }, 0);
  };

  const handleFocus = (e) => {
    const currentElement = e.currentTarget
    const { tagName } = currentElement;
    if (isList(tagName)) {
      e.preventDefault()
      return
    }
    const { id } = currentElement
    const { value, tag } = getBlockFromId(id)
    const range = document.createRange();
    const selection = window.getSelection();

    // Establecer el rango de selección al final del contenido
    range.selectNodeContents(currentElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    editingField(id, value, tag)
  };

  const handlerChangeType = (initialSelected, id) => {
    changeTypeBlock(id, initialSelected)
    focusElement(id);
  }

  const handlerEdition = (type, id, tagName) => {
    if (type === 'transform') {
      transformAction(id, tagName);
    }
    const currentInput = getRefFromId(id)
    const { current } = currentInput?.el
    updateValue(id, current.innerHTML)
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