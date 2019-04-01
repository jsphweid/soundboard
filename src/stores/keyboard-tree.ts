import { observable, computed, action } from 'mobx'
import { SoundboardButtonData } from './soundboard-buttons-store'
import { mockData } from './data'
import {
  ValidTreeThing,
  isValidTreeThing
} from '../keyboard-tree/valid-tree-thing'
import { getCoordinate, getKeyboardKey } from '../keyboard-tree/layout'
import { Coordinate } from '../sounds/types'

export enum KeyboardTreeType {
  Branch,
  Leaf
}

interface Leaf<T> {
  type: KeyboardTreeType.Leaf
  id: string
  data: T
}

interface Branch<T> extends KeyboardTree<T> {
  type: KeyboardTreeType.Branch
  id: string
  title?: string
}

export type SoundboardTree = KeyboardTree<SoundboardButtonData>

// add concept of a twig...?

type KeyboardTree<T> = { [key in ValidTreeThing]?: Leaf<T> | Branch<T> }

export default class KeyboardTreeStore {
  @observable treePath: ValidTreeThing[] = []

  @computed
  get globalTreeFlattenedNoChildren() {
    interface TreeWithPath extends SoundboardTree {
      path: ValidTreeThing[]
    }
    const flattenedTree: { [key: string]: TreeWithPath } = {}
    const addChildren = (tree: SoundboardTree, path: ValidTreeThing[] = []) => {
      Object.keys(tree)
        .filter(isValidTreeThing)
        .forEach(key => {
          const item = tree[key]
          if (!item) return
          if (item.type === KeyboardTreeType.Branch) {
            addChildren(item, [...path, key])
          }
          flattenedTree[item.id] = { ...item, path }
        })
    }
    addChildren(this.keyboardTree)
    return flattenedTree
  }

  @computed
  get currentTreeViewMap() {
    return this.getItem(this.treePath) as SoundboardTree
  }

  @computed
  get currentTreeViewArray() {
    return Object.keys(this.currentTreeViewMap)
      .filter(isValidTreeThing)
      .map(key => {
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

  @action
  reset = () => {
    this.treePath = []
  }

  @action
  backOne = () => {
    this.treePath.pop()
  }

  @action
  moveItem = (
    id: string,
    coordinate: Coordinate,
    path: ValidTreeThing[] = this.treePath
  ) => {
    const targetKeyboardKey = getKeyboardKey(coordinate)

    if (!targetKeyboardKey) {
      console.log('Somehow the target keyboard key was not found.')
      return
    }
    const itemInTarget = this.getItem([...path, targetKeyboardKey])

    if (itemInTarget) {

    } else {
      delete 
      
    }
    // is there an item there?
  }

  getItem = (path: ValidTreeThing[]): SoundboardTree | null => {
    try {
      let currentTree = { ...this.keyboardTree }
      path.forEach(treeThing => {
        currentTree = currentTree[treeThing] as SoundboardTree
      })
      return currentTree
    } catch (_) {
      return null
    }
  }

  @observable keyboardTree: SoundboardTree = {
    q: { type: KeyboardTreeType.Leaf, data: mockData[2], id: '111' },
    '1': { type: KeyboardTreeType.Leaf, data: mockData[1], id: '222' },
    '2': {
      id: '333',
      title: 'go deeper',
      type: KeyboardTreeType.Branch,
      a: { type: KeyboardTreeType.Leaf, data: mockData[0], id: '444' },
      b: {
        id: '555',
        title: 'further down',
        type: KeyboardTreeType.Branch,
        b: { type: KeyboardTreeType.Leaf, data: mockData[3], id: '666' }
      }
    }
  }
}
