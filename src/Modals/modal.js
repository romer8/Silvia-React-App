
import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
// import './styles.css'
import {ModalDisclaimer} from '../styles/ModalDisclaimer.styled'


const modalElement = document.getElementById('modal-root')

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const close = useCallback(() => setIsOpen(false), [])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [close])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? (
        <ModalDisclaimer>
        <div className={`modal2 ${fade ? 'modal-fade2' : ''}`}>
            <div className="modal-overlay2" onClick={close} />
            <span role="button" className="modal-close2" aria-label="close" onClick={close}>
            x
            </span>
            <div className="modal-body2">{children}</div>
        </div>
        </ModalDisclaimer>

    ) : null,
    modalElement
  )
}

export default forwardRef(Modal)