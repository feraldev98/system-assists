import { useEffect, useState } from "react"

export const useVisible = (
  delay = 80
) => {
  
  const [visible, setVisible] =
    useState(false)

  useEffect(() => {

    const t = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(t)

  }, [delay])

  return {
    visible,
    setVisible
  }
}