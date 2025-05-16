const container = document.getElementById("array-container");
let array = [];

function generateArray(size = 30) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 250 + 10));
  renderBars(array);
}

function renderBars(arr) {
  container.innerHTML = "";
  arr.forEach(height => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${height}px`;
    container.appendChild(bar);
  });
}

generateArray();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await sleep(100);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderBars(array);
      }

      bars[j].style.backgroundColor = "teal";
      bars[j + 1].style.backgroundColor = "teal";
    }
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = "red";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "yellow";
      await sleep(100);
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = "teal";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "teal";
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      renderBars(array);
      await sleep(100);
    }

    bars[minIndex].style.backgroundColor = "teal";
    bars[i].style.backgroundColor = "green";
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "red";
    await sleep(100);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderBars(array);
      await sleep(100);
    }
    array[j + 1] = key;
    renderBars(array);
    await sleep(100);
    bars[i].style.backgroundColor = "green";
  }
}

async function quickSort(start = 0, end = array.length - 1) {
  if (start >= end) return;

  let pivotIndex = await partition(start, end);
  await Promise.all([
    quickSort(start, pivotIndex - 1),
    quickSort(pivotIndex + 1, end)
  ]);
}

async function partition(start, end) {
  let pivot = array[end];
  let pivotIndex = start;
  const bars = document.getElementsByClassName("bar");

  for (let i = start; i < end; i++) {
    bars[i].style.backgroundColor = "yellow";
    await sleep(100);
    if (array[i] < pivot) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      renderBars(array);
      await sleep(100);
      pivotIndex++;
    }
    bars[i].style.backgroundColor = "teal";
  }

  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  renderBars(array);
  await sleep(100);
  return pivotIndex;
}

async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k] = left[i++];
    } else {
      array[k] = right[j++];
    }
    renderBars(array);
    await sleep(100);
    k++;
  }

  while (i < left.length) {
    array[k++] = left[i++];
    renderBars(array);
    await sleep(100);
  }

  while (j < right.length) {
    array[k++] = right[j++];
    renderBars(array);
    await sleep(100);
  }
}

async function startSort() {
  const algorithm = document.getElementById("algorithm").value;
  switch (algorithm) {
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
    case "quick":
      await quickSort();
      break;
    case "merge":
      await mergeSort();
      break;
    default:
      break;
  }
}


