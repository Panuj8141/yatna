let products = [];
const pathOfJsonFile = "/products.json";


async function getData(path){
  const rep = await fetch(path);
  const data = await rep.json();
  data.forEach(product=>{
    products=Object.values(data);
  });
}

const grid = document.getElementById("product-grid");
  const search = document.getElementById("search");
  
  function displayProducts(filteredProducts) {
    grid.innerHTML = '';
    filteredProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>`;
        card.addEventListener('click' , ()=>{
          document.querySelector("#modalBody").innerHTML=product.description;
          document.querySelector(".modal").style.display="block";
  
        })
      grid.appendChild(card);
      
    });
  }
  
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
    displayProducts(filtered);
  });
  
  function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      closeModal();
    }
  }
  async function lodaer(){
    await getData(pathOfJsonFile);
    await   displayProducts(products);

  }

  lodaer();
  // Initial load