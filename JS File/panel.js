// A helper function to draw a line inside a specific container
function drawline(container, fromId, toId) {
  const from = container.querySelector(`#${fromId}`);
  const to = container.querySelector(`#${toId}`);
  const svg = container.querySelector("svg");

  if (!from || !to || !svg) return;

  const fromBox = from.getBoundingClientRect();
  const toBox = to.getBoundingClientRect();
  const containerBox = container.getBoundingClientRect();

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", fromBox.left + fromBox.width / 2 - containerBox.left);
  line.setAttribute("y1", fromBox.top + fromBox.height / 2 - containerBox.top);
  line.setAttribute("x2", toBox.left + toBox.width / 2 - containerBox.left);
  line.setAttribute("y2", toBox.top + toBox.height / 2 - containerBox.top);

  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("class", "connector-line");

  svg.appendChild(line);
}

// Universal layout rendering function
function renderFlowchart(containerId, layout, connections) {
  const container = document.querySelector(`#${containerId} .container`);
  if (!container) return;

  const maxX = 20;
  const maxY = 22;

  for (const [courseId, pos] of Object.entries(layout)) {
    const el = document.getElementById(courseId);
    if (!el) continue;

    el.style.position = "absolute";
    el.style.left = `${(pos.x / maxX) * 100}%`;
    el.style.top = `${(pos.y / maxY) * 100}%`;
    el.style.transform = "translate(-50%, -50%)";
  }

  connections.forEach(([from, to]) => drawline(container, from, to));
}

let courseInfoStore = null;

fetch("courseInfo.html")
  .then(res => res.text())
  .then(html => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    courseInfoStore = tempDiv.querySelector("#courseInfoStore");
    document.body.appendChild(courseInfoStore); // now it exists in DOM
  })
  .catch(err => {
    console.error("Failed to load courseInfo.html:", err);
  });


document.addEventListener("DOMContentLoaded", () => {
  // Main flowchart layout & connections
  const mainLayout = {
    CSE110: { x: 10, y: 3 },
    CSE111: { x: 10, y: 6 },
    CSE220: { x: 10, y: 9 },
    CSE221: { x: 10, y: 13 },
    CSE230: { x: 8, y: 6 },
    CSE321: { x: 10, y: 17 },
    CSE331: { x: 12, y: 15 },
    CSE370: { x: 8, y: 15 },
    CSE470: { x: 8, y: 18 },
    CSE422: { x: 6, y: 14 },
    CSE420: { x: 10, y: 21 },
    CSE260: { x: 16, y: 14 },
    CSE340: { x: 16, y: 17 },
    MAT120: { x: 16, y: 3 },
    CSE330: { x: 16, y: 6 },
    CSE320: { x: 3, y: 3 },
    CSE421: { x: 3, y: 6 },
    CSE423: { x:13, y: 9},
    MAT215c: {x: 13, y: 6}
  };

  const mainConnections = [
    ["CSE110", "CSE111"],
    ["CSE111", "CSE220"],
    ["CSE220", "CSE221"],
    ["CSE230", "CSE220"],
    ["CSE221", "CSE321"],
    ["CSE221", "CSE331"],
    ["CSE221", "CSE370"],
    ["CSE221", "CSE422"],
    ["CSE260", "CSE340"],
    ["CSE340", "CSE420"],
    ["CSE370", "CSE470"],
    ["MAT120", "CSE330"],
    ["CSE320", "CSE421"],
    ["MAT215c", "CSE423"],
    ["MAT120", "MAT215c"],
  ];

  renderFlowchart("flowchart1", mainLayout, mainConnections);

  // Elective flowchart layout & connections
  const electiveLayout = {
    CSE111c: { x: 3, y: 6 },
    CSE430: { x: 5, y: 2},
    CSE432: { x: 5, y: 4},
    CSE310: { x: 5, y: 6 },
    CSE431: { x:5, y: 8},
    MAT215: { x: 15, y: 2 },
    CSE424: { x: 15, y: 5 },
    CSE419: { x:5, y: 10},
    CSE331c: { x: 3, y: 10},
    MAT120c: { x: 3, y: 2},
    CSE400: { x: 18,y: 14},

    PHY112: { x:3, y: 16},
    CSE250: { x:5, y: 16},
    CSE251: { x:7 , y: 16},
    CSE260c: { x:3, y: 18},
    CSE350: { x: 7, y: 18},
    CSE461: { x:3, y: 20},
    CSE341: { x:5, y: 20},
    CSE360: { x:7, y: 20},

    CSE220c: { x: 10, y:2},
    CSE391: { x: 12, y: 2},
    MAT215: { x: 10, y: 6},
    CSE424: { x:12, y: 4},
    CSE474: { x:12, y: 8},
    CSE460: { x:10, y: 18},
    CSE221c: { x:10, y: 10},
    CSE472: { x: 12, y: 10},
    CSE421c: { x:10, y: 12},
    CSE490: { x: 12, y: 14},
    CSE320c: { x: 10, y: 16},

    CSE342: { x: 16, y: 2},
    CSE390: { x: 18, y: 2},
    CSE392: { x: 16, y: 4},
    CSE410: { x: 18, y: 4},
    CSE425: { x: 16, y: 6},
    CSE426: { x: 18, y: 6},
    CSE427: { x: 16, y: 8},
    CSE428: { x:18, y: 8},
    CSE429: { x: 16, y: 10},
    CSE462: { x: 18, y: 10},
    CSE471: { x: 16, y: 12},
    CSE473: { x: 18, y : 12},
    CSE491: { x: 16, y: 14}
  };

  const electiveConnections = [
    ["CSE111c", "CSE310"],
    ["MAT120c", "CSE430"],
    ["CSE331c", "CSE419"],
    ["CSE111c", "CSE432"],
    ["CSE111c", "CSE431"],
    ["PHY112", "CSE250"],
    ["CSE250", "CSE251"],
    ["CSE251", "CSE350"],
    ["CSE260c", "CSE461"],
    ["CSE260c", "CSE350"],
    ["CSE260c", "CSE341"],
    ["CSE341", "CSE360"],
    ["CSE350", "CSE460"],
    ["CSE421c", "CSE490"],
    ["CSE320c", "CSE490"],
    ["CSE221c", "CSE472"],
    ["MAT215", "CSE424"],
    ["MAT215", "CSE474"],
    ["CSE220c", "CSE391"]
  ];

  renderFlowchart("flowchart2", electiveLayout, electiveConnections);

  // Side panel listener setup
const courseAliases = {
  CSE111c: "CSE111",
  CSE221c: "CSE221",
  CSE320c: "CSE320",
  CSE421c: "CSE421",
  CSE331c: "CSE331",
  MAT120c: "MAT120",
  CSE220c: "CSE220",
  CSE260c: "CSE260",
  MAT215c: "MAT215",
};

document.querySelectorAll(".course").forEach(course => {
  course.addEventListener("click", () => {
    const id = course.id;
    const canonicalId = courseAliases[id] || id;

    const infoDiv = courseInfoStore?.querySelector(`[data-id="${canonicalId}"]`);
    const panel = document.getElementById("sidePanel");
    const content = document.getElementById("panelContent");

    content.innerHTML = infoDiv ? infoDiv.innerHTML : "<p>No info available.</p>";
    panel.classList.add("open");
  });
});

document.getElementById("closePanel").addEventListener("click", () => {
  document.getElementById("sidePanel").classList.remove("open");
});


  document.getElementById("closePanel").addEventListener("click", () => {
    document.getElementById("sidePanel").classList.remove("open");
  });
});



