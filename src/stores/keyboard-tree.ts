import { observable, computed, action } from 'mobx'
import { SoundboardButtonData } from './soundboard-buttons-store'
import { mockData } from './data'
import { ValidTreeThing } from '../keyboard-tree/valid-tree-thing'
import { getCoordinate } from '../keyboard-tree/layout'

export enum KeyboardTreeType {
  Branch,
  Leaf
}

interface Leaf<T> {
  type: KeyboardTreeType.Leaf
  data: T
}

interface Branch<T> extends KeyboardTree<T> {
  type: KeyboardTreeType.Branch
}

export type SoundboardTree = KeyboardTree<SoundboardButtonData>

// add concept of a twig...?

type KeyboardTree<T> = { [key in ValidTreeThing]?: Leaf<T> | Branch<T> }

export default class KeyboardTreeStore {
  @observable treePath: ValidTreeThing[] = []

  @computed
  get currentTreeViewMap() {
    let currentTree = { ...this.keyboardTree }
    this.treePath.forEach(treeThing => {
      currentTree = currentTree[treeThing] as SoundboardTree
    })
    return currentTree
  }

  @computed
  get currentTreeViewArray() {
    return Object.keys(this.currentTreeViewMap)
      .filter(k => k !== 'type')
      .map(k => {
        const key = k as ValidTreeThing
        const item = this.currentTreeViewMap[key]
        if (!item) {
          console.log(
            'TODO: This should never happen but Typescript is complianing.'
          )
          const obj = {
            type: KeyboardTreeType.Branch
          } as Branch<SoundboardButtonData>
          return { ...obj, coordinate: { x: 1, y: 2 }, key }
        }
        return {
          key,
          coordinate: getCoordinate(key),
          ...item
        }
      })
  }

  @action
  goInto = (key: ValidTreeThing) => {
    this.treePath.push(key)
  }

  @observable keyboardTree: SoundboardTree = {
    q: { type: KeyboardTreeType.Leaf, data: mockData[2] },
    '1': { type: KeyboardTreeType.Leaf, data: mockData[1] },
    '2': {
      type: KeyboardTreeType.Branch,
      a: { type: KeyboardTreeType.Leaf, data: mockData[0] },
      b: {
        type: KeyboardTreeType.Branch,
        b: { type: KeyboardTreeType.Leaf, data: mockData[3] }
      }
    }
  }
}
