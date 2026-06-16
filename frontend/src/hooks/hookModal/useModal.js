import { useState } from "react"

export const useModal = (initialValue = false) => {

  const [isOpen, setIsOpen] = useState(initialValue)

  const openModal = () => {
    setIsOpen (true)
  }

  const closeModal = () =>{
    setIsOpen(false)
  }

  const toggleModal = () => {
    setIsOpen(prev => !prev)
  }

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsOpen
  }
}
