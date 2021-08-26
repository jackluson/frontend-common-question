function dfs(root, nodes = []) {
  if (root) {
    nodes.push(root);
    if (root.children) {
      for (let index = 0; index < root.children.length; index++) {
        dfs(root.children[index], nodes);
      }
    }
  }
  return nodes;
}

// obj
let obj = {
  children: [
    {
      index: 0,
      children: [
        {
          index: 1,
          children: [
            {
              index: 3,
            },
          ],
        },
      ],
    },
    {
      index: 4,
    },
    {
      index: 5,
      children: [
        {
          index: 7,
          children: [
            {
              index: 8,
            },
          ],
        },
      ],
    },
    {
      index: 6,
    },
  ],
};

const res = dfs(obj);
console.log("res", res);

let obj2 = {
  index: 0,
  children: [
    {
      index: 1,
      children: [
        {
          index: 5,
          children: [
            {
              index: 7,
            },
          ],
        },
      ],
    },
    {
      index: 2,
    },
    {
      index: 3,
      children: [
        {
          index: 6,
          children: [
            {
              index: 8,
            },
          ],
        },
      ],
    },
    {
      index: 4,
    },
  ],
};

function bfs(root) {
  let nodes = [],
    queue = [];
  if (root) {
    queue.push(root);
  }
  while (queue.length) {
    const curNode = queue.shift();
    nodes.push(curNode);
    if (curNode.children) {
      for (let index = 0; index < curNode.children.length; index++) {
        queue.push(curNode.children[index]);
      }
    }
  }
  return nodes;
}

const res1 = bfs(obj2);
console.log("res1", res1);
