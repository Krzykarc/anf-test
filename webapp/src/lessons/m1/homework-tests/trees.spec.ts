describe('Tree Iterators', () => {
  type Tree<T> = {
    value: T,
    children?: Tree<T>[]
  }

  const tree: Tree<string> = {
    value: 'A',
    children: [{
      value: 'B',
      children: [{
        value: 'E'
      }, {
        value: 'F'
      }, {
        value: 'G'
      }]
    }, {
      value: 'C',
      children: [{
        value: 'M',
        children: [{
          value: 'R'
        }]
      }, {
        value: 'N',
        children: [{
          value: 'S'
        }]
      }]
    }, {
      value: 'D',
      children: []
    }]
  }

  const getConcat = (result = '') => ({
    concat: (item: string) => { result += item; },
    getResult: () => result,
  })

  const getPusher = (result = [] as string[]) => ({
    push: (item: string) => { result.push(item); },
    getResult: () => result,
  })

  describe('with functions', () => {
    const traverseDepth = (tree: Tree<string>, operation: (item: string) => void) => {
      operation(tree.value);
      const currentChildren = tree.children ?? [];
      for(const treeNode of currentChildren) {
        traverseDepth(treeNode, operation)
      }
    }

    it('performs depth-first traversal (concat)', () => {
      const { concat, getResult } = getConcat()
      traverseDepth(tree, concat);
      expect(getResult()).toEqual('ABEFGCMRNSD');
    })

    it('performs depth-first traversal (push)', () => {
      const { push, getResult } = getPusher()
      traverseDepth(tree, push);
      expect(getResult()).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);
    })

    const traverseBreadthChildren = (tree: Tree<string>, operation: (item: string) => void) => {
      const currentChildren = tree.children ?? [];
      for(const treeNode of currentChildren) {
        operation(treeNode.value)
      }
      for(const treeNode of currentChildren) {
        traverseBreadthChildren(treeNode, operation)
      }
    }

    const traverseBreadth = (tree: Tree<string>, operation: (item: string) => void) => {
      operation(tree.value);
      traverseBreadthChildren(tree, operation)
    }

    it('performs breadth-first traversal (concat)', () => {
      const { concat, getResult } = getConcat()
      traverseBreadth(tree, concat);
      expect(getResult()).toEqual('ABCDEFGMNRS');
    })

    it('performs breadth-first traversal (push)', () => {
      const { push, getResult } = getPusher()
      traverseBreadth(tree, push);
      expect(getResult()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);
    })

  })

  describe('with generators', () => {
    type StringTreeIterator = Generator<string>;

    it('performs depth-first traversal', () => {
      function* iterateDepthFirst(tree: Tree<string>): Generator<string> {
        yield tree.value;
        const currentChildren = tree.children ?? [];
        for(const treeNode of currentChildren) {
          yield *iterateDepthFirst(treeNode)
        }
      }

      let iterator: StringTreeIterator;
      iterator = iterateDepthFirst(tree);
      expect([...iterator]).toEqual(['A', 'B', 'E', 'F', 'G', 'C', 'M', 'R', 'N', 'S', 'D']);

      iterator = iterateDepthFirst(tree);
      expect(iterator.next().value).toEqual('A');
      expect(iterator.next().value).toEqual('B');
      expect(iterator.next().value).toEqual('E');
      expect(iterator.next().value).toEqual('F');
    })

    it('performs breadth-first traversal', () => {
      type StringTreeIterator = Generator<string>;

      function* iterateBreadthFirstChildren(tree: Tree<string>): Generator<string> {
        const currentChildren = tree.children ?? [];
        for(const treeNode of currentChildren) {
          yield treeNode.value;
        }
        for(const treeNode of currentChildren) {
          yield *iterateBreadthFirstChildren(treeNode)
        }
      }

      function* iterateBreadthFirst(tree: Tree<string>) {
        yield tree.value;
        yield *iterateBreadthFirstChildren(tree);
      }

      let iterator: StringTreeIterator;
      iterator = iterateBreadthFirst(tree);
      expect([...iterator]).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'M', 'N', 'R', 'S']);

      iterator = iterateBreadthFirst(tree);
      expect(iterator.next().value).toEqual('A');
      expect(iterator.next().value).toEqual('B');
      expect(iterator.next().value).toEqual('C');
      expect(iterator.next().value).toEqual('D');
    })

  })

})
