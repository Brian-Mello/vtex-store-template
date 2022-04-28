import React, { FormEvent, useEffect, useState } from 'react'
import CloseIcon from '../../../../assets/icons/close-icon-black.svg';

// device
import { useDevice } from "vtex.device-detector";

// animation and style
const Slide = require("react-reveal/Slide")
import style from './styles.css';

// typings
import { RequestData, FirstVisitModalProps } from "../../../interfaces/home/FirstVisitModal"
import { checkExistentEmail } from '../../../utils/MD-requests';

const FirstVisitModal = ({ imageDesktop, imageMobile, title, text, buttonText }: FirstVisitModalProps) => {
  const { isMobile } = useDevice();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /**
   * useEffect
   *
   * Get from local storage a "submitModal" field. If this field exists, modalIsOpen state was setted as false and the overflow of the body is retaked 
   * 
   * @returns void
   */
  useEffect(() => {
    const submitModal = window.localStorage.getItem("submitModal");
    submitModal ? setModalIsOpen(false) : setModalIsOpen(true);
    submitModal ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden";
  })

  /**
   * Send user data
   *
   * Send the user data to masterdata. Depending the result, the functions handleSubmitModal() and setModalIsOpen() are called or not.
   * 
   * @param {FormData} event
   * @returns false or a function
   */
  const sendUserData = async (e: FormEvent) => {
    e.preventDefault()

    let requestData: RequestData = {
      entity: "CS",
      field: "email",
      hasPostMethod: true,
      searchField: email,
      data: {
        name,
        email
      },
    };

    const result = await checkExistentEmail(requestData, clearInputFields());

    result === false ? handleSubmitModal() : "";

    setModalIsOpen(false);
  }

  /**
   * handle submit modal
   *
   * this function set on local storage a field and close the modal
   * 
   * @returns void
   */
  const handleSubmitModal = () => {
    window.localStorage.setItem("submitModal", "true");
    setModalIsOpen(false);
  };

  /**
   * clear input fields
   *
   * this function clear the input fields when it was called
   * 
   * @returns void
   */
  const clearInputFields = () => {
    setName("");
    setEmail("");
  };

  return (
    modalIsOpen != false ?
      <section className={style.santalollaClubModalContainer}>
        <Slide top>
          <div className={style.santalollaClubModalContent}>
            <img className={style.closeIcon} src={CloseIcon} alt="close icon" onClick={() => handleSubmitModal()} />
            <img className={style.santalollaClubBanner} src={isMobile ? imageMobile : imageDesktop} alt="Imagem do modal" />
            <div className={style.santalollaClubTextContainer}>
              <h2>{title}</h2>
              <p>{text}</p>
              <form className={style.santalollaClubInputContainer} onSubmit={(e) => sendUserData(e)}>
                <input className={style.santalollaClubInput}
                  required
                  type="text"
                  placeholder='Digite seu nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input className={style.santalollaClubInput}
                  required
                  type="email"
                  placeholder='Digite seu e-mail'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit'> {buttonText} </button>
              </form>
            </div>
          </div>
        </Slide>
      </section>
      :
      <></>
  )
}

/**
 * First visit modal schema
 *
 * This schema was created to permit the client make changes on this modal over vtex admin site editor
 * 
 *  @param {string} imageDesktop
 *  @param {string} imageMobile
 *  @param {string} title
 *  @param {string} text
 *  @param {string} buttonText
 */
FirstVisitModal.schema = {
  title: "Modal de Primeira visita",
  description: "Conteúdo do modal de primeira visita",
  type: "object",
  properties: {
    imageDesktop: {
      title: "Imagem Desktop",
      description: "Imagem do modal Desktop",
      type: "string",
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageMobile: {
      title: "Imagem Mobile",
      description: "Imagem do modal Mobile",
      type: "string",
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    title: {
      title: "Título",
      description: "Título do modal",
      type: "string"
    },
    text: {
      title: "Texto",
      description: "Texto do modal",
      type: "string"
    },
    buttonText: {
      title: "Texto botão",
      description: "Texto do botão modal",
      type: "string"
    },
  }
}

export default FirstVisitModal;