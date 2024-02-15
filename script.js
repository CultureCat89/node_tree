const jsonData = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

const wrapper = document.querySelector('.wrapper');

const dataArr = jsonData.services;


const root = buildHierarchy(dataArr);
buildTree(root, wrapper);
wrapper.addEventListener('click', tree_toogle);



function buildHierarchy(arry) {
  const roots = [],
    children = {};

  for (let i = 0; i < arry.length; i++) {
    let item = arry[i];
    let p = item.head;
    let target = !p ? roots : children[p] || (children[p] = []);

    target.push({ value: item });
  }

  roots.sort((a, b) => a.value.sorthead - b.value.sorthead);
  for (let key in children) {
    children[key].sort((a, b) => a.value.sorthead > b.value.sorthead);
  }

  let findChildren = function (parent) {
    if (children[parent.value.id]) {
      parent.children = children[parent.value.id];
      for (let i in parent.children) {
        findChildren(parent.children[i]);
      }
    }
  };

  for (let i = 0; i < roots.length; i++) {
    findChildren(roots[i]);
  }

  return roots;
}

function buildTree(treeData, wrap) {

  const ul = document.createElement('ul');
  const li = document.createElement('li');
  ul.className = "container";
  
  treeData.forEach(node => {
      ul.appendChild(buildNode(node));
  });

  function buildNode(node) {
    const li = document.createElement('li');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    div1.className = 'expand';
    div2.className = 'content';
    li.appendChild(div1);
    li.appendChild(div2);

    if (node.children) {
      div2.textContent = node.value.name;
      li.className = "node expand-open";

      const ul = document.createElement('ul');
      ul.className = "container";

      node.children.forEach(child => {
          ul.appendChild(buildNode(child));
      });

      li.appendChild(ul);
    } else {
      li.className = "node expand-leaf";
      div2.textContent = node.value.name + ' (' + node.value.price + ')';
    }
    return li;
  }
  wrap.appendChild(ul);
}

function tree_toogle(event) {
  let elem = event.target;
  let node = elem.parentNode;

  console.log(elem);
  if (!elem.classList.contains('expand') 
  || node.classList.contains('expand-leaf')) {
    return;
  }

  if (node.classList.contains('expand-open')) {
    node.className = node.className.replace('expand-open', 'expand-closed');
  } else {
    node.className = node.className.replace('expand-closed', 'expand-open');
  }
}