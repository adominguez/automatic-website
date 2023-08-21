import { useState } from 'react'

export const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = (event) => setScrollTop(event.target.scrollTop)
  return [scrollTop, { onScroll }]
}
