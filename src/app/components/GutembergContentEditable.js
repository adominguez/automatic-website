import { createElement, forwardRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { ariaByTag, classByTag } from '@/app/constants/gutemberg'
import { isList } from '../libs/clipboard';

const getClassName = (value, tag) => `default-field ${classByTag[tag]} ${value?.length ? `opacity-100` : 'opacity-50'}`

const tagNameByTag = {
  hr: 'div'
}

const valueByTag = {
  hr: '<hr />'
}

const GutembergContentEditable = forwardRef(function GutembergContentEditable({ value, id, tag, onChange, onKeyDown, onPaste, onFocus }, ref) {

  const getTotalListValues = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    return Array.from(doc.body.querySelectorAll('li'));
  }

  return (
    <>
      {isList(tag) ?
        createElement(
          tag,
          {
            ref, className: 'flex flex-col flex-1 list-disc', id
          },
          getTotalListValues().map((item, index) => (
            <ContentEditable
              key={`${id}-${index}`}
              id={`${id}-${index}`}
              className={`content-editable flex-1 gap-4 ${getClassName(item.innerHTML, 'li')}`}
              html={item.innerHTML || ''} tagName='li'
              aria-label={ariaByTag.li}
              onChange={(e) => onChange(e, id)}
              onKeyDown={(e) => onKeyDown(e, id, tag, value)}
              onFocus={(e) => onFocus(e)}
              onPaste={(event) => onPaste(event, id)}
            />
          ))
        )
        : <ContentEditable
          className={`content-editable flex-1 gap-4 ${getClassName(value, tag)}`}
          aria-label={ariaByTag[tag]}
          id={id}
          html={valueByTag[tag] || value || ''} tagName={tagNameByTag[tag] || tag}
          ref={ref}
          onChange={(e) => onChange(e, id)}
          onKeyDown={(e) => onKeyDown(e, id, tag, value)}
          onFocus={(e) => onFocus(e)}
          onPaste={(event) => onPaste(event, id)}
        />}
    </>
  );
});

export default GutembergContentEditable