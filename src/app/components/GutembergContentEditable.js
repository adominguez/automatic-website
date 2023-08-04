import { forwardRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { ariaByTag, classByTag } from '@/app/constants/gutemberg'

const getClassName = (value, tag) => `default-field placeholder ${classByTag[tag]} ${value?.length ? `opacity-100` : 'opacity-50'}`

const GutembergContentEditable = forwardRef(function GutembergContentEditable({ value, id, tag, onChange, onKeyDown, onPaste, onFocus }, ref) {
  return (
    <ContentEditable
      className={`flex-1 gap-4 ${getClassName(value, tag)}`}
      aria-label={ariaByTag[tag]}
      id={id}
      html={value || ''} tagName={tag}
      ref={ref}
      onChange={(e) => onChange(e, id)}
      onKeyDown={(e) => onKeyDown(e, id, tag, value)}
      onFocus={(e) => onFocus(e)}
      onPaste={(event) => onPaste(event, id)}
    />
  );
});

export default GutembergContentEditable