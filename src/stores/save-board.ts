import { observable, action } from 'mobx'

export default class SaveBoard {
  @observable saveBoardModalIsOpen = false

  @action
  openSaveBoardModal = () => {
    this.saveBoardModalIsOpen = true
  }

  @action
  closeSaveBoardModal = () => {
    this.saveBoardModalIsOpen = false
  }
}
