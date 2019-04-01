import { observable, computed, action, toJS } from 'mobx'
import { SoundboardButtonData } from './soundboard-buttons-store'
import { mockData } from './data'
import {
  ValidTreeThing,
  isValidTreeThing
} from '../keyboard-tree/valid-tree-thing'
import { getCoordinate, getKeyboardKey } from '../keyboard-tree/layout'
import { Coordinate } from '../sounds/types'

export enum KeyboardTreeType {
  Branch = 'Branch',
  Leaf = 'Leaf',
  Twig = 'Twig'
}

// TODO... if everything has type, id, data... do it off of that

interface Leaf<T> {
  type: KeyboardTreeType.Leaf
  id: string
  data: T
}

interface Twig<T> extends TwigItems<T> {
  type: KeyboardTreeType.Twig
  id: string
  title: string
}

interface Branch<T> extends KeyboardTree<T> {
  type: KeyboardTreeType.Branch
  id: string
  title: string
}

export type BaseSoundboardKeyboardTree = KeyboardTree<SoundboardButtonData>

export type SoundboardTree = Branch<SoundboardButtonData>
type Node<T> = Leaf<T> | Branch<T>
export type SoundboardTreeNode = Node<SoundboardButtonData>

// add concept of a twig...?

type KeyboardTree<T> = {
  [key in ValidTreeThing]?: Leaf<T> | Branch<T> | Twig<T>
}
type TwigItems<T> = { [key in ValidTreeThing]?: Leaf<T> }

export default class KeyboardTreeStore {
  @observable treePath: ValidTreeThing[] = []

  @computed
  get globalTreeFlattenedNoChildren() {
    interface TreeWithPath extends BaseSoundboardKeyboardTree {
      path: ValidTreeThing[]
      keyboardKey: ValidTreeThing
      type: KeyboardTreeType
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
          flattenedTree[item.id] = { ...item, path, keyboardKey: key }
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
  get parentTreeViewMap() {
    return this.getItem(this.treePath.slice(-1)) as SoundboardTree
  }

  @computed
  get currentTreeViewArray() {
    return this.viewToArray(this.currentTreeViewMap)
  }

  @computed
  get parentTreeViewArray() {
    return this.viewToArray(this.parentTreeViewMap)
  }

  viewToArray = (view: SoundboardTree) => {
    return Object.keys(view)
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
  goInto = (input: ValidTreeThing | Coordinate) => {
    const keyboardKey =
      typeof input === 'string' && isValidTreeThing(input)
        ? input
        : getKeyboardKey(input)
    if (!keyboardKey) {
      console.log('Somehow the coordinate is not right.')
      return
    }

    console.log('keyboardKey', keyboardKey)

    console.log('input', input)

    const node = this.getItem([...this.treePath, keyboardKey])
    console.log('node', toJS(node))
    if (node && node.type === KeyboardTreeType.Branch) {
      console.log('attempting to go into', keyboardKey)
      this.treePath.push(keyboardKey)
    } else {
      console.log('Cannot go into a non-branch.')
    }
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
  moveItem = (id: string, coordinate: Coordinate) => {
    const nodeInfo = this.globalTreeFlattenedNoChildren[id]
    const targetKeyboardKey = getKeyboardKey(coordinate)

    if (!targetKeyboardKey) {
      console.log('Somehow the target keyboard key was not found.')
      return
    }

    if (
      nodeInfo.keyboardKey === targetKeyboardKey &&
      JSON.stringify(nodeInfo.path) === JSON.stringify(this.treePath)
    ) {
      // Basically it hasn't moved... ignore
      return
    }

    const currentKeyboardKey = nodeInfo.keyboardKey
    const existingPath = nodeInfo.path

    const pathToExisting = [...existingPath, currentKeyboardKey]
    const pathToTarget = [...this.treePath, targetKeyboardKey]

    const itemInitiatingMoveCopy = {
      ...this.getItem(pathToExisting)
    } as SoundboardTreeNode
    const itemInTarget = this.getItem([...this.treePath, targetKeyboardKey])

    // delete old item
    const rootRef = this.getItem(existingPath)
    if (rootRef) {
      delete rootRef[currentKeyboardKey]
    }

    // if a swap, put the thing being replaced in old slot
    if (itemInTarget) {
      const itemInTargetCopy = {
        ...this.getItem(pathToTarget)
      } as SoundboardTreeNode
      if (rootRef) {
        rootRef[currentKeyboardKey] = itemInTargetCopy
      }
    }

    // set to new location
    const newSection = this.getItem(this.treePath)
    if (newSection) {
      newSection[targetKeyboardKey] = itemInitiatingMoveCopy
    }
  }

  // deleteItem = (path: ValidTreeThing[]): void => {
  //   delete this.keyboardTree
  // }

  // TODO: maybe not return null? lol
  getItem = (path: ValidTreeThing[]): SoundboardTree | null => {
    try {
      if (!path.length) return this.keyboardTree
      let currentTree: SoundboardTree | null = null
      path.forEach(treeThing => {
        currentTree = currentTree
          ? (currentTree[treeThing] as SoundboardTree)
          : (this.keyboardTree[treeThing] as SoundboardTree)
      })
      return currentTree
    } catch (_) {
      return null
    }
  }

  @observable keyboardTree: SoundboardTree = {
    title: 'my soundboard tree',
    id: '123123',
    type: KeyboardTreeType.Branch,
    '1': {
      type: KeyboardTreeType.Twig,
      title: 'twig 1',
      id: 'aaa',
      v: { type: KeyboardTreeType.Leaf, data: mockData[2], id: '333' }
    },
    '2': { type: KeyboardTreeType.Twig, title: 'twig 1', id: 'bbb' },
    '3': { type: KeyboardTreeType.Twig, title: 'twig 1', id: 'ccc' },
    '4': { type: KeyboardTreeType.Twig, title: 'twig 1', id: 'ddd' },
    '5': { type: KeyboardTreeType.Branch, title: 'how far', id: 'eee' },
    q: { type: KeyboardTreeType.Leaf, data: mockData[2], id: '111' },
    w: { type: KeyboardTreeType.Leaf, data: mockData[1], id: '222' },
    e: {
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
