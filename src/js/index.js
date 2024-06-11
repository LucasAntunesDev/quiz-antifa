// /src/js/index.js

document.addEventListener("DOMContentLoaded", () => {
    const valores = JSON.parse(localStorage.getItem("quiz::valores")) || {}
    const responder = document.querySelector("#responder")
  
    responder.addEventListener("click", () => {
      const resposta = document.querySelector("#resposta")
      resposta.classList.remove("hidden")
      resposta.innerHTML = quiz.resposta
  
      if (!page.url.next) {
        const totalPerguntas = Object.keys(valores).length
        const acertos = Object.values(valores).filter((valor) => valor.correto).length
        const percentualAcertos = (acertos / totalPerguntas) * 100
        const porcentagem = document.querySelector('#porcentagem')
        porcentagem.innerHTML = percentualAcertos.toFixed(2)
        // alert(`Você acertou ${percentualAcertos.toFixed(2)}% das perguntas!`)
      } else {
        const next = document.querySelector("#next")
        next.classList.remove("hidden")
      }
    })
  
    let selected
    const count = () => Object.keys(valores).filter((chave) => valores[chave].correto).length
  
    if (valores[page.currentPage]) {
      selected = valores[page.currentPage].selecionado
    }
  
    const total = document.querySelector("#acertos-div span")
    total.textContent = `${count()} de 10`
  
    const inputs = document.querySelectorAll("input")
  
    for (let input of inputs) {
      input.checked = input.value == selected ? 1 : 0
  
      input.addEventListener("change", (e) => {
        valores[page.currentPage] = {
          selecionado: e.target.value,
          correto: e.target.value == quiz.correta,
        }
  
        localStorage.setItem("quiz::valores", JSON.stringify(valores))
      })
    }
  })
  