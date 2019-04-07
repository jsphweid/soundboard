import { observable, action } from 'mobx'

export default class LoadBoard {
  @observable loadBoardModalIsOpen = false

  @action
  openLoadBoardModal = () => {
    this.loadBoardModalIsOpen = true
  }

  @action
  closeLoadBoardModal = () => {
    this.loadBoardModalIsOpen = false
  }
}
